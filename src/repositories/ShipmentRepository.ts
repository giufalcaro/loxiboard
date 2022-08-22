import Shipment from "src/models/Shipment";
import MongoPool from "../infrastructure/mongoPool";

export default class ShipmentRepository {
    protected async getCollection() {
        return (await MongoPool.getInstance('local')).collection('shipments');
    }

    public async findById(id: string) {
        return (await this.getCollection()).find({ $and: [{ _id: id }] }).toArray();
    }

    public async insert(shipment: Shipment) {
        return (await this.getCollection()).insertOne({ ...shipment });
    }

    public async update(shipment: Shipment) {
        return (await this.getCollection()).updateOne({ _id: shipment._id }, {$set: {...shipment}})
    }
}