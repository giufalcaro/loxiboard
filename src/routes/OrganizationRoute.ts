import ShipmentService from "../services/ShipmentService";
import OrganizationService from "../services/OrganizationService";

const express = require('express');
const router = express.Router();

router.post('/organization', async (req: any, res: any) => {
    try {
      const organizationService = new OrganizationService();
      const result = await organizationService.handleOrganization(req.body)
      return res.status(200).send(result)
    } catch (err) {
      console.log(err)
      return res.status(400).send({ message:'make sure the request body is a valid organization' })
    }
})

router.get('/organizations/:id', async (req: any, res: any) => {
  try {
    const organizationService = new OrganizationService();
    const result = await organizationService.findOneById(req.params['id'])
    return result.length > 0 ? res.status(200).send(result) : res.status(400).send({ message:'id not found' });
  } catch (err) {
    console.log(err)
    return res.send(400, {  message: 'error' });
  }
})

router.get('/weight/:unit', async (req: any, res: any) => {
  try {
    const organizationService = new ShipmentService();
    const result = await organizationService.getTotalWeight(req.params['unit'])
    return res.status(200).send(result)
  } catch (err) {
    console.log(err)
    return res.status(400).send({ message:'make sure the weight parameter is valid (ex: grams, pounds, kilograms)' })
  }
})

module.exports = router;