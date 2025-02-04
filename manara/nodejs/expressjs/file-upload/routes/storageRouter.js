const { Router } = require("express");
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
    storageController.mystorageGet
);

storageRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => res.redirect("/"));
    });
});

storageRouter.get("/folder/:id", populateUser, storageController.openFolderGet);

storageRouter.post(
    "/createFolder/:folderId",
    storageController.createFolderPost
);

storageRouter.post(
    "/updateFolderName/:folderId",
    storageController.updateFolderNamePost
);

storageRouter.post(
    "/deleteFolder/:folderId",
    storageController.deleteFolderPost
);

module.exports = storageRouter;
