import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
const web_port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const web_host = process.env.HOST ?? "127.0.0.1";
console.log("APP START");
console.log(`web_port=${web_port} web_host=${web_host} os.hostname=${os.hostname}`);
dotenv.config();
const DB_LATENCY = parseInt(process.env.DB_LATENCY || "2000", 10);
const app = express();
/**
 * trvá DB_LATENCY ms
 */
async function simulDBTextContentLatency() {
    await new Promise(resolve => setTimeout(resolve, DB_LATENCY));
    return `Nejaky textovy content..`;
}
/**
 * trvá DB_LATENCY ms
 */
async function simulDBJsonContentLatency() {
    await new Promise(resolve => setTimeout(resolve, DB_LATENCY));
    return {
        content: `Nejaky content..`
    };
}
// bez cache
app.get("/", async (req, res) => {
    res.send(`${os.hostname}: ${(new Date()).toLocaleTimeString()}`);
    //res.send( `${(new Date()).toLocaleTimeString()}`);
});
/*
// jeden endpoint na testovanie textovaho contentu, TTL=10
app.get("/text/:id", createCacheMiddleware(10), async (req: Request, res: Response) => {
    let text = await simulDBTextContentLatency();
    text +=
        `<br>Generovany pre "${req.url}" o ${(new Date()).toLocaleTimeString("sk-SK")}` +
        `<br>TTL=10`;
    res.send(text);
});

// jeden endpoint na testovanie JSON contentu, TTL=15
app.get("/json/:id", createCacheMiddleware(15), async (req: Request, res: Response) => {
    let json:any = await simulDBJsonContentLatency();
    json.url = req.url;
    json.time = (new Date()).toLocaleTimeString("sk-SK");
    json.ttl = 15;
    res.send(json);
});
*/
/**
 * http server
 */
app.listen(web_port, web_host, () => {
    console.log(`Server listening on http://${web_host}:${web_port}`);
});
//# sourceMappingURL=index.js.map