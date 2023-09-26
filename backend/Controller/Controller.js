import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/Model.js";

export const registerUser = async(req, res)=> {
  const { name, email, password, regno, dept, year } = req.body;
  if (!name || !email || !password || !regno || !dept || !year) {
    return res.status(422).json({ error:"Please fill in all required fields." });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    } else {
      const user = new User({ name, email, password, regno, dept, year });
      await user.save();
      res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
  }
}

export const loginUser = async(req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ error: "Missing credentials: mail or password" });
          }
          const userLogin = await User.findOne({ email: email });
          if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
              res.status(400).json({ error: "Invalid credentials" });
            } else {
              const token = await userLogin.generateAuthToken();
              res.cookie("jwtoken", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 3600000),
              });
              res.status(200).json({ message: "Login success" });
            }
          } else {
            res.status(400).json({ error: "User not found" });
          }
        } catch (err) {
          console.log(err);
        }
      }
export const getUserProfile = (req, res) =>{
  res.send(req.rootUser);
}

export const getData = (req, res) =>{
  res.send(req.rootUser);
}

export const contactUser = async(req, res)=> {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(422).json({ error: "Fill all contact fields" });
    }
    const userContact = await User.findOne({ _id: req.rootUserId });
    if (userContact) {
      const userMessage = await userContact.addMessage(name, email, message);
      await userContact.save();
      return res.status(201).json({ message: "Message sent successfully" });
    }
  } catch (error) {
    res.status(404).json({error:error})
  }
}

export const addCertificate  =async(req, res)=> {
  try {
    const { title, selectedFile } = req.body;
    if (!title || !selectedFile) {
      return res.status(422).json({ error: "Please fill in all required fields." });
    }
    const dataExist = await User.findOne({ _id: req.rootUserId });
    if (dataExist) {
      const userCertificate = await dataExist.addCertificate(title, selectedFile);
      await dataExist.save();
      return res.status(201).json({ message: "Upload Success" });
    }
  } catch (error) {
    res.status(422).json({error:error})
  }
}

export const logoutUser = (req, res)=> {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send(`userLogout`);
}

export const getAllData = async(req, res)=> {
  try {
    const allCertificates = await User.find();
    res.status(200).json(allCertificates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}