const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

// Banco
const db = new Database("database.db");

// Criar tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS cadastros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    uf TEXT
  )
`).run();

// CREATE
app.post("/cadastro", (req, res) => {
  const { txtNome, txtIdade, cmbUF } = req.body;

  const result = db.prepare(
    "INSERT INTO cadastros (nome, idade, uf) VALUES (?, ?, ?)"
  ).run(txtNome, txtIdade, cmbUF);

  res.json({
    message: "Cadastro realizado!",
    id: result.lastInsertRowid
  });
});

// READ
app.get("/cadastro", (req, res) => {
  try {
    const dados = db.prepare("SELECT * FROM cadastros").all();
    res.json(dados);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
app.put("/cadastro/:id", (req, res) => {
  const { txtNome, txtIdade, cmbUF } = req.body;
  const id = req.params.id;

  try {
    db.prepare(
      "UPDATE cadastros SET nome=?, idade=?, uf=? WHERE id=?"
    ).run(txtNome, txtIdade, cmbUF, id);

    res.json({ message: "Atualizado!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
app.delete("/cadastro/:id", (req, res) => {
  const id = req.params.id;

  try {
    db.prepare("DELETE FROM cadastros WHERE id=?").run(id);
    res.json({ message: "Removido!" });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});