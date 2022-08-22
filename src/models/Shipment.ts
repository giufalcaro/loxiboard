export interface node {
    node: {
        totalWeight: {
            weight: string,
            unit: string
        }
    },

}

export interface transportPacks {
    nodes: node[],

}

export default interface Shipment {
    _id: string,
    type: string,
    referenceId: string,
    organizations: string[],
    estimatedTimeArrival?: string,
    transportPacks: transportPacks[]
}