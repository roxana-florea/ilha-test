require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 5000;


const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');

const dbUrl = process.env.DB_URL;





app.use(cors());

app.use(express.json());

//connection to mongodb
mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//load the routers from other files
const plansRouter = require('./routes/plans');
// const usersRouter = require('./routes/users');

//the routers are added as middleware
app.use('/plans', plansRouter);
// app.use('/users', usersRouter);




app.listen(port, (err) => {
    if(err){
        console.log("Error occured");
    }
    else{
        console.log(`Successfuly connected to to port: ${port}`);
    }
})