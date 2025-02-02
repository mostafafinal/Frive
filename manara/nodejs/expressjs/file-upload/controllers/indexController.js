const db = require("../models/queries");
const { validationResult } = require("express-validator");
const signupValidation = require("../middlewares/signupValidation");
const { hashPassword } = require("../helpers/vaildPassword");

const indexGet = (req, res, next) => {
    try {
        res.render("index");
    } catch (err) {
        next(err);
    }
};

const signupGet = (req, res, next) => {
    try {
        res.render("signup");
    } catch (err) {
        next(err);
    }
};

const signupPost = [
    signupValidation,
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).render("signup", { errors: errors.array() });
        }

        const { email, password } = req.body;

        const hashedPassword = await hashPassword(password);
        await db.addUser({ email, hashedPassword });

        res.redirect("login");
    },
];

const loginGet = (req, res, next) => {
    try {
        res.render("login");
    } catch (err) {
        next(err);
    }
};

const mystorageGet = (req, res, next) => {
    try {
        if (!req.isAuthenticated()) throw new Error("user's not authenticated");

        res.render("mystorage");
    } catch (err) {
        res.redirect("/login");

        next(err);
    }
};

module.exports = { indexGet, signupGet, loginGet, signupPost, mystorageGet };
