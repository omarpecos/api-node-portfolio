require('dotenv').config();


const PORT = process.env.PORT | 9000;

const express = require('express');
const moongose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//routes
const {techRouter,profileRouter,projectRouter,courseRouter} = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/techs', techRouter);
app.use('/api/profile', profileRouter);
app.use('/api/projects', projectRouter);
app.use('/api/courses', courseRouter);

//test endpoint
app.get('/', (req,res) =>{
    res.send('<h1>Hello! Portfolio API is running ;)</h1>');
})

    
moongose.connect(
    process.env.MONGO_URI,
    { 
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
).then(
    () => {
        app.listen(PORT, () =>{
          console.log('Connected successfully to mongo!');
          console.log(`Listening at http://localhost:${PORT}`);
        });
    },
    error => console.log('Something failed connecting to mongo', error.message)
);
