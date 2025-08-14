import passport from "passport";

const isAuth = [
  (req, res, next) => {
    if (!req.cookies["x-auth-token"]) throw Error("you're not authorized!");

    req.headers.authorization = "Bearer " + req.cookies["x-auth-token"];

    next();
  },
  passport.authenticate("jwt", { session: false }),
];

export default isAuth;
