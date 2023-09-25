import express from "express";
import User from "../Model/Model.js";
import authenticate from "../middleware/Authenticate.js";
import {  registerUser,  loginUser,  getUserProfile,  getData,  contactUser,  addCertificate,  logoutUser,  getAllData,} from "../Controller/Controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(`Hello backend from router`);
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authenticate, getUserProfile);

router.get("/getData", authenticate, getData);

router.post("/contact", authenticate, contactUser);

router.post("/certificate", authenticate, addCertificate);

router.get("/logout", logoutUser);

router.get("/getAllData", getAllData);

export default router;
