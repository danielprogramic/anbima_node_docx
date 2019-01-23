const DocxController = require("../utils/docxTemplate");
var http = require('http');
var fs = require('fs');
module.exports = {
  receiveObj(req, res) {
		console.log('-------------------------------');
		DocxController.openGenerator(req.body);
		res.json({ success: true, message: 'sucess'});
		// res.download('./logo.png', 'logo.png');
		// var file = fs.createWriteStream("file44.jpg");
		// // DocxController.openGenerator(req.body);
		console.log('-------------------------------');
	},
	downloadDocx(req, res) {
		const razaoSocial = req.params.name;
		res.download('./template_out.docx', ` ${razaoSocial}.docx`);
	}
}
