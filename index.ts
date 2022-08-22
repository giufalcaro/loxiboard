import Organization from 'src/models/Organization';
import MongoPool from './src/infrastructure/mongoPool'
import OrganizationRepository from './src/repositories/OrganizationRepository';
const express = require('express')
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient
import teste from "./teste"

const app = express()
app.use(bodyParser.json());
const port = 3000

app.post('/shipment', async (req: any, res: any) => {
})

app.post('/organization', async (req: any, res: any) => {

  try {
    console.log('teste')
    const repository = new OrganizationRepository();
    const organization: Organization = repository.convertToOrganizationModel(req.body)
    const existingOrganization = await repository.findById(organization._id)

    if (existingOrganization.length != 0) {
      await repository.update(organization)
    } else {
      await repository.insert(organization)
    }
    return res.send(200, { message: 'ok' });
  } catch (err) {
    return res.send(200, { message: 'error' });
    console.log(err)
  }
})

app.get('/shipments/:referenceId', (req: any, res: any) => {
})

app.get('/organizations/:id', (req: any, res: any) => {
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
