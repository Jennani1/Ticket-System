const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
});

app.get("/api/tickets", (req, res) => {
    const tickets = db.prepare("SELECT * FROM tickets").all();

    res.json(tickets);
});

app.post("/api/tickets", (req, res) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    db.prepare(
        "INSERT INTO tickets (code, created_at, used) VALUES (?, ?, ?)"
    ).run(code, new Date().toISOString(), 0);

    res.status(201).json({
        code: code,
        used: false
    });
});

app.post("/api/tickets/:code/use", (req, res) => {
    const code = req.params.code;

    const ticket = db.prepare(
        "SELECT * FROM tickets WHERE code = ?"
    ).get(code);

    if (!ticket) {
        return res.status(404).json({ message: "Biljetten finns inte" });
    }

    if (ticket.used === 1) {
        return res.status(400).json({ message: "Biljetten är redan använd" });
    }

    db.prepare(
        "UPDATE tickets SET used = 1 WHERE code = ?"
    ).run(code);

    res.json({ message: "Biljetten har använts" });
});

app.delete("/api/tickets/:code", (req, res) => {
    const code = req.params.code;

    const ticket = db.prepare(
        "SELECT * FROM tickets WHERE code = ?"
    ).get(code);

    if (!ticket) {
        return res.status(404).json({ message: "Biljetten finns inte" });
    }

    if (ticket.used === 1) {
        return res.status(400).json({ message: "Använd biljett kan inte raderas" });
    }

    db.prepare(
        "DELETE FROM tickets WHERE code = ?"
    ).run(code);

    res.json({ message: "Biljetten har raderats" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servern kör på http://localhost:${PORT}`)
});
module.exports = app;