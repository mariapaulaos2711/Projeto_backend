const express = require("express");
const registro = require("../dados.json");

const mostrarRegistro = (req, res) => {
    res.send(registro);
}

const novoRegistro = (req, res) => {
    if(req.body){
        res.send("Registro recebido");
        registro.push(req.body);
    }else {
        res.send("Erro ao receber registro");
    }
}

const excluirRegistro = (req, res) => {
   const id = req.params.id;

   registro.forEach((registro, indice) => {
    if(registro.id == id){
        registro.splice(indice, 1);
    }
   });
   
   res.send("Registro excluido com sucesso! ");
};


const alterarRegistro = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    registro.forEach((registro) => {
        if (registro.id == id){
            registro.item = dados.item;
            registro.local = dados.local;
            registro.dataRegistro= dados.dataRegistro;
            registro.valor = dados.valor;
            registro.patrimonio = dados.patrimonio;
        }
    });

    res.send("Registro atualizado com sucesso");
};

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
const porta = 3000;

//Rotas
app.get("/inventario", mostrarRegistro);
app.post("/inventario", novoRegistro);
app.delete("/inventario/:id", excluirRegistro);
app.put("/inventario/:id", alterarRegistro);

app.listen(porta, () =>{
    console.log(`Servidor: http://127.0.0.1.${porta}/inventario`);
})
