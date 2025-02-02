const { Router } = require("express");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { populateUser } = require("../middlewares/populateUserData");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);

indexRouter.get("/signup", indexController.signupGet);

indexRouter.post("/signup", indexController.signupPost);

indexRouter.get("/login", indexController.loginGet);

indexRouter.get("/mystorage", populateUser, indexController.mystorageGet);

indexRouter.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/mystorage",
    })
);

indexRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => res.redirect("/"));
    });
});

module.exports = indexRouter;
