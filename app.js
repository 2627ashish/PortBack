const express = require('express');
const mongoose = require('mongoose');
const router = require('./Router/index');
const cors = require('cors');
const port = 2963;
const hostname = 'localhost';


//const localDB = 'mongodb://127.0.0.1:27017/zomato_29';
const serverDB = 'mongodb+srv://db_user_29:1ee7zW5VBvDEkEzs@cluster0.syyqr.mongodb.net/DB_29?retryWrites=true&w=majority'
const app = express();
app.use(cors());
app.use(express.json()); //parse the json object
app.use('/', router);

mongoose.connect(serverDB , {useNewUrlParser : true,useUnifiedTopology : true})
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}:${port}`);
        });
    })
    .catch(err => console.log(err));