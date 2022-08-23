import Organization from "../models/Organization";
import OrganizationRepository from "../repositories/OrganizationRepository";

export default class OrganizationService {
    public async handleOrganization(requestedOrganization: any): Promise<string> {
        const repository = new OrganizationRepository();
        const organization: Organization = this.convertToOrganizationModel(requestedOrganization)
        if (!organization._id) {
            throw new Error()
        }
        const { result: result } = await repository.update(organization)
        return result.nModified > 0 ? 'updated' : 'inserted'
    }

    public async findOneById(id: string) {
        const repository = new OrganizationRepository();
        return (await repository.findById(id))
    }

    protected convertToOrganizationModel(organization: any): Organization {
        return {
            _id: organization.id,
            code: organization.code,
            type: organization.type
        }
    }
}