
import MongoPool from "../infrastructure/mongoPool";
import Organization from "src/models/Organization";

export default class OrganizationRepository {
    protected async getCollection() {
        return (await MongoPool.getInstance('local')).collection('organizations');
    }

    public async findByCode(id: string[]) {
        return (await this.getCollection()).find({ $and: [{ code: {$in: id} }] }).toArray();
    }

    public async findById(id: string) {
        return (await this.getCollection()).find({ $and: [{ _id: id }] }).toArray();
    }

    public async insert(organization: Organization) {
        return (await this.getCollection()).insertOne({ ...organization });
    }

    public async update(organization: Organization) {
        return (await this.getCollection()).updateOne({ _id: organization._id }, {$set: {...organization}})
    }
}