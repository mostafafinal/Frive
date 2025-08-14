const {
    getAllFolders,
    openFolderById,
    newFolder,
    updateFolderName,
    moveFolder,
    deleteFolder,
} = require("../models/queries");

const mystorageGet = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        res.render("mystorage");
    } catch (err) {
        res.redirect("/login");

        next(err);
    }
};

const openFolderGet = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const fileIcons = {
            IMAGE: "/icons/image.svg",
            VIDEO: "/icons/video.svg",
            DOCUMENT: "/icons/doc.svg",
            AUDIO: "/icons/audio.svg",
            OTHER: "/icons/other.svg",
        };
        const { id } = req.params;

        const folder = await openFolderById(Number(id));

        const allFolders = await getAllFolders(id);

        res.render("mystorage", {
            folderId: folder.id,
            files: folder.files,
            subfolders: folder.subfolders,
            folderName: folder.name,
            allFolders: allFolders,
            fileIcons: fileIcons,
        });
    } catch (err) {
        next(err);
    }
};

const createFolderPost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");
        console.log(req.params);
        const { folderId } = req.params;
        const { foldername } = req.body;
        const userId = req.user.id;

        await newFolder(Number(folderId), userId, foldername);

        res.status(200).redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const updateFolderNamePost = async (req, res, next) => {
    try {
        console.log("hi");
        if (!req.isAuthenticated()) throw new Error("user's not authenticaded");

        const { folderId } = req.params;
        const { newName } = req.body;

        await updateFolderName(Number(folderId), newName);

        res.status(200).redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const moveFolderPost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const { newFolderId } = req.body;
        const { currFolderId } = req.params;

        await moveFolder(Number(newFolderId), Number(currFolderId));

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const deleteFolderPost = async (req, res, next) => {
    try {
        const { folderId } = req.params;

        await deleteFolder(Number(folderId));

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    mystorageGet,
    openFolderGet,
    createFolderPost,
    updateFolderNamePost,
    moveFolderPost,
    deleteFolderPost,
};
