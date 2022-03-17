const cow = require('./cow');

const express = require("express");
const app = express();
const server = app.listen(4494, () => console.log("server Started on port", server.address().port));

const parser = require("body-parser");
const gamesRoutes = require('./routes/gamesRoutes');

const data = [];

app.use('Games',gamesRoutes);

app.use(parser.json());

app.use((err,req,res,next) => {
    console.log("Error");
    return next();
})

app.use((req,res,next) => {
    console.log(req.method,req.url,new Date())
    return next();
})

app.use("/games", gamesRoutes);

app.use("/error", (req,res, next) => { 
    res.status(err.status || 400).send(err.message);
})

app.use((err,req,res,next) => {
    res.status(400).send(err);
})

app.use("*",(req,res,next) =>{
    return next({status: 404, message:"Invalid URL"});
})