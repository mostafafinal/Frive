const {
    uploadFile,
    getFileById,
    updateFileName,
    deleteFile,
} = require("../models/queries");
const hanldeFileType = require("../helpers/handleFileType");

const uploadPost = async (req, res, next) => {
    try {
        const fileMeta = {
            ...req.file,
            filename: req.file.filename.replace(/\.[^/.]+$/, ""),
            url: "/mystorage/file/",
            mimetype: hanldeFileType(req.file.mimetype),
            folderId: Number(req.params.folderId),
        };
        console.log(fileMeta);
        await uploadFile(fileMeta);

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const showFileGet = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("you're not logged in");

        const { fileId } = req.params;

        const file = await getFileById(Number(fileId));

        res.render("file.ejs", { file: file });
    } catch (err) {
        next(err);
    }
};

const updateFileNamePost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const { fileId } = req.params;
        const { newFileName } = req.body;

        await updateFileName(Number(fileId), newFileName);

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const deleteFilePost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const { fileId } = req.params;

        await deleteFile(Number(fileId));

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const downloadFile = async (req, res, next) => {
    try {
        if (!req.isAuthenticated())
            throw new Error("your're not authenticated");

        const file = await getFileById(Number(req.params.fileId));

        res.download(file.filePath, (err) => {
            if (err) return next(err);
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadPost,
    showFileGet,
    updateFileNamePost,
    deleteFilePost,
    downloadFile,
};
