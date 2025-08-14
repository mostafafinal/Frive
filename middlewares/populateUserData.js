const { getMainFolder, getAllFolders } = require("../models/queries");

const fileIcons = {
  IMAGE: "/icons/image.svg",
  VIDEO: "/icons/video.svg",
  DOCUMENT: "/icons/doc.svg",
  AUDIO: "/icons/audio.svg",
  OTHER: "/icons/other.svg",
};

const populateUser = (req, res, next) => {
  try {
    if (req.isAuthenticated()) res.locals.currentUser = req.user;

    next();
  } catch (err) {
    console.error(`MIDDLEWARE ERROR\n ${err}`);
  }
};

const populateMainFolder = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const { id } = req.user;

      const folder = await getMainFolder(id);
      const allFolders = await getAllFolders(id);

      res.locals.folderId = folder.id;
      res.locals.files = folder.files;
      res.locals.subfolders = folder.subfolders;
      res.locals.folderName = folder.name;
      res.locals.allFolders = allFolders;
      res.locals.fileIcons = fileIcons;
    }

    next();
  } catch (err) {
    console.error(`MIDDLEWARE ERROR\n ${err}`);
  }
};

const populateAllFolders = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const fileIcons = {
      IMAGE: "/icons/image.svg",
      VIDEO: "/icons/video.svg",
      DOCUMENT: "/icons/doc.svg",
      AUDIO: "/icons/audio.svg",
      OTHER: "/icons/other.svg",
    };
    const { id } = req.user;

    const allFolders = await getAllFolders(id);

    res.locals.allFolders = allFolders;
    res.locals.fileIcons = fileIcons;
  }

  next();
};

module.exports = { populateUser, populateMainFolder, populateAllFolders };
