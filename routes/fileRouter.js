const { Router } = require("express");
const fileController = require("../controllers/fileController");
const {
    populateUser,
    populateAllFolders,
} = require("../middlewares/populateUserData");
const upload = require("../middlewares/handleUploads");

const fileRouter = Router();

fileRouter.post(
    "/:folderId",
    upload.single("files"),
    fileController.uploadPost
);

fileRouter.get(
    "/:id",
    populateUser,
    populateAllFolders,
    fileController.showFileGet
);

fileRouter.put("/:id/rename", fileController.updateFileNamePost);

fileRouter.put("/:id/move", fileController.moveFilePost);

fileRouter.delete("/:id", fileController.deleteFilePost);

fileRouter.get("/download", fileController.downloadFileGet);

// filerRouter.get("/download/:fileId", fileController.downloadFile);

module.exports = fileRouter;
