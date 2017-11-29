const gcloud = require('google-cloud')

const datastore = gcloud.datastore({
  projectId: 'nodejs-crud-187502',
  keyFilename: './nodejs-crud-50950fbd958a.json',
})

const key = datastore.key(['todo', 'id123'])

const item = {
  content: 'I am data',
}

datastore
  .save({ key: key, data: item })
  .then(() => datastore.get(key))
  .then(results => {
    console.log(results[0].content)
  })
