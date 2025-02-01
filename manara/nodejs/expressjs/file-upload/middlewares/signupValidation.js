const { body, check } = require("express-validator");
const dbQuery = require("../models/queries");

const signupValidation = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("first name is empty")
        .bail()
        .isAlpha()
        .withMessage("first name needs to be alphapetic")
        .bail(),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("last name is empty")
        .bail()
        .isAlpha()
        .withMessage("last name needs to be alphapetic")
        .bail(),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email name is empty")
        .bail()
        .isEmail()
        .withMessage("incorrect email format")
        .bail()
        .custom(async (value) => {
            const existedUser = await dbQuery.findUserByEmail(value);

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
    check("confirmPassword")
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
