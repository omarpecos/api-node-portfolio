require('dotenv').config();
const PORT = process.env.PORT | 9000;

const express = require('express');
const moongose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//test endpoint
app.get('/', (req,res) =>{
    res.json({
        message : 'Hello!'
    })
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