const { body, check } = require("express-validator");
const { findUserByEmail } = require("../models/queries");

const signupValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email name is empty")
        .bail()
        .isEmail()
        .withMessage("incorrect email format")
        .bail()
        .custom(async value => {
            const existedUser = await findUserByEmail(value);

            if (existedUser) throw new Error("user already existed");
        })
        .bail(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("password name is empty")
        .bail()
        .isLength({ min: 8, max: 15 })
        .withMessage("min password length is 8, max length is 15")
        .bail(),
    check("r-password")
        .trim()
        .notEmpty()
        .withMessage("password name is empty")
        .bail()
        .isLength({ min: 8, max: 15 })
        .withMessage("min password length is 8, max length is 15")
        .bail()
        .custom(async (confirmPassword, { req }) => {
            const { password } = req.body;

            if (password !== confirmPassword)
                throw new Error("password not matched");
        })
        .bail(),
];

module.exports = signupValidation;
