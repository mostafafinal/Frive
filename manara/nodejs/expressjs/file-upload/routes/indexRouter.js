const { Router } = require("express");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const {
    populateUser,
    populateMainFolder,
} = require("../middlewares/populateUserData");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);

indexRouter.get("/signup", indexController.signupGet);

indexRouter.post("/signup", indexController.signupPost);

indexRouter.get("/login", indexController.loginGet);

indexRouter.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/mystorage",
    })
);

module.exports = indexRouter;
