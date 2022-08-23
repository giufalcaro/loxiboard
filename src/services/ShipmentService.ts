import OrganizationRepository from "../repositories/OrganizationRepository";
import Shipment from "../models/Shipment";
import ShipmentRepository from "../repositories/ShipmentRepository";
import WeightAggregationResult from "src/dtos/WeightAggregationResult";
const { convert } = require('convert');

export default class ShipmentService {
    public async handleShipment(requestedShipment: any): Promise<string> {
        const repository = new ShipmentRepository();
        const shipment = this.convertToShipmentModel(requestedShipment);
        if (!shipment._id) {
            throw new Error()
        }
        const { result: result } = await repository.update(shipment);
        return result.nModified > 0 ? 'updated' : 'inserted'
    }

    public async getCompleteShipmentData(id: string): Promise<any> {
        const shipmentRepository = new ShipmentRepository();
        const organizationRepository = new OrganizationRepository();
        const shipment = await shipmentRepository.findById(id);
        const organizations = await organizationRepository.findByCode(shipment[0].organizations)
        shipment[0].organizations = organizations
        return shipment[0]
    }

    public async getTotalWeight(unit: any): Promise<WeightAggregationResult> {
        const repository = new ShipmentRepository();
        const shippments = await repository.findAll()
        const resultObject: WeightAggregationResult = {
            reponseUnit: unit,
            totalWeightOfAllShippings: 0,
            shippmentInfos: []
        }

        shippments.forEach((shippment) => {
            let totalConvertedNodeWeight = 0;
            shippment.transportPacks.nodes.forEach((node: any) => {
                const nodeUnit = node.totalWeight.unit.toLowerCase()
                totalConvertedNodeWeight += convert(Number(node.totalWeight.weight), nodeUnit).to(unit)
                resultObject.shippmentInfos.push({
                    totalConvertedNodeWeight,
                    referenceId: shippment.referenceId
                })
            });
            resultObject.totalWeightOfAllShippings += totalConvertedNodeWeight
        })

        return resultObject
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