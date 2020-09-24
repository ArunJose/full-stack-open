const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use(morgan("tiny"));
app.use(morgan(":post-data"));

morgan.token("post-data", function (req, res) {
  if (req.method === "POST") return JSON.stringify(req.body);
});

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

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    res.status(400).json({ error: "content missing" });
  } else if (persons.find((person) => person.name === name)) {
    res.status(409).json({ error: "name must be unique" });
  } else {
    const newContact = {
      name,
      number,
      id: Math.ceil(10000 * Math.random()),
    };
    persons.push(newContact);
    res.json(newContact);
  }
});

app.listen(PORT);
console.log(`Server running on port ${PORT}`);
