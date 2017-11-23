const gcloud = require('google-cloud')
const datastore = gcloud.datastore({
  projectId: 'confident-abode-186707',
  keyFilename: './gcp-crud-c6226a2d54de.json',
})

async function main() {
  const key = datastore.key(['Company'])

  const data = {
    name: 'Google',
    location: 'CA',
  }

  await datastore.save({ key, data })

  const receiveData = await datastore.get(key)
  console.log(receiveData)
}

main().catch(console.log)

// const Query = datastore.createQuery('Company')

// console.log(datastore)

// var key = datastoreClient.key(['Product', 'Computer'])
// console.log(key)

// datastoreClient.get(key, function(err, entity) {
//   console.log(err || entity)
// })
