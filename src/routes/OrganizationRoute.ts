import ShipmentService from "../services/ShipmentService";
import OrganizationService from "../services/OrganizationService";

const express = require('express');
const router = express.Router();

router.post('/organization', async (req: any, res: any) => {
    try {
      const organizationService = new OrganizationService();
      const result = await organizationService.handleOrganization(req.body)
      return res.send(200, { result });
    } catch (err) {
      console.log(err)
      return res.send(400, { message: 'error' });
    }
})

router.get('/organizations/:id', async (req: any, res: any) => {
  try {
    const organizationService = new OrganizationService();
    const result = await organizationService.findOneById(req.param('id'))
    return res.send(200, result);
  } catch (err) {
    console.log(err)
    return res.send(400, { message: 'error' });
  }
})

router.get('/weight/:unit', async (req: any, res: any) => {
  try {
    const organizationService = new ShipmentService();
    const result = await organizationService.getTotalWeight(req.param('unit'))
    return res.send(200, result);
  } catch (err) {
    console.log(err)
    return res.send(400, { message: 'error' });
  }
})

module.exports = router;