const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { LoginSchema, RegisterSchema } = require("../zod");

const prisma = new PrismaClient();

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { error } = LoginSchema.safeParse({ username, password });

    if (error) {
      return res.render("auth/login", { error: error.issues[0].message });
    }
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.render("auth/login", { error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.redirect(
      user.role === "ADMIN" ? "/admin/dashboard" : "/player/dashboard"
    );
  } catch (error) {
    res.render("auth/login", { error: error.message });
  }
}

async function register(req, res) {
  try {
    console.log("this is coming to register");
    const { username, password, role } = req.body;
    const { error } = RegisterSchema.safeParse({ username, password, role });

    if (error) {
      return res.render("auth/login", { error: error.issues[0].message });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.redirect(role === "ADMIN" ? "/admin/dashboard" : "/player/dashboard");
  } catch (error) {
    res.render("auth/register", { error: error.message });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/");
}

function loginPage(req, res) {
  res.render("auth/login", { error: null });
}

function registerPage(req, res) {
  res.render("auth/register", { error: null });
}

module.exports = { login, register, logout, loginPage, registerPage };
