# Roulette Backend

This guide is designed to allow any developer to set up and run Roulette's development environment locally. If you think anything should be clarified, please make edits!

This guide includes setup instructions for `backend` repository.

## Prerequisites

### Install Docker

1. Get a Docker ID: https://hub.docker.com/signup
2. Log in with your new Docker account.
3. Download Docker for your OS: https://hub.docker.com/?overlay=onboarding

### Install Node v14.x

We are currently using Node 14.0 and recommend installing it using a version manager like [nvm](https://github.com/nvm-sh/nvm) or [nodenv](https://github.com/nodenv/nodenv).

### Install yarn

https://yarnpkg.com/getting-started/install

```
$ npm i -g yarn
```

### Start Docker

1. Sign in to Docker using the icon at the top of the your operating system.
2. Adjust two Docker Preferences: increase CPUs, memory, and swap to 50% of your machine's capacity.

### Setup the backend

From the `roulette` directory:

```
$ yarn install
```

### Start the app

There are Docker Compose file in the application which serves for running backend:

- `docker-compose.yml` - base configuration for all services

There are corresponding scripts in the top-level `package.json` to spin up Docker containers and start a watch task for building common modules shared by application services:

- `yarn start:app:dev`


1. To monitor the server logs:
    - `docker logs -f main`
    - `docker logs -f random_number_generator`
    
3. Wait! The server logs may show `Starting compilation in watch mode...` for a few minutes before the application is ready.

### Run DB migrations

Running DB migrations will set up the tables in your local DB populate some tables with application data.

From the roulette directory, execute `yarn db:run`

Note: May take a few minutes to run while the `SSL is off. reason: undefined file not exists` message is shown.

In the future, you can use the same command to run any new data or schema migrations created by other engineers. You can read more about them in the [TypeORM docs](https://typeorm.io/#/migrations).

### Stopping the app

Before pulling new code or installing new dependencies, you should stop and restart Docker:

- `yarn stop`

## Other

### Choosing an IDE

We recommending using either **Webstorm** or **VS Code** as your code editor. Installing the plugins / extensions is highly recommended to prevent errors.

#### VS Code

- Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), which automatically formats code on each save

### DB GUI

Download and install a Postgres GUI:

- TablePlus: https://tableplus.com/
- Postico: https://eggerapps.at/postico/
- DBeaver Community edition: https://dbeaver.io/download/

Connection details:

- Host: 127.0.0.1
- Port: 5432
- User: postgres
- There's no password - leave it blank
- Database: roulette




