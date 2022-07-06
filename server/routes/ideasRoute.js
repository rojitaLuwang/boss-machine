const express = require('express');
const ideasRoute = express.Router();

const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
 } = require('../db');

 ideasRoute.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(!idea){
        res.status(400).send('Idea not found');
    }else {
        req.idea = idea;
        next(); 
    }
 });

//get all ideas 
ideasRoute.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.send(allIdeas);
});

//create a new idea
ideasRoute.post('/', checkMillionDollarIdea, (req, res, next) => {
    res.send(addToDatabase('ideas', req.body));
});

//get an idea with a given id
ideasRoute.get('/:ideaId', (req,res,next) => {
    res.send(req.idea);
});

//update an idea by id
ideasRoute.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    res.send(updateInstanceInDatabase('ideas', req.body));
});

//delete an idea by id
ideasRoute.delete('/:ideaId', (req, res, next) => {
    res.send(deleteFromDatabasebyId('ideas', req.idea.id));
});

module.exports = ideasRoute;