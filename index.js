const gcloud = require('google-cloud')
const express = require('express')
const bodyParser = require('body-parser')
const uuid = require('uuid')

const datastore = gcloud.datastore({
  projectId: 'confident-abode-186707',
  keyFilename: './gcp-crud-c6226a2d54de.json',
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

  datastore.insert(entity).then(() => {
    res.end(id)
  })
})

// get an item
app.get('/api/todo/:id', (req, res) => {
  const { id } = req.params
  const key = datastore.key(['todo', id])
  datastore.get(key).then(results => {
    console.log(results[0])
  })
  res.send(id)
})

// get all items
app.get('/api/todo', (req, res) => {})

// update an item
app.put('/api/todo/:id', (req, res) => {})

// delete an item
app.delete('/api/todo/:id', (req, res) => {})

app.listen(8888)

// async function main() {
//   const key = datastore.key(['Company', 123])
//   const key2 = datastore.key(['Company', 5076495651307520])

//   const data = {
//     name: 'Google',
//     location: 'CA',
//   }

//   await datastore.save({ key, data })

//   const receiveData = await datastore.get(key2)
//   console.log(receiveData)
// }
