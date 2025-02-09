const passport = require("passport");
const LocalStragey = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { loginUser, findUserById } = require("../models/queries");
const { validPassword } = require("../helpers/vaildPassword");

const verifyUserCredientials = async (username, password, cb) => {
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

passport.use(new LocalStragey(verifyUserCredientials));

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const verifyUserToken = async (jwtPayload, done) => {
    try {
        const user = await findUserById(jwtPayload.id);

        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        console.error(err);

        return done(null, false);
    }
};

const jwtStrategy = new JWTStrategy(opts, verifyUserToken);

passport.use(jwtStrategy);
