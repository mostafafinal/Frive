const bcrypt = require("bcrypt");

const validPassword = async (password, hashedPassword) => {
    try {
        if (!password || !hashedPassword)
            throw new Error("password || userpassword error");

        const match = await bcrypt.compare(password, hashedPassword);

        return match;
    } catch (err) {
        console.error(`BCRYPT ERROR\n ${err}`);
    }
};

const hashPassword = async (password) => {
    try {
        if (!password) throw new Error("password not provided correctly");

        const hashedPassword = await bcrypt.hash(password, 10);

        return hashedPassword;
    } catch (err) {
        console.error(`BCRYPT ERROR\n ${err}`);
    }
};

module.exports = { validPassword, hashPassword };
