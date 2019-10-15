const express = require('express')

const server = express()

server.use(express.json())

// Função para verificar se existe um projeto com o id passado
function chekProjectExist (req, res, next) {

  project_id = projects[req.params.id]

  if(!project_id){
    return res.status(400).send({ error: 'Project does not exist' })
  }

  next()

}

// Variáveis para contar os tipos de requisições
let qtGet  = 0
let qtPost = 0
let qtPut  = 0
let qtDel  = 0

// Midleware global para contar a quantidade de requisições feitas na aplicação
server.use((req, res, next) => {

  if(req.method.toUpperCase() == 'GET'){
    qtGet ++
  }else if(req.method.toUpperCase() == 'POST'){
    qtPost ++
  }else if(req.method.toUpperCase() == 'PUT'){
    qtPut ++
  }else {
    qtDel ++
  }
  // Mostrando a quantidade de requisições separadas por tipo
  console.log('/////////////////////////////////////////')
  console.log(`Quantidade de metodos GET: ${qtGet}`)
  console.log(`Quantidade de metodos POST: ${qtPost}`)
  console.log(`Quantidade de metodos PUT: ${qtPut}`)
  console.log(`Quantidade de metodos DELETE: ${qtDel}`)
  console.log('/////////////////////////////////////////')

  return next()

})

// Variável que irá receber todos os projetos
var projects = []

// Rota para inserir um novo projeto
server.post('/projects', (req, res) => {

  const { id, title, tasks } = req.body
  
  projects.push(req.body)
  
  return res.json(req.body)

})

// Rota para trazer totos os projetos
server.get('/projects', (req, res) => {

  return res.json(projects)

})

// Rota para atualizar o título de um projeto com id específico
server.put('/projects/:id', chekProjectExist, (req, res) => {

  const { id } = req.params
  const { title } = req.body

  projects[id].title= title

  return res.json(projects)

})

// Rota para deletar um projeto com id específico
server.delete('/projects/:id', chekProjectExist, (req, res) => {

  const { id } = req.params

  projects.splice(id, 1)

  return res.json(projects)

})

// Rota para inserir uma nova task em um projeto com id específico
server.post('/projects/:id/tasks', chekProjectExist, (req, res) => {

  const { id } = req.params
  const { tasks } = req.body

  projects[id].tasks.push(tasks)

  return res.json(projects)

})

server.listen(3333)