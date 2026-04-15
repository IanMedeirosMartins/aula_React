
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let pessoas = [];

//criar
app.post('/pessoas', (req, res) => {
    const { txtNome, txtIdade, cmbUF} = req.body;

    const novaPessoa = {
        id: Date.now(),
        nome: txtNome,
        idade: txtIdade,
        uf: cmbUF
    };

    pessoas.push(novaPessoa);

    res.json(novaPessoa);
});
 //listar
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

// atualizar
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { txtNome, txtIdade, cmbUF } = req.body;

    const index = pessoas.findIndex(p => p.id == id);

    if (index !== -1) {
        pessoas[index] = {
            id: Number(id),
            nome: txtNome,
            idade: txtIdade,
            uf: cmbUF
        };

        res.json(pessoas[index]);
    } else {
        res.status(404).json({ erro: "Pessoa não encontrada" });
    }
});

// deletar
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;

    pessoas = pessoas.filter(p => p.id !== Number(id));

    res.json({ mensagem: "Removido com sucesso" });
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});