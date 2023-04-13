const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'notes.json');

// Get all notes
router.get('/api/notes', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Create a new note
router.post('/api/notes', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = {
      id: Date.now(),
      title: req.body.title,
      text: req.body.text,
    };
    notes.push(newNote);
    fs.writeFile(filePath, JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(notes);
    });
  });
});

module.exports = router;
