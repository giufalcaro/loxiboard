
import MongoPool from "../infrastructure/mongoPool";
import Organization from "src/models/Organization";

export default class OrganizationRepository {
    protected async getCollection() {
        return (await MongoPool.getInstance('local')).collection('organizations');
    }

    public async findById(id: string) {
        return (await this.getCollection()).find({ $and: [{ _id: id }] }).toArray();
    }

    public async insert(organization: Organization) {
        console.log('entrou no insert')
        console.log(organization)
        return (await this.getCollection()).insertOne({ ...organization });
    }

    public async update(organization: Organization) {
        return (await this.getCollection()).updateOne({ _id: organization._id }, {$set: {...organization}})
    }

    public convertToOrganizationModel(organization: any): Organization {
        return {
            _id: organization.id,
            code: organization.code,
            type: organization.type
        }
    }
}