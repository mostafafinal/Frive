const storageGet = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) throw new Error("user's not authenticated");

    res.render("mystorage");
  } catch (err) {
    res.redirect("/");

    next(err);
  }
};

const logOutGet = (req, res, next) => {
  res.clearCookie("x-auth-token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    partitioned: true,
  });

  res.status(200).redirect("/");
};

module.exports = { storageGet, logOutGet };
