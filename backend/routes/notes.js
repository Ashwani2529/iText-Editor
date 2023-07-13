const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note= require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
     body("tag").isLength({ min: 1 }),
    body("description").isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const { title,tag, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        tag,
        description,
        
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title,tag,description } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (tag) {
    newNote.tag = tag;
  }
  if (description) {
    newNote.description = description;
  }
 
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access denied");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Access denied");
    }
    await Note.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
