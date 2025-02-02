const populateUser = (req, res, next) => {
    try {
        if (req.isAuthenticated()) res.locals.currentUser = req.user;

        next();
    } catch (err) {
        console.error(`MIDDLEWARE ERROR\n ${err}`);
    }
};

module.exports = { populateUser };
