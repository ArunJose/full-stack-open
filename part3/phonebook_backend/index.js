const express = require("express");
const app = express();

const PORT = 3001;

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info of ${persons.length} people.</p>
    <p>${date}</p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  {
    const person = persons.find((person) => person.id === Number(req.params.id));
    if (person) {
      res.json(person);
    } else {
      res.status(404).send();
    }
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).send();
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);