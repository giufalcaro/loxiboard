import { messages } from './messages'
import axios from 'axios'

async function main() {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]
        let endpoint = 'shipment'
        if (message.type === 'ORGANIZATION') {
            endpoint = 'organization'
        }

        try {
           const result =  await axios.post(`http://localhost:3000/${endpoint}`, message)
           console.log(result.data)
        } catch (error) {
            console.log('error')
            console.error(error.code)
        }

    }
    console.log('\n----------------------------------------------------------------')
    const shipment = await axios.get(`http://localhost:3000/shipments/S00001175`)
    console.log(shipment.data)
    console.log('\n----------------------------------------------------------------')
    const organization = await axios.get(`http://localhost:3000/organizations/34f195b5-2aa1-4914-85ab-f8849f9b541a`)
    console.log(organization.data)
    console.log('\n----------------------------------------------------------------')
    const weight = await axios.get(`http://localhost:3000/weight/grams`)
    console.log(weight.data)
}

main()