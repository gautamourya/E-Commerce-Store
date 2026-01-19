const UserModel = require("../models/auth.model");
const authController = require("../controllers/auth.controller");
const express = require("express");
const Router = express.Router();


Router.post("/register", authController.Register);
Router.post("/login", authController.Login);
Router.get("/verify",authController.VerifyToken);


module.exports = Router;




// Router.patch("/profile", async (req, res) => {
//   try {
//     token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const updatedData = req.body || {};
//     if (typeof updatedData.password === "string") {
//       updatedData.password = updatedData.password.trim();
//       if (updatedData.password.length < 8) {
//         return res.status(401).json({
//           message: "Password must be at least 8 characters long",
//         });
//       }
//     } else {
//       delete updatedData.password;
//     }

//     console.log(updatedData);
//     let updatedUser = await UserModel.findByIdAndUpdate(
//       decoded.id,
//       updatedData,
//       { new: true }
//     );
//     if (!updatedUser) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Router.patch("/cart", async (req, res) => {
//   try {
//     token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = req.body;

//     let updatedUser = await UserModel.findByIdAndUpdate(decoded.id, user);
//     if (!updatedUser) {
//       return res.status(401).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       message: "Item added to Cart",
//       user: user,
//     });
//   } catch (err) {
//     console.log(err);
//     if (err.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// });

