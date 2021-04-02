## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Step by step create project
Install Nestjs CLI on global

```bash
$ npm i -g @nestjs/cli
```

Create project 
nest new <project-name>

<!-- Install library relate nestjs -->
npm i pg typeorm @nestjs/typeorm apollo-server-express 
npm i @nestjs/graphql graphql-tools type-graphql graphql


<!-- Install fs (file system), dotenv packages to config -->
npm i fs dotenv 

<!--  -->
npm i moment-timezone
npm i @types/moment-timezone --save-dev

<!-- Mail -->
npm i ejs email-templates nodemailer @sendgrid/mail @types/nodemailer

<!-- Auth -->
npm i @nestjs/jwt bcryptjs