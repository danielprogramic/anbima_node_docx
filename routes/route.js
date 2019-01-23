const DocxController = require('../controllers/DocxController');
module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({
      message: 'Bem vindo a API Download DOCX'
    })
  })
	app.post('/api/generatorDocx', DocxController.receiveObj)
	app.get('/api/generatorDocx/:name', DocxController.downloadDocx)
}
