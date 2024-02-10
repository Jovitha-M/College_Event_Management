const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), { extensions: ["css"] })
);

// Define routes to serve HTML files
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/events", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "events.html"));
});

app.get("/dept_cards", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dept_cards.html"));
});

app.get("/calendar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "calendar.html"));
});

app.get("/community", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "community.html"));
});

app.get("/cse", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cse.html"));
});

app.get("/it", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "it.html"));
});

app.get("/ece", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "ece.html"));
});

app.get("/eee", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "eee.html"));
});

app.get("/mech", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "mech.html"));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
