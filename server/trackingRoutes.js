const express = require("express");
const router = express.Router();

const trackingRequests = []; // Temporary storage (replace with DB in production)

// Get all tracking requests
router.get("/tracking-requests", (req, res) => {
  res.json(trackingRequests);
});

// Add a new tracking request
router.post("/tracking-requests", (req, res) => {
  const newRequest = {
    id: trackingRequests.length + 1,
    ...req.body,
  };
  trackingRequests.push(newRequest);
  res.status(201).json(newRequest);
});

// Update tracking request status
router.patch("/tracking-requests/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const request = trackingRequests.find((req) => req.id === parseInt(id));
  if (request) {
    request.status = status;
    res.json(request);
  } else {
    res.status(404).send("Request not found");
  }
});

module.exports = router;
