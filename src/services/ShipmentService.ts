import Shipment from "../models/Shipment";
import ShipmentRepository from "../repositories/ShipmentRepository";

export default class ShipmentService {
    public async handleShipment(requestedShipment: any) {
        try {
            const repository = new ShipmentRepository();
            const shipment = this.convertToShipmentModel(requestedShipment);
            const existingShipment = await repository.findById(shipment._id);
            if (existingShipment.length != 0) {
                repository.update(shipment);
            } else {
                repository.insert(shipment);
            }
        } catch (err) {
            console.log(err);
        }
    }

    protected convertToShipmentModel(requestedShipment: any): Shipment {
        return {
            _id: requestedShipment.referenceId,
            type: requestedShipment.type,
            referenceId: requestedShipment.referenceId,
            organizations: requestedShipment.organizations,
            estimatedTimeArrival: requestedShipment.estimatedTimeArrival,
            transportPacks: requestedShipment.transportPacks
        }
    }
}