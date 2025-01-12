const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const playerRoutes = require("./routes/player");
const { alreadyLoggedIn } = require("./middleware/auth");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", alreadyLoggedIn, (req, res) => {
  res.render("index");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/player", playerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
