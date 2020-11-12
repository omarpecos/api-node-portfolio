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
    res.send('<h1>Hello! API is running ;)</h1>')
})

const httpServer = app.listen(PORT, () =>{
    console.log(`Listening at http://localhost:${PORT}`);
    moongose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true , useUnifiedTopology: true }
    ).then(
        () => console.log('Connected successfully to mongo!'),
        error => console.log('Something failed connecting to mongo', error)
    )
});