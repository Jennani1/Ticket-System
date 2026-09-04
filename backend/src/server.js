const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend fungerar!");
});

app.get("/api/tickets", (req, res) => {
    const tickets = [
        {
            id: 1,
            code: "ABC123",
            used: false
        },
        {
            id: 2,
            code: "XYZ789",
            used: true
        }
    ];

    res.json(tickets);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servern kör på http://localhost:${PORT}`);
});