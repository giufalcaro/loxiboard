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
    return res.send(400, { message: 'error' });
  }
})

app.post('/organization', async (req: any, res: any) => {
  try {
    const organizationService = new OrganizationService();
    organizationService.handleOrganization(req.body)
    return res.send(200, { message: 'ok' });
  } catch (err) {
    console.log(err)
    return res.send(400, { message: 'error' });
  }
})

app.get('/shipments/:referenceId', async (req: any, res: any) => {
  try {
    const service = new ShipmentService();
    const result = await service.getCompleteShipmentData(req.param('referenceId'))
    return res.send(200, result);
  } catch (err) {
    return res.send(400, { message: 'error' });
  }
})

app.get('/organizations/:id', async (req: any, res: any) => {
  try {
    const organizationService = new OrganizationService();
    const result = await organizationService.findOneById(req.param('id'))
    return res.send(200, result);
  } catch (err) {
    console.log(err)
    return res.send(400, { message: 'error' });
  }
})

app.get('/weight/:unit', async (req: any, res: any) => {
  try {
    const organizationService = new ShipmentService();
    const result = await organizationService.getTotalWeight(req.param('unit'))
    return res.send(200, result);
  } catch (err) {
    console.log(err)
    return res.send(400, { message: 'error' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
