const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./config/prismaClient");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const storageRouter = require("./routes/storageRouter");

/**
 * GENERAL SETUP
 */
require("./config/passport");
const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

/**
 * SESSION SETUP
 */
const prismaStore = new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
});

app.use(
    session({
        store: prismaStore,
        secret: process.env.DATABASE_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
    })
);

/**
 * PASSPORT SETUP
 */
app.use(passport.session());

/**
 * Routes SETUP
 */
app.use("/mystorage", storageRouter);
app.use("/", indexRouter);

/**
 * ERROR HANDLING
 */
// app.use((req, res, next) => {
//     throw new Error("OH NO!");
// });

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send(err.message);
});

app.listen(process.env.PORT, () =>
    console.log(`Running at http://localhost:${process.env.PORT}`)
);
