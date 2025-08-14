const { Router } = require("express");
const fileController = require("../controllers/fileController");
const upload = require("../middlewares/handleUploads");

const fileRouter = Router();

fileRouter.post(
    "/:folderId",
    upload.single("files"),
    fileController.uploadPost
);

fileRouter.get("/:id", fileController.showFileGet);

fileRouter.put("/:id/rename", fileController.updateFileNamePost);

fileRouter.put("/:id/move", fileController.moveFilePost);

fileRouter.delete("/:id", fileController.deleteFilePost);

fileRouter.get("/:id/download", fileController.downloadFileGet);

module.exports = fileRouter;
