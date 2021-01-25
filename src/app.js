const express = require('express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const {
  techRouter,
  profileRouter,
  projectRouter,
  courseRouter,
} = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const apiRouter = new Router();

apiRouter.use('/techs', techRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/projects', projectRouter);
apiRouter.use('/courses', courseRouter);

app.use('/api', apiRouter);

//test endpoint
app.get('/', (req, res) => {
  res.send('<h1>Hello! Portfolio API is running ;)</h1>');
});

module.exports = app;
