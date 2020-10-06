const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Survey = require("../models/Survey");
const checkAuthentication = require("../middleware/checkAuthentication");
const checkAuthorization = require("../middleware/checkAuthorization");
const moment = require("moment");

// Just To remove Comments

// User Dashboard
router.get("/dashboard", checkAuthentication, async (req, res) => {
  try {
    const surveys = await Survey.find({ user: req.user }).sort({
      createdAt: -1,
    });
    res.render("main/dashboard", { user: req.user, surveys });
  } catch (e) {
    console.log(e);
    res.json({ error: "Server Error" });
  }
});

// My Surveys
router.get("/survey/:id", async (req, res) => {
  try {

    // Retrieve survey
    const surveys = await Survey.find({ user: req.params.id })
      .populate("surveyQs")
      .exec();

    
    const user = await User.findById(req.params.id);
    res.render("main/public", { surveys, user: req.user, owner: user });
  } catch (e) {
    console.log(e);
    res.json({ error: "Server Error" });
  }
});

// Survey Create
router.post("/survey", checkAuthentication, async (req, res) => {
  const { title } = req.body;
  try {
    let newSurvey = new Survey({
      title,
      user: req.user,
      showDate: moment(new Date()).format("MMMM Do YYYY"),
    });
    newSurvey = await newSurvey.save();
    req.flash("success", "Survey created Successfully");
    res.redirect("back");
  } catch (e) {
    console.log(e);
    req.flash("error", "Sorry!! Server Error occurred");
    res.redirect("back");
  }
});

// Survey Update
router.put("/survey/:id", checkAuthorization, async (req, res) => {
  try {
    const { title } = req.body;
    await Survey.updateOne({ _id: req.params.id }, { title });
    req.flash("success", "Survey title Updated");
    res.redirect("back");
  } catch (e) {
    console.log(e);
    req.flash("error", "Sorry!! Server Error occurred");
    res.redirect("back");
  }
});

// Survey Delete
router.delete("/survey/:id", checkAuthorization, async (req, res) => {
  try {
    
    // Retrieve survey 
    const surveys = await Survey.findById(req.params.id)
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("surveyQs")
      .exec();

    await Survey.findByIdAndDelete(req.params.id);
    req.flash("success", "Survey deleted Successfully");
    res.redirect("back");
  } catch (e) {
    console.log(e);
    req.flash("error", "Sorry!! Server Error occurred");
    res.redirect("back");
  }
});

module.exports = router;
