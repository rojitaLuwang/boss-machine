const express = require('express');
const minionsRoute = express.Router();

const worksRoute = require('./worksRoute');

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
 } = require('../db');

 minionsRoute.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if(!minion){
        res.status(400).send('Minion not found');
    }else {
        req.minion = minion;
        next(); 
    }
 });

 
minionsRoute.use('/:minionId/work', worksRoute);

//get all minions 
minionsRoute.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.send(allMinions);
});

//create a new minion
minionsRoute.post('/', (req, res, next) => {
    res.send(addToDatabase('minions', req.body));
});

//get a minion with a given id
minionsRoute.get('/:minionId', (req,res,next) => {
    res.send(req.minion);
});

//update a minion by id
minionsRoute.put('/:minionId', (req, res, next) => {
    res.send(updateInstanceInDatabase('minions', req.body));
});

//delete a minion by id
minionsRoute.delete('/:minionId', (req, res, next) => {
    res.send(deleteFromDatabasebyId('minions', req.minion.id));
});

module.exports = minionsRoute;