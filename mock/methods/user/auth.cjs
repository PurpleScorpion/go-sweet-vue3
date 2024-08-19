const mockApp = require('../../app.cjs').mockApp

mockApp.post('/login', (req, res) => {
  console.log(req)
  authData = require('../../data/user/auth.json')

  setTimeout(() => {
    res.json(authData)
  }, 0)
})