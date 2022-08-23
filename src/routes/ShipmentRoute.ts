import ShipmentService from "../services/ShipmentService";

const express = require('express');
const router = express.Router();

router.post('/shipment', async (req: any, res: any) => {
    try {
      const service = new ShipmentService();
      const result = await service.handleShipment(req.body)
      return res.send(200, { result });
    } catch (err) {
      return res.send(400, { message: 'error' });
    }
})

router.get('/shipments/:referenceId', async (req: any, res: any) => {
  try {
    const service = new ShipmentService();
    const result = await service.getCompleteShipmentData(req.param('referenceId'))
    return res.send(200, result);
  } catch (err) {
    return res.send(400, { message: 'error' });
  }
})

module.exports = router;