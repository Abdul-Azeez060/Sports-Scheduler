const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    next();
  } catch (error) {
    res.clearCookie("token");
    res.redirect("/login");
  }
};

const alreadyLoggedIn = (req, res, next) => {
  console.log("this is inside already logged in");
  if (req.cookies.token) {
    console.log("this is insidde already logged in");
    return res.send("You are already logged in");
  }
  next();
};

module.exports = { authenticateToken, alreadyLoggedIn };
