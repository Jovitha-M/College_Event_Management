const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;

// Configure multer for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Data store for messages (in-memory for this example)
const messages = [];

app.use(bodyParser.json());

// Serve static files (CSS, JavaScript, etc.) from a 'public' directory
app.use(express.static("public"));

// Handle POST requests to store messages with text, images, and videos
app.post(
  "/post-message",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 5 },
  ]),
  (req, res) => {
    const message = req.body.message;
    const imageFiles = req.files["images"];
    const videoFiles = req.files["videos"];

    // Process the message, images, and videos as needed
    // For this example, we're just storing the message and file data
    const newMessage = {
      text: message,
      images: imageFiles,
      videos: videoFiles,
    };
    messages.push(newMessage);

    res.sendStatus(200);
  }
);

// Handle GET requests to retrieve messages
app.get("/get-messages", (req, res) => {
  res.json({ messages });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
