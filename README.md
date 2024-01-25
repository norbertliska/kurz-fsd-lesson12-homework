
# Info pre Rostislav Jadavan

Druhy pokus - uz sa zadarilo. Aj typescript, aj spojenie s redisom.

Uz tomu zacinam rozumiet.

# Postup pre mna

## docker build appku
```
docker build -t lesson12-homework:latest .

-> naming to docker.io/library/lesson12-homework:latest         
```


## testovacie spustenie appky
```
docker run --env PORT=3000 --env HOST=0.0.0.0 -p 3000:3000 lesson12-homework:latest
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

nejako to preslo aj zbuildlo aj pushlo


## Download from ghcr.io
```
 docker pull ghcr.io/norbertliska/lesson12-homework:build_1
 ```

## Spustenie za pouzitia downloadnuteho image
```
docker-compose -f docker-compose-ghcr.io.yml up

funguje:
http://localhost:5000/
http://localhost:5000/text/1

```














