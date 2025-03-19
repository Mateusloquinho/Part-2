// Definir elementos e variáveis do jogo
const gameArea = document.getElementById('gameArea');
const playerPaddle = document.getElementById('playerPaddle');
const aiPaddle = document.getElementById('aiPaddle');
const ball = document.getElementById('ball');

const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;

let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
let ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1);

let playerY = gameHeight / 2 - 50;
let aiY = gameHeight / 2 - 50;

const paddleHeight = 100;
const paddleWidth = 10;

// Atualizar a posição da bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Verificar colisão com a parte superior ou inferior
    if (ballY <= 0 || ballY >= gameHeight - 20) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisão com a raquete do jogador
    if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Colisão com a raquete da IA
    if (ballX >= gameWidth - paddleWidth - 20 && ballY >= aiY && ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Se a bola passar pela raquete do jogador (perdeu um ponto)
    if (ballX <= 0 || ballX >= gameWidth - 20) {
        resetBall();
    }

    // Atualizar posição da bola
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

// Movimento da raquete do jogador com o mouse
document.addEventListener('mousemove', (e) => {
    playerY = e.clientY - gameArea.offsetTop - paddleHeight / 2;
    if (playerY < 0) playerY = 0;
    if (playerY > gameHeight - paddleHeight) playerY = gameHeight - paddleHeight;
    playerPaddle.style.top = `${playerY}px`;
});

// Movimento da raquete da IA (simples)
function moveAI() {
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += 4;
    } else if (aiY + paddleHeight / 2 > ballY) {
        aiY -= 4;
    }
    if (aiY < 0) aiY = 0;
    if (aiY > gameHeight - paddleHeight) aiY = gameHeight - paddleHeight;
    aiPaddle.style.top = `${aiY}px`;
}

// Resetar a bola no centro
function resetBall() {
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1);
}

// Atualizar a cada frame
function gameLoop() {
    moveBall();
    moveAI();
    requestAnimationFrame(gameLoop);
}

// Iniciar o loop do jogo
gameLoop();
