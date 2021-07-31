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

// addEventListener
// Recurso que "ouve" eventos do usuário
// Os eventos podem ser pressionar uma tecla, clicar, etc.
// Ver mais em https://www.w3schools.com/jsref/met_element_addeventlistener.asp
// Aqui esse evento vai capturar a tecla pressionada (keydown) e executar uma função (ResponderTecla)
document.addEventListener('keydown', ResponderTecla);


/*** Imagens **********************************/
// As imagens ficam na pasta img.
// Elas podem ser alteradas ou substituídas para permitir novos visuais.
// Mas é importante manter as mesmas dimensões.

var fundo1 = new Image();
fundo1.src = 'img/fundo.png';

var coluna1 = new Image();
coluna1.src = 'img/coluna1.png';

var coluna2 = new Image();
coluna2.src = 'img/coluna2.png';

var dragao1 = new Image();
dragao1.src = 'img/dragao1.png';

var dragao2 = new Image();
dragao2.src = 'img/dragao2.png';

var dragao3 = new Image();
dragao3.src = 'img/dragao3.png';


/*** Objetos **********************************/

// Esse aplicativo possui 3 objetos:
// 1) Fundo: paisagem que fica passando ao fundo
// 2) Colunas: obstáculos que devem ser evitados
// 3) Dragão: personagem que precisa passar entre os obstáculos

// *** 1) FUNDO *****
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


// *** 2) COLUNA *****
//Os parâmetros speed e space podem ser alterados para deixar o jogo mais fácil ou mais difícil
var coluna = {
	image1: coluna1, // imagem da coluna de baixo
	image2: coluna2, // imagem da coluna de cima
	speed: 3, // velocidade com que as colunas passam, quanto maior, mais rápidamente passam
	space: 150, // vão entre as colunas por onde o dragão tem que passar, quanto maior mais espaço entre as colunas
	x: 600, // posição inicial à direita do canvas, quanto maior, mais tempo demora para a coluna aparecer
	y: 260, // posição inicial acima do canvas, quanto maior, mais para cima aparece a coluna inferior
	width: 50, // largura da imagem da coluna
	height: 600 // altura da imagem da coluna
};


// *** 3) DRAGÃO *****
//O parâmetro gravity pode ser alterado para deixar o jogo mais fácil ou mais difícil
var dragao = {
	image: dragao1, // essa imagem vai alternando dentre as 3 disponíveis para simular o bater das asas
	gravity: 0.5, // velocidade com que o dragão cai, quanto maior, mais rapidamente o dragão cai
	flap: 0, // contador para bater as asas
	phase: 0, // fase da batida da asa
	x: 20, // posição horizontal em que o dragão aparece no início do jogo
	y: 0, // posição vertical em que o dragão aparece no início do jogo
	width: 120, // largura do dragão
	height: 90 // altura do dragão
}


// Esse objeto guarda parâmetros do jogo
var jogo = {
	score: 0, // placar do jogador
	scored: 0 // para registra se já pontuou nessa rodada
}



/*** Iniciar o jogo **********************************/

Jogar();



/*** Funções **********************************/

/**
 * Roda um loop redesenhando a tela a cada volta (frame)
 */
function Jogar() {
	
	// para o jogo se houve colisão
	if (VerificarColisao()) {
		return;
	}

	// exibe o placar
	document.getElementById('placar').innerHTML = jogo.score;

	
	// movimenta o fundo
	fundo.x++;
	if (fundo.x > fundo.x_max) fundo.x = 0;

	// sorteia a posição/intervalo e movimenta as colunas
	coluna.x -= coluna.speed;
	if (coluna.x < -coluna.width) {
		jogo.scored = 0; // começa uma nova rodada de pontuação
		coluna.x = AleatorioEntre(400, 800); // sorteia o intervalo antes das próximas colunas
		coluna.y = AleatorioEntre(220, 570); // sorteia a posição vertical
	}

	// faz o dragão bater as asas
	dragao.flap++;
	if (dragao.flap > 3) { // se aumentar esse valor, as asas batem mais lentamente
		dragao.flap = 0;
		if (dragao.phase == 0) {
			dragao.image = dragao1;
			dragao.phase = 1;
		} else if (dragao.phase == 1) {
			dragao.image = dragao2;
			dragao.phase = 2;
		} else if (dragao.phase == 2) {
			dragao.image = dragao3;
			dragao.phase = 3;
		} else if (dragao.phase == 3) {
			dragao.image = dragao2;
			dragao.phase = 0;
		}
	}

	// faz o dragão cair (gravidade)
	dragao.y += dragao.gravity;
	
	
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

	// desenha as colunas (usando sintaxe básica)
	context.drawImage(coluna.image1, coluna.x, coluna.y, coluna.width, coluna.height); // coluna inferior
	context.drawImage(coluna.image2, coluna.x, coluna.y - coluna.space - coluna.height, coluna.width, coluna.height); // coluna superior

	// desenha o dragao (usando sintaxe básica)
	context.drawImage(dragao.image, dragao.x, dragao.y, dragao.width, dragao.height);

	

	// essa chamada faz a função ficar em loop
	requestAnimationFrame(Jogar); 
}



/**
 * Executada quando qualquer tecla for pressionada
 */
function ResponderTecla(tecla) {
	
    // Cada tecla do teclado possui um número, exemplos:
    // 	Enter = 13
    // 	Seta para esquerda = 37
    // 	Seta para cima = 38
    // 	Seta para direita = 39
    // 	Seta para baixo = 40
    // Ver mais em http://www.foreui.com/articles/Key_Code_Table.htm

	if (tecla.keyCode == 38) { //seta para cima
		dragao.y = dragao.y - 20;
		if (dragao.y < 0) dragao.y = 0;
	} else if (tecla.keyCode == 40) { //seta para baixo
		dragao.y = dragao.y + 20;
	}

}




/**
 * Verifica se houve colisão do dragão com as colunas e com o chão
 */
function VerificarColisao() {

	// tolerância para permitir "raspar" perto
	var tolerancia = 20;

	// verifica se bateu horizontalmente
	var colisao_horizontal = (dragao.x + dragao.width - tolerancia >= coluna.x);
	
	// verifica se bateu verticalmente na coluna de baixo
	var colisao_vertical1 = (dragao.y + dragao.height - tolerancia >= coluna.y);
	
	// verifica bateu verticalmente na coluna de cima
	var colisao_vertical2 = (dragao.y + tolerancia <= coluna.y - coluna.space);

	// analisa se colidiu com uma das colunas
	var ret = false;
	if (colisao_horizontal) {
		if (colisao_vertical1) {
			ret = true;
		} else if (colisao_vertical2) {
			ret = true
		} else {
			// se não colidiu, aumenta 1 ponto no placar
			if (jogo.scored == 0 && coluna.x + coluna.width <= dragao.x) {
				jogo.scored = 1; // registra que já pontuou nessa rodada
				jogo.score++;
			}
		}
	}

	// analisa se bateu no chão
	if (dragao.y + dragao.height>= canvas.height) {
		ret = true;
	}

	// retorna colisão
	return ret;

}


/**
 * Devolve um número aleatório entre o min e max informado
 */
function AleatorioEntre(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}





