
# Postup pre mna

## docker build appku
```
docker build -t lesson12-homework:latest .

-> naming to docker.io/library/lesson12-homework:latest         
```


## testovacie spustenie mojej appky
```
docker run --env PORT=3000 --env HOST=0.0.0.0 -p 3000:3000 lesson12-homework-app:latest
```
errors kvoli chybajucemu redisu, jasna vec **ale hlavne ze ide:**

http://localhost:3000/ -> 1ef98f89b85e: 7:08:16 PM


## docker compose
```
docker-compose up

Funguje:
http://localhost:4000/
http://localhost:4000/text/1

```


## GitHub Actions








