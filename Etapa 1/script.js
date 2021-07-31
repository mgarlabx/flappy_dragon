/**
 * Inteli - Instituto de Tecnologia e Liderança
 * Aplicativo para introdução à lógica e programação
 * 
 * Esse aplicativo é um jogo (game) do tipo "Flappy Bird".
 * Ver mais em https://pt.wikipedia.org/wiki/Flappy_Bird
 * 
 * O jogador usa as teclas para cima e para baixo para fazer o dragão passar por entre as colunas.
 * Cada vez que o dragão passa, o jogador ganha um ponto.
 * O jogo se encerra quando o dragão bate em alguma coluna ou no chão.
 * 
 * Esse é um código-fonte aberto, desenvolvido com fins educacionais.
 * Pode ser usado e alterado livremente.
 * 
 * Julho/2021
 */


/*** Contexto **********************************/

// Canvas 
// Esse é o local onde aparece o jogo
// No arquivo index.html, está contido em <canvas></canvas>
// Ver mais em https://www.w3schools.com/html/html5_canvas.asp
var canvas  = document.getElementById('canvas');
var context = canvas.getContext('2d');



/*** Iniciar o jogo **********************************/

Jogar();



/*** Funções **********************************/

/**
 * Roda um loop redesenhando a tela a cada volta (frame)
 */
function Jogar() {
	
	
	// limpa o canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	
	// essa chamada faz a função ficar em loop
	requestAnimationFrame(Jogar); 
}











