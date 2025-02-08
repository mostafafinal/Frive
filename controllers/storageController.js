const storageGet = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        res.render("mystorage");
    } catch (err) {
        res.redirect("/");

        next(err);
    }
};

const logOutGet = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);

        req.session.destroy(() => res.redirect("/"));
    });
};

module.exports = { storageGet, logOutGet };
