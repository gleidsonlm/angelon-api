# Docker

See [the Docker Compose configurations for our tests databases locally and also used by GitHub Actions in CI](./docker-compose.yml).

## Using docker-compose for databases

This is only intended to be run in a development environment where ports 27017 / default for MongoDB are free and not used.

If they are already used make sure to change the ports like this

```yaml
ports:
  - '27019:27017' # only change the first number
```

## Usage

### Start

In detached/background mode using `-d` (recommended)

```sh
docker-compose up -d
# Or start only one service
docker-compose up -d angelondb
# To see logs
docker-compose logs -f angelondb
```

In attached mode, the logs will be streamed in the terminal:

```sh
docker-compose up
```

### Stop

```sh
docker-compose down
```

### Delete all

```sh
docker-compose down -v --rmi all --remove-orphans
```
