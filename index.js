import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Lista de empresas (simulando um banco de dados)
let empresas = [];

// Função para gerar o HTML da lista de empresas
function gerarListaEmpresas() {
  return empresas.map((empresa) => {
    return `<li><strong>CNPJ:</strong> ${empresa.cnpj}, <strong>Razão Social:</strong> ${empresa.razaoSocial}, <strong>Nome Fantasia:</strong> ${empresa.nomeFantasia}</li>`;
  }).join('');
}

// Função para exibir o formulário de cadastro
function cadastroEmpresaView(req, res) {
  const listaEmpresas = gerarListaEmpresas();

  res.send(`
    <html>
    <head>
      <title>Cadastro de Empresa</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
      <style>
        /* CSS com cores pastéis e aparência executiva */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f7fa; /* Fundo claro e suave */
          color: #333; /* Cor de texto escuro, legível */
        }
        .container {
          max-width: 800px;
          margin-top: 50px;
          padding: 30px;
          background-color: #ffffff; /* Fundo branco para o formulário */
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
          border-radius: 8px;
        }
        h2, h3 {
          color: #4a90e2; /* Cor azul suave para o título */
          font-weight: bold;
        }
        form {
          padding: 20px;
          background-color: #f8f8f8; /* Fundo cinza claro para o formulário */
          border-radius: 8px;
        }
        .form-label {
          font-weight: bold;
          color: #555; /* Cor suave para rótulos */
        }
        .form-control {
          background-color: #f1f3f5; /* Cor de fundo clara para os inputs */
          border: 1px solid #ddd; /* Borda leve */
          color: #333; /* Texto escuro nos campos */
        }
        .form-control:focus {
          border-color: #4a90e2; /* Cor de borda ao focar no campo */
          box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); /* Efeito de foco suave */
        }
        .btn-primary {
          background-color: #4a90e2; /* Cor azul suave para o botão */
          border-color: #4a90e2;
        }
        .btn-primary:hover {
          background-color: #357ab7; /* Efeito hover com tom mais escuro */
          border-color: #357ab7;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0; /* Linha sutil entre os itens */
        }
        li strong {
          color: #4a90e2; /* Cor azul para destacar informações */
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Cadastro de Empresa</h2>
        <form method="POST" action="/cadastrar-empresa">
          ${gerarCamposFormulario()}
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>

        <h3>Empresas Cadastradas:</h3>
        <ul>
          ${listaEmpresas}
        </ul>
      </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    </html>
  `);
}

// Função para gerar os campos do formulário
function gerarCamposFormulario() {
  return `
    <div class="mb-3">
      <label for="cnpj" class="form-label">CNPJ</label>
      <input type="text" id="cnpj" name="cnpj" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="razaoSocial" class="form-label">Razão Social</label>
      <input type="text" id="razaoSocial" name="razaoSocial" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
      <input type="text" id="nomeFantasia" name="nomeFantasia" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="endereco" class="form-label">Endereço</label>
      <input type="text" id="endereco" name="endereco" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="cidade" class="form-label">Cidade</label>
      <input type="text" id="cidade" name="cidade" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="uf" class="form-label">UF</label>
      <input type="text" id="uf" name="uf" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="cep" class="form-label">CEP</label>
      <input type="text" id="cep" name="cep" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" name="email" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="telefone" class="form-label">Telefone</label>
      <input type="text" id="telefone" name="telefone" class="form-control" required>
    </div>
  `;
}

// Função para validar os campos do formulário
function validarCampos(campos) {
  const camposVazios = [];
  for (const campo in campos) {
    if (!campos[campo]) {
      camposVazios.push(campo);
    }
  }
  return camposVazios;
}

// Função para adicionar uma nova empresa à lista
function adicionarEmpresa(cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone) {
  const novaEmpresa = { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone };
  empresas.push(novaEmpresa);
}

// Rota para exibir a página inicial ("/")
app.get('/', (req, res) => {
  res.redirect('/cadastrar-empresa');
});

// Rota para exibir o formulário de cadastro
app.get('/cadastrar-empresa', cadastroEmpresaView);

// Rota para processar o cadastro de empresa
app.post('/cadastrar-empresa', (req, res) => {
  const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

  // Validação dos campos
  const campos = { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone };
  const camposVazios = validarCampos(campos);
  
  if (camposVazios.length > 0) {
    return res.send(`
      <h1>Os seguintes campos são obrigatórios:</h1>
      <ul>
        ${camposVazios.map(campo => `<li>${campo}</li>`).join('')}
      </ul>
      <a href="/cadastrar-empresa">Voltar</a>
    `);
  }

  // Adiciona a empresa à lista
  adicionarEmpresa(cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone);

  // Redireciona para a página de cadastro com a lista de empresas atualizada
  res.redirect('/cadastrar-empresa');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 
