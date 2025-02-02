const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { loginUser, findUserById } = require("../models/queries");
const { validPassword } = require("../helpers/vaildPassword");

const verifyCallback = async (username, password, cb) => {
    try {
        const user = await loginUser(username);

        if (!user) {
            return cb(null, false, { message: "Incorrect email or password" });
        }

        if (!(await validPassword(password, user.password))) {
            return cb(null, false, { message: "Incorrect email or password" });
        }

        return cb(null, user);
    } catch (err) {
        console.error(err);
    }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await findUserById(userId);

        if (!user) {
            throw new Error("User not existed");
        }

        done(null, user);
    } catch (err) {
        console.error(`Deserialize Error\n ${err}`);
    }
});
