const { Router } = require("express");
const folderRouter = require("./folderRouter");
const fileRouter = require("./fileRouter");
const storageController = require("../controllers/storageController");
const {
    populateUser,
    populateMainFolder,
} = require("../middlewares/populateUserData");

const storageRouter = Router();

storageRouter.get(
    "/",
    populateUser,
    populateMainFolder,
    storageController.storageGet
);

storageRouter.get("/logout", storageController.logOutGet);

storageRouter.use("/folder", populateUser, folderRouter);

storageRouter.use("/file", fileRouter);

module.exports = storageRouter;
