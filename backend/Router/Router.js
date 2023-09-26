import express from "express";
import User from "../Model/Model.js";
import Authenticate from "../middleware/Authenticate.js";
import {  registerUser,  loginUser,  getUserProfile,  getData,  contactUser,  addCertificate,  logoutUser,  getAllData,} from "../Controller/Controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send(`Hello backend from router`);
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", Authenticate, getUserProfile);

router.get("/getData", Authenticate, getData);

router.post("/contact", Authenticate, contactUser);

router.post("/certificate", Authenticate, addCertificate);

router.get("/logout", logoutUser);

router.get("/getAllData", getAllData);

export default router;
