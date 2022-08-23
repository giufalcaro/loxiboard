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
            await axios.post(`http://localhost:3000/${endpoint}`, message)
        } catch (error) {
            console.error(error.code)
        }

    }

    // const result = await axios.get(`http://localhost:3000/shipments/S00001175`)
    // console.log(result)

    // const result = await axios.get(`http://localhost:3000/organizations/34f195b5-2aa1-4914-85ab-f8849f9b541a`)
    // console.log(result)

    // const result = await axios.get(`http://localhost:3000/weight/grams`)
    // console.log(result.data)
}

main()