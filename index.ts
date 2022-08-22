import OrganizationService from './src/services/OrganizationService';
import ShipmentService from './src/services/ShipmentService';
const express = require('express')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json());
const port = 3000

app.post('/shipment', async (req: any, res: any) => {
  try {
    const service = new ShipmentService();
    service.handleShipment(req.body)
    return res.send(200, { message: 'ok' });
  } catch (err) {
    return res.send(200, { message: 'error' });
  }
})

app.post('/organization', async (req: any, res: any) => {
  try {
    const organizationService = new OrganizationService();
    organizationService.handleOrganization(req.body)
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
