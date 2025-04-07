import express from "express";
import {v4 as uuidv4} from "uuid";
const router = express.Router();

const users = [
  {  name: "John Doe", email: "johndoe@email.com" },
  {  name: "Jane Smith", email: "janesmith@email.com" },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

router.post("/", (req, res) => {
  const user = req.body;
  user.id = uuidv4();
  users.push(user);
  res.send(`User ${user.name} added ✅`);
});

router.delete("/:id", (req, res) => {
  const userIndex = users.findIndex((user) => user.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).send("User not found 😫");
  }
  users.splice(userIndex, 1);
  res.send(`User with id ${req.params.id} deleted 😁`);
});

router.patch("/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id);
    if (!user) {
        return res.status(404).send("User not found");
    }
    const { name, email } = req.body;

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send("Invalid email format");
    }

    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    res.send(`User with id ${req.params.id} updated`);
});

export default router;