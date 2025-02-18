const { PrismaClient } = require("@prisma/client");
const { SportSchema } = require("../zod");

const prisma = new PrismaClient();

class AdminController {
  static async dashboard(req, res) {
    if (req.user.role !== "ADMIN") {
      return res.redirect("/player/dashboard");
    }

    const sports = await prisma.sport.findMany({
      where: { adminId: req.user.id },
      include: {
        players: {
          include: {
            player: true,
          },
        },
      },
    });

    console.log(sports, "this is the sports");

    res.render("admin/dashboard", { user: req.user, sports });
  }

  static async updateSportsController(req, res) {
    if (req.user.role != "ADMIN") {
      return res.redirect("/player/dashboard");
    }
    const id = req.params.id;

    try {
      const { title, description, matchDate, location, totalSpots } = req.body;

      const { error } = SportSchema.safeParse({
        title,
        description,
        matchDate: new Date(matchDate),
        location,
        totalSpots: parseInt(totalSpots),
      });
      if (error) {
        console.log(error.issues[0]);
        return res.render("admin/create-sport", {
          user: req.user,
          error: error.issues[0].message + " " + error.issues[0].path,
        });
      }
      await prisma.sport.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          matchDate: new Date(matchDate),
          location,
          totalSpots: parseInt(totalSpots),
          availableSpots: parseInt(totalSpots),
          adminId: req.user.id,
        },
      });
      res.redirect("/admin/dashboard");
    } catch (error) {
      res.redirect("/admin/dashboard");
    }
  }
  static async updateSport(req, res) {
    if (req.user.role != "ADMIN") {
      return res.redirect("/player/dashboard");
    }
    const id = req.params.id;
    console.log(id, "this is the sportId");

    try {
      const sport = await prisma.sport.findUnique({
        where: {
          id,
        },
      });

      res.render("admin/update-sport", { user: req.user, sport, error: null });
    } catch (error) {
      res.render("admin/update-sport", { user: req.user, sport: null, error });
    }
  }

  static createSportPage(req, res) {
    if (req.user.role !== "ADMIN") {
      return res.redirect("/player/dashboard");
    }
    res.render("admin/create-sport", { user: req.user, error: null });
  }

  static async createSport(req, res) {
    if (req.user.role !== "ADMIN") {
      return res.redirect("/player/dashboard");
    }

    try {
      const { title, description, matchDate, location, totalSpots } = req.body;

      const { error } = SportSchema.safeParse({
        title,
        description,
        matchDate: new Date(matchDate),
        location,
        totalSpots: parseInt(totalSpots),
      });
      if (error) {
        console.log(error.issues[0]);
        return res.render("admin/create-sport", {
          user: req.user,
          error: error.issues[0].message + " " + error.issues[0].path,
        });
      }
      await prisma.sport.create({
        data: {
          title,
          description,
          matchDate: new Date(matchDate),
          location,
          totalSpots: parseInt(totalSpots),
          availableSpots: parseInt(totalSpots),
          adminId: req.user.id,
        },
      });
      res.redirect("/admin/dashboard");
    } catch (error) {
      res.render("admin/create-sport", {
        user: req.user,
        error: error.message,
      });
    }
  }
}

module.exports = AdminController;
