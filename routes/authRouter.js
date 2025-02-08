const { Router } = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");

const authRouter = Router();

authRouter.get("/", authController.indexGet);

authRouter.get("/signup", authController.signupGet);

authRouter.post("/signup", authController.signupPost);

authRouter.get("/login", authController.loginGet);

authRouter.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/",
        successRedirect: "/mystorage",
    })
);

module.exports = authRouter;
