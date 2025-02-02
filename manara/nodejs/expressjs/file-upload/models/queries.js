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
            },
        });
    } catch (err) {
        console.error(`DB ERROR\n${err}`);
    }
};

const loginUser = async (useremail) => {
    try {
        console.log(useremail);
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
        console.log(userId);
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

module.exports = { findUserByEmail, addUser, loginUser, findUserById };
