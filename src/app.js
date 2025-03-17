const express = require("express");
const setupSwagger = require("../swaggerConfig");
const userRoutes = require("../src/routes/userRoutes");
const campaignRoutes = require("../src/routes/campaignRoutes");
const paymentRoutes = require("../src/routes/paymentRoutes");

const app = express();

// Middleware (if needed in the future)
app.use(express.json());

// Import routes
app.use("/api/campaigns", campaignRoutes);
app.use("/api/payments", paymentRoutes);

// Setup Swagger
setupSwagger(app);

module.exports = app; 