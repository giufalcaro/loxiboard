const express = require('express')
const bodyParser = require("body-parser");
const organizationRoute = require('./src/routes/OrganizationRoute')
const shipmentRoute = require('./src/routes/ShipmentRoute')

const app = express()
app.use(bodyParser.json());
app.use('/', organizationRoute);
app.use('/', shipmentRoute);
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
