const prisma = require("../config/prismaClient");

const findUserByEmail = async (userEmail) => {
    try {
        if (!userEmail) throw new Error("user email's not provided");

        const user = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });

        return user;
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const addUser = async (userData) => {
    try {
        if (!userData.email || !userData.hashedPassword)
            throw new Error("user data's not provided");

        await prisma.user.create({
            data: {
                email: userData.email,
                password: userData.hashedPassword,
                folders: {
                    create: {
                        name: "Main",
                    },
                },
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const loginUser = async (useremail) => {
    try {
        if (!useremail) throw new Error("user email isn't provided");

        const user = await prisma.user.findFirst({
            where: {
                email: useremail,
            },
        });

        if (!user) throw new Error("user's not found");

        return user;
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const findUserById = async (userId) => {
    try {
        if (!userId || typeof userId !== "number")
            throw new Error("invalid user id");

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) throw new Error("user not found");

        return user;
    } catch (err) {
        console.error(`DB ERROR\b${err}`);
    }
};

const getMainFolder = async (userId) => {
    if (!userId) throw new Error("user id's not provided");

    const folder = await prisma.folder.findFirst({
        where: {
            ownerId: userId,
            parentId: null,
        },
        include: {
            files: true,
            subfolders: true,
        },
    });

    return folder;
};

const getAllFolders = async () => {
    const folders = await prisma.folder.findMany();

    return folders;
};

const openFolderById = async (folderId) => {
    if (!folderId) throw new Error("folder id's not provided");

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId,
        },
        include: {
            subfolders: true,
            files: true,
        },
    });

    return folder;
};

const newFolder = async (folderId, userId, folderName) => {
    if (!folderId || !folderName || !userId)
        throw new Error("either folder id or name are not provided");

    await prisma.folder.create({
        data: {
            name: folderName,
            parentId: folderId,
            ownerId: userId,
        },
    });
};

const updateFolderName = async (folderId, newFolderName) => {
    if (!folderId || !newFolderName)
        throw new Error("either folder id or name aren't provided");

    await prisma.folder.update({
        data: {
            name: newFolderName,
        },
        where: {
            id: folderId,
        },
    });
};

const deleteFolder = async (folderId) => {
    try {
        if (!folderId || typeof folderId !== "number")
            throw new Error("folder id's not provided");

        await prisma.folder.delete({
            where: {
                id: folderId,
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const uploadFile = async (fileMeta) => {
    try {
        await prisma.file.create({
            data: {
                name: fileMeta.originalname,
                filePath: fileMeta.path,
                fileUrl: fileMeta.url,
                displayName: fileMeta.filename,
                fileType: fileMeta.mimetype,
                size: fileMeta.size,
                folderId: fileMeta.folderId,
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const getFileById = async (fileId) => {
    try {
        if (!fileId) throw new Error("file id's not provided");

        const file = await prisma.file.findFirst({
            where: {
                id: fileId,
            },
        });

        return file;
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const updateFileName = async (fileId, newFileName) => {
    try {
        if (typeof fileId !== "number" || !newFileName)
            throw new Error("either invalid file id or new name");

        await prisma.file.update({
            data: {
                displayName: newFileName,
            },
            where: {
                id: fileId,
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const deleteFile = async (fileId) => {
    try {
        if (!fileId || typeof fileId !== "number")
            throw new Error("invalid file id");

        await prisma.file.delete({
            where: {
                id: fileId,
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

module.exports = {
    findUserByEmail,
    addUser,
    loginUser,
    findUserById,
    getMainFolder,
    getAllFolders,
    openFolderById,
    newFolder,
    updateFolderName,
    deleteFolder,
    uploadFile,
    getFileById,
    updateFileName,
    deleteFile,
};
