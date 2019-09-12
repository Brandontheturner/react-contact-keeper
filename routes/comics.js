const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const Comic = require("../models/Comic");

// @route   GET  api/comics
// @desc    Get all users comics
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const comics = await Comic.find({ user: req.user.id }).sort({ date: -1 });
    res.json(comics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST  api/comics
// @desc    Add new comic
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newComic = new Comic({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const comic = await newComic.save();

      res.json(comic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/comics/:id
// @desc    Update comic
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build Comic Object
  const comicFields = {};
  if (name) comicFields.name = name;
  if (email) comicFields.email = email;
  if (phone) comicFields.phone = phone;
  if (type) comicFields.type = type;

  try {
    let comic = await Comic.findById(req.params.id);

    if (!comic) return res.status(404).json({ msg: "Contact not found" });
    // Make sure user owns contact
    if (comic.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    comic = await Comic.findByIdAndUpdate(
      req.params.id,
      { $set: comicFields },
      { new: true }
    );

    res.json(comic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/comics/:id
// @desc    Delete comic
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let comic = await Comic.findById(req.params.id);

    if (!comic) return res.status(404).json({ msg: "Contact not found" });
    // Make sure user owns comic
    if (comic.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Comic.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact Removed" });

    res.json(comic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
