const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/", (req, res) => {
  res.send("User route is working!");
});

module.exports = router;
