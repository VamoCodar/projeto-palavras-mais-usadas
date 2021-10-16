const fs = require("fs")
const path = require("path")

function lerDiretorio(caminho) {
	const funcaoParametroPromise = (resolve, reject) => {
		try {
			const arquivos = fs.readdirSync(caminho)
			const arquivosCompletos = arquivos.map(arquivo => path.join(caminho, arquivo))
			resolve(arquivosCompletos) //
		}
		catch (e) {
			reject(e) //
		}

	}

	return new Promise(funcaoParametroPromise)

}

function lerArquivo(caminho) {
	const funcaoParametro = (resolve, reject) => {
		try {
			const conteudo = fs.readFileSync(caminho, { encoding: 'utf-8' })
			resolve(conteudo.toString())
		}
		catch (e) {
			reject(e)
		}
	}

	return new Promise(funcaoParametro)
}

function lerArquivos(caminhos) {
	return Promise.all(caminhos.map(caminho => lerArquivo(caminho)))

}

function elementosTerminadosCom(padraoTextual) {
	return function (array) {
		return array.filter(i => i.endsWith(padraoTextual))
	}
}


function removerElementosSeVazio(array) {
	return array.filter(el => el.trim())

}

function removerSeIncluir(padraoTextual) {
	return function (array) {
		return array.filter(el => !el.includes(padraoTextual))
	}

}

function removerSeApenasNumeros(array) { // NaN === NaN //false
	return array.filter(el => {
		const num = parseInt(el.trim())
		return num !== num //retorna true para NAN

	})
}


function removerSimbolos(simbolos) {
	return (array) => {
		return array.map(el => {
			return simbolos.reduce((acc, simbolo) => {
				return acc.split(simbolo).join("")
			}, el)

		})
	}

}

function agruparPalavras(palavras) {
	return Object.values(
		palavras.reduce((acc, palavra) => {
			const el = palavra.toLowerCase()
			const qtde = acc[el] ? acc[el].qtde + 1 : 1
			acc[el] = { palavra: el, qtde }
			return acc
		}, {}))

}
function ordenarPorAtribNumerico(attr, ordem = "asc") {
	return function (array) {
		const ascendente = (a, b) => a[attr] - b[attr]
		const decrescente = (a, b) => b[attr] - a[attr]
		return array.sort(ordem === "asc" ? ascendente : decrescente)

	}
}


module.exports = {
	lerDiretorio,
	elementosTerminadosCom,
	lerArquivos,
	lerArquivo,
	removerElementosSeVazio,
	removerSeIncluir,
	removerSeApenasNumeros,
	removerSimbolos,
	agruparPalavras,
	ordenarPorAtribNumerico
}

// function removerLinhasComNumeros(array){
// 	const pattern = /[0-9]/g
// 	return array.filter(el => !pattern.test(el))
// }