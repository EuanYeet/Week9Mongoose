const router = require("express").Router();
const { findById } = require("../db");
const Game = require("../db");

const data = [];

router.get("/", (request, response) => {
    response.send(cow.speak("Moo"));
});

router.get("/getAll", (req,res,next) => {
    Game.find().then((results) => {
        return res.json(results);
    }).catch(err => next({status: 400, message: err.message}));
});

router.get("/get/:id", (req,res, next) => {
    const id = Number.parseInt(req.params.id);

    if (id == null || undefined || id === NaN)
    {
        return next({
            status:400,
            message: "Invalid ID"
        });
    } else if (id > Game.length) {
        return  next({
            status: 404,
            message: "No game found with id: " + id 
        });
    }

    Game.find().then((results) => {
        return res.json(results[id]);
    }).catch(err => next({status: 400, message:err.message}));
});

router.post("/create", (req, res, next) => {
    const game = req.body;
    new Game(game).save().then(() => {
        res.status(201).send("Done");
    }).catch(err => next({status: 400, message: err.message}));
});

router.put("/replace/:id", (req,res,next) => {
    const newGame = req.query;
    const id = req.params.id;
    
    Game.findByIdAndUpdate(id,newGame).then((result) => {
        res.status(202).send("Accepted");
    }).catch(err => next({status: 400, message: err.message}));  
});

router.delete("/remove/:id", (req,res) => {
    const id = req.params.id;
    Game.findByIdAndRemove(id).then((result) => {
        res.status(204).send("Deleted");
    }).catch(err => next({status: 400, message: err.message})); 
});

module.exports = router;