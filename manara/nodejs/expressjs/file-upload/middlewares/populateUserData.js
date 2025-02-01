const { findUserMessages } = require("../models/queries");

const populateUser = (req, res, next) => {
    try {
        if (req.isAuthenticated()) res.locals.currentUser = req.user;

        next();
    } catch (err) {
        console.error(`MIDDLEWARE ERROR\n ${err}`);
    }
};

const populateMessages = async (req, res, next) => {
    const messages = await findUserMessages();

    res.locals.messages = messages;

    next();
};

module.exports = { populateUser, populateMessages };
