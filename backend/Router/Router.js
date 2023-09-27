import express from "express";
import Authenticate from "../middleware/Authenticate.js";
import {  registerUser,  loginUser,  getUserProfile,  getData,  addCertificate,  logoutUser,  getAllData, getAllNotifications, postNotification,} from "../Controller/Controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(`Hello backend from router`);
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", Authenticate, getUserProfile);

router.get("/getData", Authenticate, getData);


router.post("/certificate", Authenticate, addCertificate);

router.get("/logout", logoutUser);

router.get("/getAllData", getAllData);
router.get("/getAllNotifications",getAllNotifications)
router.post("/postNotification",postNotification)
export default router;
