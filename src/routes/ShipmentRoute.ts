import ShipmentService from "../services/ShipmentService";

const express = require('express');
const router = express.Router();

router.post('/shipment', async (req: any, res: any) => {
    try {
      const service = new ShipmentService();
      const result = await service.handleShipment(req.body)
      return res.status(200).send(result)
    } catch (err) {
      return res.status(400).send({ message:'make sure the request body is a valid shippment' })
    }
})

router.get('/shipments/:referenceId', async (req: any, res: any) => {
  try {
    const service = new ShipmentService(); 
    const result = await service.getCompleteShipmentData(req.params['referenceId'])
    return res.status(200).send(result)
  } catch (err) {
    return res.status(400).send({ message:'id Not Found' })
  }
})

module.exports = router;