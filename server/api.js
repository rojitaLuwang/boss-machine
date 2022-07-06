const express = require('express');
const apiRouter = express.Router();

const minionsRoute = require('./routes/minionsRoute');
apiRouter.use('/minions', minionsRoute);

const ideasRoute = require('./routes/ideasRoute');
apiRouter.use('/ideas', ideasRoute);

const meetingsRoute = require('./routes/meetingsRoute');
apiRouter.use('/meetings', meetingsRoute);

module.exports = apiRouter;
