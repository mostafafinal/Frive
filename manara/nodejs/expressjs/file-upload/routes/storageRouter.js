const { Router } = require("express");
const storageController = require("../controllers/storageController");
const fileController = require("../controllers//fileController");
const {
    populateUser,
    populateMainFolder,
    populateAllFolders,
} = require("../middlewares/populateUserData");
const upload = require("../middlewares/handleUploads");
const { getFileById } = require("../models/queries");

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

storageRouter.post(
    "/uploadFile/:folderId",
    upload.single("files"),
    fileController.uploadPost
);

storageRouter.get(
    "/file/:fileId",
    populateUser,
    populateAllFolders,
    fileController.showFileGet
);

storageRouter.post(
    "/updateFileName/:fileId",
    fileController.updateFileNamePost
);

storageRouter.post("/deleteFile/:fileId", fileController.deleteFilePost);

storageRouter.get("/download/:fileId", fileController.downloadFile);

module.exports = storageRouter;
