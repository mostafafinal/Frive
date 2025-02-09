const { Router } = require("express");
const folderRouter = require("./folderRouter");
const fileRouter = require("./fileRouter");
const storageController = require("../controllers/storageController");
const {
    populateUser,
    populateMainFolder,
} = require("../middlewares/populateUserData");
const passport = require("passport");

const storageRouter = Router();

storageRouter.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    populateMainFolder,
    populateUser,
    storageController.storageGet
);

storageRouter.get("/logout", storageController.logOutGet);

storageRouter.use(
    "/folder",
    passport.authenticate("jwt", { session: false }),
    folderRouter
);

storageRouter.use("/file", fileRouter);

module.exports = storageRouter;
