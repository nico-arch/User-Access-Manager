import express from "express";
import { sequelize } from "./config/database.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";

import router from "./routes/auth.js";

dotenv.config();

const app = express();

// Connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.log("Error: " + err));

sequelize.sync();

// Middleware
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", router);

const PORT = process.env["PORT"] || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
