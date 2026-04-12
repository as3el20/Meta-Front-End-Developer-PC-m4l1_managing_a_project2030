require('dotenv').config()
const Express = require('express');
const Express_layout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const mongoose = require('mongoose');
const app = Express();
const Port = 5000 || process.env.Port


//Connected_DB
connectDB();
app.use(Express.urlencoded({extended:true}));
app.use(Express.json());
app.use(Express.static('public'));

// Templating Engine
app.use(Express_layout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


app.use('/',require('./server/routes/main'));
app.listen(Port, ()=>{
    console.log(`App is listening on port ${Port}`);
})