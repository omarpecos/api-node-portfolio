API Porfolio
===

- [API Porfolio](#api-porfolio)
  * [Description](#description)
    + [Mongoose Models](#mongoose-models)
      - [Technology](#technology)
      - [Profile](#profile)
      - [Course](#course)
      - [Project](#project)
    + [Routes](#routes)
      - [Technologies](#technologies)
      - [Profile](#profile-1)
      - [Courses](#courses)
      - [Projects](#projects)
  * [Installation and Usage](#installation-and-usage)
      - [Development server](#development-server)
  * [Url of the API deployed](#url-of-the-api-deployed)
          + [tags: `Documentation` `Node` `Express` `Mongoose` `API`](#tags---documentation---node---express---mongoose---api-)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## Description

This project is a **Node** + **Express** + **Mongoose (MongoDB)** APIRest using **async/await** 
to store data related to my proffesional portfolio or personal website. It stores data from technologies, courses, profiles and projects.

The original idea is to use this API data and then build a static site using [Gridsome](https://gridsome.org/)

### Mongoose Models

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
    files : [String],
    pinned : {type : Boolean, default : false}
})
```

### Routes

> **URL** is `http://localhost:9000`

#### Technologies
> GET - **URL**/api/techs

> POST - **URL**/api/techs

> DELETE - **URL**/api/techs/:id

#### Profile
> GET - **URL**/api/profile

> POST -  **URL**/api/profile

#### Courses
> GET - **URL**/api/courses

> POST - **URL**/api/courses

> DELETE - **URL**/api/courses/:id

#### Projects
> GET - **URL**/api/projects

> POST - **URL**/api/projects

> DELETE - **URL**/api/projects/:id

## Installation and Usage

To run this API in local you need **npm**

#### Development server

Run `npm run dev` or `nodemon index.js` for a start server (with file changes reloading). The API will be listening at `http://localhost:9000/`

Run `npm start` or `node index.js` for a start production server. The API will be listening at `http://localhost:9000/`


Url of the API deployed
---
> [API Porfolio](https://api-node-portfolio.omarpv.repl.co/)

Deployed with [Repl.it](https://repl.it/)


###### tags: `Documentation` `Node` `Express` `Mongoose` `API`
