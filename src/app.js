const express = require('express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { NotFoundMiddleware, GeneralErrorMiddleware } = require('./middlewares');
require('express-async-errors');

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

//ROUTES

app.get('/', (req, res) => {
  res.send('<h1>Hello! Portfolio API is running ;)</h1>');
});

const apiRouter = new Router();

apiRouter.use('/techs', techRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/projects', projectRouter);
apiRouter.use('/courses', courseRouter);

app.use('/api', apiRouter);

// MIDDLEWARES
// for route not found
app.use((req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} doesn't exist`);
  err.status = 404;
  next(err);
});

app.use(NotFoundMiddleware);
app.use(GeneralErrorMiddleware);

module.exports = app;
