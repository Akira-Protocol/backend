const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Process a new payment
 *     description: Endpoint to handle payment processing
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               currency:
 *                 type: string
 *                 description: Currency code (e.g., USD)
 *               paymentMethod:
 *                 type: string
 *                 description: Payment method (e.g., credit_card, paypal)
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Invalid payment information
 *       500:
 *         description: Server error
 */
router.post("/", paymentController.processPayment);

module.exports = router;