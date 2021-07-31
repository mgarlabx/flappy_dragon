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


/*** Imagens **********************************/
// As imagens ficam na pasta img.
// Elas podem ser alteradas ou substituídas para permitir novos visuais.
// Mas é importante manter as mesmas dimensões.

var fundo1 = new Image();
fundo1.src = 'img/fundo.png';




/*** Objetos **********************************/

// A imagem do fundo possui 1200 de largura e 400 de altura.
// Mas somente uma janela de 400x400 é exibida por vez.
// Essa janela vai se alterando, simulando o movimento do fundo
// Esses parâmetros não devem ser alterados.
var fundo = {
	image: fundo1, // paisagem do fundo
	x: 0, // esse valor vai sendo alterado pelo aplicativo, para simular o movimento do fundo
	y: 0, // esse valor é fixo
	width: 400, // largura da janela a ser exibida
	height: 400, // altura da janela a ser exibida
	top: 200, // distância do topo do Canvas onde a janela deve ser exibida
	x_max: 800 // valor máximo de x, para recomeçar o loop da imagem
};




/*** Iniciar o jogo **********************************/

Jogar();



/*** Funções **********************************/

/**
 * Roda um loop redesenhando a tela a cada volta (frame)
 */
function Jogar() {
	
	// movimenta o fundo
	fundo.x++;
	if (fundo.x > fundo.x_max) fundo.x = 0;


	// limpa o canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	

	// O "drawImage" é um método que permite aplicar uma imagem em um canvas
	// A sintaxe básica é: 
	// context.drawImage(imagem, x, y, largura, altura);
	// Mas também há uma sintaxe que permite recortar um pedaço de uma imagem para aplicar no canvas:
	// context.drawImage(imagem, x_do_corte, y_do_corte, largura_do_corte, altura_do_corte, x, y, largura, altura);
	// Ver mais em https://www.w3schools.com/tags/canvas_drawimage.asp

	// desenha o fundo (usando sintaxe de recorte)
	context.drawImage(fundo.image, fundo.x, fundo.y, fundo.width, fundo.height, fundo.y, fundo.top, fundo.width, fundo.height);

	
	

	// essa chamada faz a função ficar em loop
	requestAnimationFrame(Jogar); 
}











