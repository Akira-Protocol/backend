const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter to check file types
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    // Accept only jpg and png for images
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPG and PNG image formats are supported'), false);
    }
  } else if (file.fieldname === 'video') {
    // Accept common video formats
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported video format'), false);
    }
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

// Set up multer with storage and file filter
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

module.exports = upload;