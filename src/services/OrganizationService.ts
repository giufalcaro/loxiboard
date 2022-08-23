import Organization from "../models/Organization";
import OrganizationRepository from "../repositories/OrganizationRepository";

export default class OrganizationService {
    public async handleOrganization(requestedOrganization: any) {
        try {
            const repository = new OrganizationRepository();
            const organization: Organization = this.convertToOrganizationModel(requestedOrganization)
            const existingOrganization = await repository.findById(organization._id)

            if (existingOrganization.length != 0) {
                await repository.update(organization)
            } else {
                await repository.insert(organization)
            }
        } catch (err) {
            console.log(err)
        }
    }

    public async findOneById(id: string) {
        try {
            const repository = new OrganizationRepository();
            return (await repository.findById(id))[0]
        } catch (err) {
            console.log(err)
        }
    }

    protected convertToOrganizationModel(organization: any): Organization {
        return {
            _id: organization.id,
            code: organization.code,
            type: organization.type
        }
    }
}