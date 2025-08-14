const { Router } = require("express");
const folderRouter = require("./folderRouter");
const fileRouter = require("./fileRouter");
const storageController = require("../controllers/storageController");
const {
  populateUser,
  populateMainFolder,
} = require("../middlewares/populateUserData");
const passport = require("passport");
const { default: isAuth } = require("../middlewares/isAuth");

const storageRouter = Router();

storageRouter.get(
  "/",
  isAuth,
  passport.authenticate("jwt", { session: false }),
  populateMainFolder,
  populateUser,
  storageController.storageGet
);

storageRouter.get("/logout", storageController.logOutGet);

storageRouter.use(
  "/folder",
  isAuth,
  passport.authenticate("jwt", { session: false }),
  populateMainFolder,
  populateUser,
  folderRouter
);

storageRouter.use(
  "/file",
  isAuth,
  passport.authenticate("jwt", { session: false }),
  populateMainFolder,
  populateUser,
  fileRouter
);

module.exports = storageRouter;
