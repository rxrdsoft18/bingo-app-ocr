## Bingo App
POC of a bingo app using NestJS, MongoDB and AWS Textract, OCR

## Installation

```bash
$ yarn install
```

## Run docker

```bash
docker run -d --name app-bingo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27019:27017 mongo
```

## Copy .env.example to .env

```bash
$ cp .env.example .env
```

## Set the environment variables
    
```bash
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_DATABASE=your_database
MONGODB_AUTH_SOURCE=admin
MONGODB_HOST=your_host
MONGODB_PORT=your_port
APP_PORT=your_port
```


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
