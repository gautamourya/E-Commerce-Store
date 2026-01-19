const UserModel = require("../models/auth.model");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");

// conosole
//register users
Router.post("/register", async (req, res) => {
  try {
    console.log("Request Body data:", req.body);
    const { name, email, password, isAdmin,  phone , acceptTerms } = req.body;

    const user = await UserModel.create({
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
      phone: phone,
      acceptTerms:acceptTerms
    });

    res.status(201).json({
      message: "Successfully register",
      user: user,
    });
  } catch (err) {
    res.send({ message: err.message });
  }
});



Router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid =
      typeof user.password === "string" &&
      user.password.trim() === password.trim();

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


Router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.token;
console.log("Token:", token);
    if (!token) {
      return res.status(401).json({
        message: "not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

Router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,    
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

Router.patch("/profile", async (req, res) => {
  try {
    token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const updatedData = req.body || {};
    if (typeof updatedData.password === "string") {
      updatedData.password = updatedData.password.trim();
      if (updatedData.password.length < 8) {
        return res.status(401).json({
          message: "Password must be at least 8 characters long",
        });
      }
    } else {
      delete updatedData.password;
    }

    console.log(updatedData);
    let updatedUser = await UserModel.findByIdAndUpdate(
      decoded.id,
      updatedData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

Router.patch("/cart", async (req, res) => {
  try {
    token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = req.body;

    let updatedUser = await UserModel.findByIdAndUpdate(decoded.id, user);
    if (!updatedUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Item added to Cart",
      user: user,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = Router;
