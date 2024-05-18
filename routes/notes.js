const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");

// GET method to display all the notes from db.json file
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST method to add a new note to db.json file
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "Success",
      body: newNote,
    };
    res.json(response);
  }
});

// DELETE method to detele a note based on the ID
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;

    readFromFile("./db/db.json")
      .then((data) => {
        const notesList = JSON.parse(data).filter(note => note.id !== noteId);
        const noteToDelete = JSON.parse(data).find(note => note.id === noteId);
        writeToFile('./db/db.json', notesList);
        const response = {
          status: 'Success',
          body: noteToDelete
        };
        res.json(response);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
    
});
module.exports = notes;
