import bcrypt from "bcryptjs";
import {User,Notification} from "../Model/Model.js";

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
                httpOnly: false,
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

export const getData = (req, res) =>{
  res.send(req.rootUser);
}

export const postNotification = async(req,res) => {
        try {
                const newNotification = new Notification({
                  message: req.body.message,
                });
                await newNotification.save();
                res.status(201).json({message:"Posted"});
              } catch (error) {
                res.status(400).json({ error: 'An error occurred' });
              }
}
export const getAllNotifications = async(req,res)  => {
        try {
                const notifications = await Notification.find({});
                res.status(200).json(notifications);
              } catch (error) {
                res.status(400).json({ error: 'An error occurred' });
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