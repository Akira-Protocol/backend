const campaigns = []; 

// Create a new campaign
const upload = require('../services/uploadService');

exports.createCampaign = (req, res) => {
    try {
        const { campaign_name, campaign_goals, target_audience, budget, duration, bidding_strategy } = req.body;

        if (!campaign_name || !campaign_goals || !target_audience || !budget || !duration) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Handle media file (image or video)
        let mediaType = null;
        let mediaPath = null;

        if (req.files) {
            if (req.files.image && req.files.image.length > 0) {
                mediaType = "image";
                mediaPath = req.files.image[0].path;
            } else if (req.files.video && req.files.video.length > 0) {
                mediaType = "video";
                mediaPath = req.files.video[0].path;
            }
        }

        if (!mediaType || !mediaPath) {
            return res.status(400).json({ error: "Image or video file is required" });
        }

        const newCampaign = {
            id: campaigns.length + 1,
            campaign_name,
            campaign_goals,
            target_audience,
            budget,
            duration,
            bidding_strategy,
            ad_creative: {
                type: mediaType,
                path: mediaPath
            },
            status: "active",
            created_at: new Date(),
        };

        campaigns.push(newCampaign);
        res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
    } catch (error) {
        console.error("Campaign creation error:", error);
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

// Get active campaigns
exports.getActiveCampaigns = (req, res) => {
    const activeCampaigns = campaigns.filter(campaign => campaign.status === "active");
    res.status(200).json(activeCampaigns);
};

// Get campaign reports (Dummy Data)
exports.getCampaignReports = (req, res) => {
    res.status(200).json({
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter(c => c.status === "active").length,
        completedCampaigns: campaigns.filter(c => c.status === "completed").length,
    });
};
