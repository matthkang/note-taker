const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all saved notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received to get all notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for saving a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a notes`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🗒️`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;
