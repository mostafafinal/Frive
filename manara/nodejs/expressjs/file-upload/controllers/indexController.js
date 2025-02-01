const indexGet = (req, res, next) => {
    try {
        res.render("index");
    } catch (err) {
        next(err);
    }
};

const signupGet = (req, res, next) => {
    try {
        res.render("signup");
    } catch (err) {
        next(err);
    }
};

const loginGet = (req, res, next) => {
    try {
        res.render("login");
    } catch (err) {
        next(err);
    }
};

module.exports = { indexGet, signupGet, loginGet };
