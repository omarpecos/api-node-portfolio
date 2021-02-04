API Porfolio
===

- [API Porfolio](#api-porfolio)
  * [Description](#description)
    + [Mongoose Models](#mongoose-models)
      - [User](#user)
      - [Technology](#technology)
      - [Profile](#profile)
      - [Course](#course)
      - [Project](#project)
    + [Swagger](#swagger)
    + [Routes](#routes)
      - [Authentication](#authentication)
      - [Users](#users)
      - [Technologies](#technologies)
      - [Profile](#profile-1)
      - [Courses](#courses)
      - [Projects](#projects)
  * [Installation and Usage](#installation-and-usage)
      - [Development server](#development-server)
      - [Tests](#tests)
  * [Url of the API deployed](#url-of-the-api-deployed)

## Description

This project is a **Node** + **Express** + **Mongoose (MongoDB)** APIRest using **async/await** 
to store data related to our proffesional portfolios or personal websites. It stores data from technologies, courses, profiles and projects. It has **authentication** and **authorization** with **JWT** (json web tokens)

The original idea is to use this API data and then build a static site using [Gridsome](https://gridsome.org/)

### Mongoose Models

#### User

```gherkin=
const userSchema = new Schema({
  nickname: String,
  email: String,
  password: String,
  role: { type: Number, default: 0 },
});
```

#### Technology

```gherkin=
  const TechSchema = new Schema({
    name : String,
    type : String,
    icon : String
});
```

#### Profile

```gherkin=
  const profileSchema = new Schema({
    intro : String,
    about : {
        text : String,
         skills : [
            {
                tech : {type : Schema.Types.ObjectId ,ref : "Technology"},
                percentage : Number
            }
        ]
    },
    version : Number
})
```

#### Course

```gherkin=
  const courseSchema = new Schema({
    name : String,
    platform : String,
    url : String,
    language : String,
    duration : Number,
    techs : [
        {type : Schema.Types.ObjectId , ref : 'Technology'}
    ],
    done : Boolean,
    description : String
})
```

#### Project

```gherkin=
  const projectSchema = new Schema({
    name : String,
    type : String,
    techs : [
        {type : Schema.Types.ObjectId , ref : "Technology"}
    ],
    images : [String],
    description : String,
    url : String,
    repo_url : String,
    files : [String],
    pinned : {type : Boolean, default : false}
})
```
### Swagger
For a more extense Documentation and for trying the endpoints

[API Portfolio - Swagger UI](https://api-node-portfolio.omarpv.repl.co/api-docs)

### Routes
> **URL** is `http://localhost:9000`


#### Authentication
> POST - **URL**/api/auth/register

> POST - **URL**/api/login
#### Users
> GET - **URL**/api/users - ONLY ADMIN

> POST - **URL**/api/users/:id/admin (Make admin) - ONLY ADMIN

> PATCH - **URL**/api/users/:id - ONLY AUTH USERS

> DELETE - **URL**/api/users/:id - ONLY ADMIN

#### Technologies
> GET - **URL**/api/techs 

> POST - **URL**/api/techs - ONLY ADMIN

> DELETE - **URL**/api/techs/:id - ONLY ADMIN

#### Profile
> GET - **URL**/api/profile - ONLY AUTH USERS

> POST -  **URL**/api/profile - ONLY AUTH USERS

#### Courses
> GET - **URL**/api/courses - ONLY AUTH USERS

> POST - **URL**/api/courses - ONLY AUTH USERS

> DELETE - **URL**/api/courses/:id - ONLY AUTH USERS

#### Projects
> GET - **URL**/api/projects - ONLY AUTH USERS

> POST - **URL**/api/projects - ONLY AUTH USERS

> DELETE - **URL**/api/projects/:id - ONLY AUTH USERS

## Installation and Usage

To run this API in local you need **npm**

#### Development server

Run `npm run dev` or `nodemon index.js` for a start server (with file changes reloading). The API will be listening at `http://localhost:9000/`

Run `npm start` or `node index.js` for a start production server. The API will be listening at `http://localhost:9000/`

#### Tests

The API use **Jest** and **Supertest** to have Unit tests to test one service and has Integration tests to test all the endpoints 

Run `npm test` to run tests

Url of the API deployed
---
> [API Porfolio](https://api-node-portfolio.omarpv.repl.co/) 

Deployed with [Repl.it](https://repl.it/)


###### tags: `Documentation` `Node` `Express` `Mongoose` `API`