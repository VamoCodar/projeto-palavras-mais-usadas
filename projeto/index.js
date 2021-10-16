const fn = require("./funcoes")
const path = require("path")
const caminho = path.join(__dirname, "..", "legendas")

const simbolos = [
	".", "?", "-", "♪", '"', "_", "<i>", "</i>", "\r", "[", "]", "(", ")", ","
]
const mesclarElementos = (array) => array.join(" ")
const separarPorLinhas = (todoConteudo) => todoConteudo.split("\n")
const separarPorPalavras = (todoConteudo) => todoConteudo.split(" ")




fn.lerDiretorio(caminho)
	.then(fn.elementosTerminadosCom(".srt"))
	.then(fn.lerArquivos)
	.then(mesclarElementos)
	.then(separarPorLinhas)
	.then(fn.removerElementosSeVazio)
	.then(fn.removerSeIncluir("-->"))
	.then(fn.removerSeApenasNumeros)
	.then(fn.removerSimbolos(simbolos))
	.then(mesclarElementos)
	.then(separarPorPalavras)
	.then(fn.removerElementosSeVazio)
	.then(fn.removerSeApenasNumeros)
	.then(fn.agruparPalavras)
	.then(fn.ordenarPorAtribNumerico("qtde", "desc"))
	.then(console.log)
