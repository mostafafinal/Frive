const { Router } = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const signToken = require("../middlewares/signToken");

const authRouter = Router();

authRouter.get("/", authController.indexGet);

authRouter.get("/signup", authController.signupGet);

authRouter.post("/signup", authController.signupPost);

authRouter.get("/login", authController.loginGet);

authRouter.post(
    "/login",
    passport.authenticate("local", { session: false }),
    signToken
);

module.exports = authRouter;
