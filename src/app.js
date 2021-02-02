const express = require('express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { NotFoundMiddleware, GeneralErrorMiddleware } = require('./middlewares');
require('express-async-errors');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('./config');
const swaggerDocument = require(SWAGGER_PATH);

//routes
const {
  techRouter,
  profileRouter,
  projectRouter,
  courseRouter,
  authRouter,
  userRouter,
} = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

//ROUTES

app.get('/', (req, res) => {
  //res.send('<h1>Hello! Portfolio API is running ;)</h1>');
  res.redirect('/api-docs');
});

const apiRouter = new Router();

apiRouter.use('/techs', techRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/projects', projectRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

app.use('/api', apiRouter);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
