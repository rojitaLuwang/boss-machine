const express = require('express');
const meetingsRoute = express.Router();

const { 
    createMeeting,
    getAllFromDatabase,
    deleteAllFromDatabase,
 } = require('../db');

 
//get all meetings 
meetingsRoute.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.send(allMeetings);
});

//create a new meeting
meetingsRoute.post('/', (req, res, next) => {
    res.send(createMeeting());
});

//delete meetings
meetingsRoute.delete('/', (req, res, next) => {
    res.send(deleteAllFromDatabase('meetings'));
});

module.exports = meetingsRoute;