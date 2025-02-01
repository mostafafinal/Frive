const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);

indexRouter.get("/signup", indexController.signupGet);

indexRouter.get("/login", indexController.loginGet);

module.exports = indexRouter;
