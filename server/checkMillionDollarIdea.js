const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    if(typeof numWeeks === 'number' &&
     typeof weeklyRevenue === 'number' && 
     numWeeks*weeklyRevenue >= 1000000){
        next();
    }else {
        res.status(400).send('This Idea is not a Million Dollar Idea');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
