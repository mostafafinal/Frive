const { Router } = require("express");
const folderController = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/:id", folderController.openFolderGet);

folderRouter.post("/:id", folderController.createFolderPost);

folderRouter.put("/:id/rename", folderController.updateFolderNamePost);

folderRouter.put("/move/:id", folderController.moveFolderPost);

folderRouter.delete("/:id", folderController.deleteFolderPost);

module.exports = folderRouter;
