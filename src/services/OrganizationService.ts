import Organization from "../models/Organization";
import OrganizationRepository from "../repositories/OrganizationRepository";

export default class OrganizationService {
    public async handleOrganization(requestedOrganization: any): Promise<string> {
        try {
            const repository = new OrganizationRepository();
            const organization: Organization = this.convertToOrganizationModel(requestedOrganization)
            const {result: result} = await repository.update(organization)
            return result.nModified > 0 ? 'updated' : 'inserted'
        } catch (err) {
            console.log('organization error: ' + err)
            return `err: ${err}`
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