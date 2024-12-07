import express from "express";
import webPush from "web-push";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

webPush.setVapidDetails("mailto:example@yourdomain.com", process.env.VAPID_PUBLIC, process.env.VAPID_PRIVATE);

router.post("/subscribe", (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({title: "Subscription Confirmed", message: "You are successfully subscribed to push notifications!"});

  webPush
    .sendNotification(subscription, payload)
    .then(() => res.status(200).json({message: "Subscription successful and notification sent!"}))
    .catch((err) => res.status(500).json({error: err.message}));
});

export default router;
