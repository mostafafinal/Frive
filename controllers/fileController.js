const {
    uploadFile,
    getFileById,
    updateFileName,
    moveFile,
    downloadFile,
    deleteFile,
} = require("../models/queries");
const hanldeFileType = require("../helpers/handleFileType");

const uploadPost = async (req, res, next) => {
    try {
        if (!req.file) throw new Error("no file's been provided");

        const fileMeta = {
            ...req.file,
            filename: req.file.originalname.replace(/\.[^/.]+$/, ""),
            mimetype: hanldeFileType(req.file.mimetype),
            folderId: Number(req.params.folderId),
        };

        await uploadFile(fileMeta);

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const showFileGet = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("you're not logged in");

        const { id } = req.params;

        const file = await getFileById(Number(id));

        res.render("file.ejs", { file: file });
    } catch (err) {
        next(err);
    }
};

const updateFileNamePost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const { id } = req.params;
        const { newFileName } = req.body;

        await updateFileName(Number(id), newFileName);

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const moveFilePost = async (req, res, next) => {
    try {
        const { newFolderId } = req.body;
        const { id } = req.params;

        await moveFile(Number(newFolderId), Number(id));

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

const downloadFileGet = async (req, res, next) => {
    try {
        if (!req.isAuthenticated())
            throw new Error("your're not authenticated");

        const { filePath } = req.body;

        const file = await downloadFile(filePath);

        const buffer = Buffer.from(await file.arrayBuffer());

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${filePath.split("/").pop()}"`
        );
        res.setHeader("Content-Type", file.type);
        res.setHeader("Content-Length", buffer.length);

        res.send(buffer);
    } catch (err) {
        next(err);
    }
};

const deleteFilePost = async (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        const { id } = req.params;
        const { filePath } = req.body;

        await deleteFile(Number(id), filePath);

        res.redirect(req.get("referer"));
    } catch (err) {
        next(err);
    }
};

// const downloadFile = async (req, res, next) => {
//     try {
//         if (!req.isAuthenticated())
//             throw new Error("your're not authenticated");

//         const file = await getFileById(Number(req.params.fileId));

//         res.download(file.filePath, (err) => {
//             if (err) return next(err);
//         });
//     } catch (err) {
//         next(err);
//     }
// };

module.exports = {
    uploadPost,
    showFileGet,
    updateFileNamePost,
    moveFilePost,
    downloadFileGet,
    deleteFilePost,
};
