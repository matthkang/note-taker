const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const dbData = require('../db/db.json')

// GET Route for retrieving all saved notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received to get all notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for saving a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🗒️`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    console.log("delete api");
    const requestedId = req.params.id;

    // Iterate through the id name to check if it matches `req.params.id`
    for (let i = 0; i < dbData.length; i++) {
        if (requestedId === dbData[i].id) {
            readAndDelete(dbData[i], './db/db.json');
        }
    }

    // Return a message if the id doesn't exist in the json
    return res.json('No match found');
});

module.exports = notes;
