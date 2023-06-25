import express from 'express'; // Importa o módulo do Express Framework

const app = express(); // Inicializa um objeto de aplicação Express

// Declara um array de produtos com id, decsrição, marca e preço
const produtos= [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
  ]

//Processa o corpo da requisição e insere os dados recebidos
// como atributos da req.body
app.use(express.json());

app.use((req, res, next) => {
  console.log (new Date().toLocaleDateString(), req.method, req.url);
  next();
})

//Mensagem para acesso geral
app.get ('/',(req, res) => {  
  let msg = 'Você acessou Exercício 1 - Montagem de uma API RESTful.';   
  res.status(200).json( { 
      message: msg,
  });
  console.log(msg)
})


//Obter a lista de produtos
app.get ('/api/produtos', (req, res) =>{
  res.json(produtos)
});

//Obter um produto específico
app.get ('/api/produtos/:id', (req, res) =>{
  let produto = produtos.find(p => p.id == req.params.id);
  if (produto) {
    res.json(produto);
  }else {
    res.status(404).send(`Produto ${req.params.id} não encontrado`);
  } 
})

//Incluir um produto
app.post('/api/produtos', (req, res) => {
  console.log(req.body);
  const lastId = Math.max(...produtos.map(produto => produto.id));
  req.body.id = lastId + 1;
  produtos.push(req.body);

  res.status(201).json( { 
      message: 'Produto adicionado com sucesso',
      data: { id: req.body.id } });  
})

// Alterar um produto
app.put('/api/produtos/:id', (req, res) => {
  const produtoIndex = produtos.findIndex(p => p.id == req.params.id);
  if (produtoIndex === -1) {
    res.status(404).json({ message: `Produto ${req.params.id} não encontrado` });
  } else {
    produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
    res.json({ message: `Produto ${req.params.id} atualizado com sucesso` });
  }
});

// Excluir um produto
app.delete('/api/produtos/:id', (req, res) => {
  const produtoIndex = produtos.findIndex(p => p.id == req.params.id);
  if (produtoIndex === -1) {
    res.status(404).json({ message: `Produto ${req.params.id} não encontrado` });
  } else {
    produtos.splice(produtoIndex, 1);
    res.json({ message: `Produto ${req.params.id} excluído com sucesso` });
  }
});

app.use ("/",(req, res) => {    
    res.status(404);
    res.send('Recurso solicitado não existe');
})


// Inicializa o servidor HTTP na porta 3000
const port = 3000
const servidor = '127.0.0.1'
app.listen(port, function () {
  console.log(`Servidor rodando em http://${servidor}:${port}`);
});


