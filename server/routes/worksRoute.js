const express = require('express');
const worksRoute = express.Router();

const { 
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
 } = require('../db');

 worksRoute.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if(!work){
        res.status(400).send('Work not found');
    }else {
        req.work = work;
        next(); 
    }
 });
// get all works
const allWorks = getAllFromDatabase('work');


//get work 
worksRoute.get('/', (req, res, next) => {
    console.log(allWorks);
    // const worksMinionId = allWorks.filter(work => {
    //     console.log(work.minionId === req.minion.id);
    //     work.minionId === req.minion.id
    // });
    // console.log(worksMinionId);
    // res.send(worksMinionId);

    const minionId = req.minion.id;
   const minionWork = [];
   for (let i = 0; i < allWorks.length; i++) {
      if (allWorks[i].minionId === minionId) {
         minionWork.push(allWorks[i]);
      }
   }
   res.status(200).send(minionWork);
});

//create a new work
worksRoute.post('/', (req, res, next) => {
    
    res.send(addToDatabase('work', req.body));
});


//update a work by id
worksRoute.put('/:workId', (req, res, next) => {
    res.send(updateInstanceInDatabase('work', req.body));
});

//delete a work by id
worksRoute.delete('/:workId', (req, res, next) => {
    res.send(deleteFromDatabasebyId('work', req.work.id));
});

module.exports = worksRoute;