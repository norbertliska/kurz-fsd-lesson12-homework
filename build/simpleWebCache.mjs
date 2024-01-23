import { Redis } from 'ioredis';
let redis = null;
function ensureRedisInited() {
    if (redis != null)
        return;
    console.log("ensureRedisInited");
    redis = new Redis({
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        db: parseInt(process.env.REDIS_DB)
    });
}
/**
 * @returns  true ak nasiel a poslal z cache, inac false
 */
async function sendContentIfCached(res, key) {
    let data = await redis.get(key);
    if (data === null)
        return false;
    if (data.startsWith("string:")) {
        res.send(data.substring(7));
        return true;
    }
    if (data.startsWith("json:")) {
        res.send(JSON.parse(data.substring(5)));
        return true;
    }
    // neznamy typ - posleme ako je
    res.send(data);
    return true;
}
async function saveContent(key, content, ttl) {
    // Kazdy content ulozime ako string s prefixom typu.
    if (typeof content === "string") {
        await redis.setex(key, ttl, "string:" + content);
    }
    else {
        await redis.setex(key, ttl, "json:" + JSON.stringify(content));
    }
}
// Inspiracia: Trochu hacky, na PROD by este trebalo doriest kopec detailov.
// https://stackoverflow.com/questions/19215042/express-logging-response-body
// https://github.com/kwhitley/apicache/blob/master/src/apicache.js
// https://www.npmjs.com/package/express?activeTab=code
export function createMiddleware(ttl) {
    ensureRedisInited();
    const middleware = async (req, res, next) => {
        const key = req.url;
        if (await sendContentIfCached(res, key)) {
            return;
        }
        const oldSend = res.send;
        ;
        const oldEnd = res.end;
        let content = null; // string alebo object
        res.send = (chunk) => {
            // neriesime zretazenie...
            content = chunk;
            return oldSend.apply(res, [chunk]);
        };
        res.end = async (chunk, xxx, yyy) => {
            // ak string tak zretazime, inak nic.
            if (typeof content === "string" && typeof chunk === "string")
                content += chunk;
            await saveContent(key, content, ttl);
            return oldEnd.apply(res, [chunk, xxx, yyy]);
        };
        next();
    };
    return middleware;
}
//# sourceMappingURL=simpleWebCache.mjs.map