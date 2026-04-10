const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database("./database.db");

// Criar tabela
db.run(`
  CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    uf TEXT
  )
`);

// 🔹 CREATE
app.post("/pessoas", (req, res) => {
  const { nome, idade, uf } = req.body;
  db.run(
    "INSERT INTO pessoas (nome, idade, uf) VALUES (?, ?, ?)",
    [nome, idade, uf],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

// 🔹 READ
app.get("/pessoas", (req, res) => {
  db.all("SELECT * FROM pessoas", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// 🔹 UPDATE
app.put("/pessoas/:id", (req, res) => {
  const { nome, idade, uf } = req.body;
  db.run(
    "UPDATE pessoas SET nome=?, idade=?, uf=? WHERE id=?",
    [nome, idade, uf, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes });
    }
  );
});

// 🔹 DELETE
app.delete("/pessoas/:id", (req, res) => {
  db.run("DELETE FROM pessoas WHERE id=?", req.params.id, function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));