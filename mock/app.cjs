const express = require('express')
const mockApp = express()
 
const cors = require('cors')
mockApp.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
)
 
const bodyParser = require('body-parser')
 
mockApp.use(bodyParser.json({ limit: '10mb' })) // for parsing application/json
mockApp.use(bodyParser.urlencoded({ limit: '10mb', extended: true })) // for parsing application/x-www-form-urlencoded
 
exports.mockApp = mockApp