const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
const path = require('path');

module.exports = {
	openGenerator(obj) {
		console.log(obj);

		var content = fs
			.readFileSync(path.resolve(__dirname, '../template.docx'), 'binary');

		var zip = new JSZip(content);
		var doc = new Docxtemplater();
		doc.loadZip(zip);
		doc.setData({
			id: obj.id,
			nome: obj.nome,
			razaoSocial:  obj.razaoSocial,
			cnpj: obj.cnpj,
			dataAtual: this.setMonthString(new Date()),
			existeData: (obj.dataAssociacao) ? true : false,
			dataAssociacao: `${this.setPadStartDate(new Date(obj.dataAssociacao))}/${this.setPadStartMonth(new Date(obj.dataAssociacao))}/${new Date(obj.dataAssociacao).getFullYear()}`,
			status: obj.status,
			existeOrganismoRepre : false,
			existeOrganismoApoio : false,
			existeOrganismoProdServ : false,
			existeOrganismoAuto : false,
			existeDiretores : (obj.diretores.length !== 0) ? true : false,
			existeOrganismoComiss : (obj.organismos.Comissão) ? true : false,
			existeOrganismoConse :  (obj.organismos.Conselho) ? true : false,
			existeOrganismoSubComi : (obj.organismos['Subcomitê']) ? true : false,
			existeOrganismoGrupoCon : false,
			existeOrganismoGrupoTec : (obj.organismos['Grupo Técnico']) ? true : false,
			existeOrganismoComit :  (obj.organismos.Comitê) ? true : false,
			existeOrganismoGrupoTrab : (obj.organismos['Grupo de Trabalho']) ? true : false,
			organismoRepresentacao: this.setOrganismo(obj.organismos.Representação),
			organismoConselho: this.setOrganismo(obj.organismos.Conselho),
			organismoComissao: this.setOrganismo(obj.organismos.Comissão),
			organismoComite: this.setOrganismo(obj.organismos.Comitê),
			organismoGrupoTrabalho: this.setOrganismo(obj.organismos['Grupo de Trabalho']),
			organismoSubcomite: this.setOrganismo(obj.organismos['Subcomitê']),
			organismoGrupoTecnico: this.setOrganismo(obj.organismos['Grupo Técnico']),
			existeCod : (obj.codigos) ? true : false,
			codigos: obj.codigos,
			representanteAnbima: obj.representanteAnbima,
			suplentes: obj.suplentes,
			diretores: obj.diretores,
			organismos: {

			}
		});


		try {
			doc.render()
		}
		catch (error) {
			var e = {
				message: error.message,
				name: error.name,
				stack: error.stack,
				properties: error.properties,
			}
			console.log(JSON.stringify({ error: e }));
			throw error;
		}

		var buf = doc.getZip()
			.generate({ type: 'nodebuffer' });

		fs.writeFileSync(path.resolve(__dirname, '../template_out.docx'), buf);

	},
	setMonthString(data) {
		const month = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
		return `${data.getDate()} ${month[data.getMonth()]} ${data.getFullYear()}`;
	},
	setPadStartMonth(data) {
		return (String(data.getMonth()+1).length  >= 1) ? String(data.getMonth()+1).padStart(2, '0') : data.getMonth()+1;
	},
	setPadStartDate(data) {
		return (String(data.getDate()).length  >= 1) ? String(data.getDate()).padStart(2, '0') : data.getDate();
	},
	setOrganismo(data) {
		var arr = [];
    for (key in data) {  
    arr.push(Object.assign({organismo: key , representante: data[key]}));
		}
		return arr;
	}
};
