const mockApp = require('./app.cjs').mockApp
 
// Mock api all response
require('./methods/index.cjs')
 
// eslint-disable-next-line no-console
mockApp.listen(8080, () => console.log('API Mock Server is running: 8080'))