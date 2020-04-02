---
__:warning: Este é um projeto teste de uma empresa fictícia para uso de ReactJS__

Frontend que suporta as telas do sistema para controle de folha de ponto da empresa XPTO.

---
---

# Empresa XPTO
### Sistema de Controle de Folha

---

**Descrição:**

- Este é um sistema de folha de ponto para controle de horas dos profissionais que trabalham na empresa fictícia XPTO. Com base em um cadastro inicial do colaborador e subsequente logon, poderá começar a administrar suas horas diárias de produção. 

#

**Como usar:**

- Diariamente, o colaborador deverá informar seu horário de entrada na empresa para adicionar uma nova folha àquele dia; 
- A cada novo intervalo, será preenchida a hora corrente de entrada ou saída coerente com a próxima informação disponível;
- Ao preenchimento completo de cada folha, poderá ser pesquisado o montante de horas a pagar ou a receber daquele colaborador logado.  

#  

**Vantagens:**

- Controle individual de horas;
- Contribuição para gestão do setor impactado e melhores garantias para a governança organizacional;
- Adição de dados concisos para realização de sessões de desenvolvimento;
- Dados relevantes para levantamento de indicadores internos de desempenho. 

---

## Funcionalidades

`Resumo`

- Cadastro de usuário;
- Login e logout de usuário;
- Cadastro de folha de ponto;
- Edição de folha de ponto;
- Deleção de folha de ponto;
- Pesquisa de montante de saldo de horas ou atraso.

---

## Fluxo de Processos

Link: http://localhost:3000/
> Cadastrar usuário
   >> ##### Clicar em "Novo Usuário?";
   >> ##### Preencher campos apresentados;
      > > > ###### Campos não obrigatórios: User Name | Posição | Nível;
      > > > ###### Validação de comparação de senhas.
   >> ##### Clicar em "Cadastrar".
> Logon de usuário
   >> ##### Preencher campos Usuário e Senha;
   >> ##### Clicar em "Enviar".
> Criar nova folha
   >> ##### Clicar em "Novo";
      > > > ###### Não é possível cadastrar folha com data retroativa.
   >> ##### Preencher campo de hora;
   >> ##### Clicar no ícone com um disquete.
> Editar folha
   >> ##### Escolha a folha que deseja editar;
      > > > ###### A hora de entrada não é editável.
   >> ##### Clicar no ícone do lápis;
   >> ##### Preencher os campos necessários;
      > > > ###### Observando as validações existentes.
   >> ##### Clicar no ícone com um disquete.
> Deletar folha
   >> ##### Escolha a folha que deseja editar;
   >> ##### Clicar no ícone da lixeira.
> Apresentar em tela saldo/atraso
   >> ##### Clicar em "Mostrar Saldo/Atraso"
      > > > ###### Para fechar, clique no ícone das setas.
> Logout de usuário
   >> ##### Clicar no ícone power

---

## Validações e Regras de Negócio

`Regras Funcionais`

- Não é possível informar a hora de retorno do intervalo sem antes ter informado a hora de entrada do intervalo;
- Não é possível informar a hora de saída sem antes ter informado a hora de retorno do intervalo;
- A hora de entrada não pode ser maior que a hora de início do intervalo;
- A hora de início do intervalo não pode ser maior que a hora final do intervalo;
- A hora final do intervalo não pode ser maior que a hora de saída;
- Tolerância de 10 minutos para considerar saldo ou atraso;
- Não é permitido ter menos que 1hr de intervalo.

---
---

## Sobre o Projeto

---

Este projeto refere-se somente ao frontend da aplicação com um todo. 
#
É um Web APP construído com ReactJS, API em NODE.js, responsável por criar e gerenciar fluxo de entrada e saída (folha de ponto) de colaboradores. 

---

### Detalhes 

`Termos Técnicos`
#

| Info           | Descrição   |
| -------------- | ----------- |
| Tecnologia     | ReactJS     |
| Módulos Princ. | axios; nodemon; react; react-dom; react-modal; react-router-dom|
| API Backend    | Projeto entry-control-backend |
| Porta - Link   | 3000 |
| Porta - API    | 8080 |

---

### Download
> ##### **1. Baixar e instalar o GIT para seu computador**
> ###### Link: https://git-scm.com/downloads

> ##### **2. Criar uma pasta para armazenar o projeto**

> ##### **3. Na pasta, clique com o botão direito e escolher 'Git Bash Here'**

> ##### **4. No terminal, copie e cole o código abaixo:**
> ###### Obs.: como a pasta node_modules não é copiada para o gitLab, as dependências necessárias devem ser instaladas.
``` js
git clone git@gitlab.com:game.developer.br/entry-control-frontend.git
```

---

### Execução
> ##### **1. Abrir o terminal do seu sistema operacional**
> ###### Será usado o windows como exemplo.
> ###### Sugestão: 'Windows PowerShell'

> ##### **2. Acessar a pasta do projeto**
``` js
cd path/entry-control-frontend
```

> ##### **3. Executar o comando abaixo:**
> ###### Como já comentado, devem ser instaladas as dependências necessárias.
``` js
yarn start
```

---

### Extra
`Instalando dependências .:. Code`
#
    yarn add react

---

### Links

[Dev Docs](https://devdocs.io/)

[ECMAScript 6](https://www.w3schools.com/js/js_es6.asp)

[React documentation](https://reactjs.org/)