const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       properties:
 *         campaign_name:
 *           type: string
 *         campaign_goals:
 *           type: string
 *         target_audience:
 *           type: string
 *         budget:
 *           type: number
 *         duration:
 *           type: string
 *         bidding_strategy:
 *           type: string
 */

/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create a new ad campaign
 *     description: Creates a new ad campaign with the provided details and media file (image or video).
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - campaign_name
 *               - campaign_goals
 *               - target_audience
 *               - budget
 *               - duration
 *               - bidding_strategy
 *             properties:
 *               campaign_name:
 *                 type: string
 *                 description: The name of the ad campaign
 *               campaign_goals:
 *                 type: string
 *                 description: The goals of the campaign
 *               target_audience:
 *                 type: string
 *                 description: The target audience for the campaign
 *               budget:
 *                 type: number
 *                 description: The budget allocated for the campaign
 *               duration:
 *                 type: string
 *                 description: The duration of the campaign
 *               bidding_strategy:
 *                 type: string
 *                 description: The bidding strategy for the campaign
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the ad (JPG or PNG)
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file for the ad
 *     responses:
 *       201:
 *         description: Campaign created successfully
 *       400:
 *         description: Bad request
 */

const upload = require('../services/uploadService');
router.post("/", upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]), campaignController.createCampaign);
// router.get('/', campaignController.getCampaigns);
// router.get('/:id', campaignController.getCampaignById);
// router.put('/:id', campaignController.updateCampaign);


/**
 * @swagger
 * /api/campaigns/active:
 *   get:
 *     summary: Get active campaigns
 *     description: Retrieves all active campaigns.
 *     responses:
 *       200:
 *         description: List of active campaigns
 */
router.get("/active", campaignController.getActiveCampaigns);

/**
 * @swagger
 * /api/campaigns/reports:
 *   get:
 *     summary: Get campaign reports
 *     description: Retrieves reports on campaigns.
 *     responses:
 *       200:
 *         description: Campaign reports
 */
router.get("/reports", campaignController.getCampaignReports);

module.exports = router;
