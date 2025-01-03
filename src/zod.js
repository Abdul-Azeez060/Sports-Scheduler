const { z } = require("zod");

const LoginSchema = z.object({
  username: z
    .string()
    .regex(
      new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/),
      "username should contain only alphabets"
    ),
  password: z.string().min(6),
});

const RegisterSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "PLAYER"]),
});

const SportSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  totalSpots: z.number().int(),
  matchDate: z.date(),
});

module.exports = { LoginSchema, RegisterSchema, SportSchema };
