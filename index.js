const gcloud = require('google-cloud')
const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid')

const datastore = gcloud.datastore({
  projectId: 'nodejs-crud-187502',
  keyFilename: './nodejs-crud-50950fbd958a.json',
})

const app = express()
app.use(bodyParser.text())

// create a new item
app.post('/api/todo', (req, res) => {
  const content = req.body
  const id = uuid()

  const key = datastore.key(['todo', id])
  const entity = {
    key,
    data: { content },
  }

  datastore.save(entity).then(() => {
    res.end(id)
  })
})

// get an item
app.get('/api/todo/:id', (req, res) => {
  const { id } = req.params
  const key = datastore.key(['todo', id])
  datastore.get(key).then(results => {
    res.send(results[0].content)
  })
})

// update an item
app.put('/api/todo/:id', (req, res) => {
  const newContent = req.body
  const { id } = req.params

  const key = datastore.key(['todo', id])
  const entity = {
    key,
    data: { content: newContent },
  }

  datastore.save(entity).then(() => {
    res.end(id)
  })
})

// delete an item
app.delete('/api/todo/:id', (req, res) => {
  const { id } = req.params
  const key = datastore.key(['todo', id])
  datastore.delete(key).then(results => {
    res.send(id)
  })
})

app.listen(8888)
