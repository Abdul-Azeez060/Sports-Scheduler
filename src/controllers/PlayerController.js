const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function dashboard(req, res) {
  if (req.user.role !== "PLAYER") {
    return res.redirect("/admin/dashboard");
  }

  const [availableSports, playerSports] = await Promise.all([
    prisma.sport.findMany({
      where: {
        availableSpots: { gt: 0 },
        matchDate: { gt: new Date() },
      },
    }),
    prisma.playerSport.findMany({
      where: { playerId: req.user.id },
      include: {
        sport: true,
      },
    }),
  ]);

  res.render("player/dashboard", {
    user: req.user,
    availableSports,
    playerSports,
  });
}

async function joinSport(req, res) {
  if (req.user.role !== "PLAYER") {
    return res.redirect("/admin/dashboard");
  }

  try {
    const { sportId } = req.params;

    await prisma.$transaction(async (prisma) => {
      const sport = await prisma.sport.findUnique({ where: { id: sportId } });

      if (!sport) {
        throw new Error("Sport not found");
      }

      if (sport.availableSpots <= 0) {
        throw new Error("No available spots");
      }

      await prisma.playerSport.create({
        data: {
          playerId: req.user.id,
          sportId,
        },
      });

      await prisma.sport.update({
        where: { id: sportId },
        data: { availableSpots: sport.availableSpots - 1 },
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect("/player/dashboard");
    await prisma.$disconnect();
  }
}

module.exports = { dashboard, joinSport };
