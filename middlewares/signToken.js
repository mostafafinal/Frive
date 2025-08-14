const { SignJWT } = require("jose");

const signToken = async (req, res, next) => {
    try {
        if (!req.user) throw new Error("user data're not found");

        const payload = {
            id: req.user.id,
            email: req.user.email,
        };

        const enconder = new TextEncoder();
        const secretKey = enconder.encode(process.env.JWT_SECRET);

        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1d")
            .sign(secretKey);

        res.status(200).cookie("x-auth-token", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            sameSite: "none",
            secure: true,
            partitioned: true,
        });

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = signToken;
