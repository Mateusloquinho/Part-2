document.addEventListener('DOMContentLoaded', function () {
    // Definir elementos e variáveis do jogo
    const gameArea = document.getElementById('gameArea');
    const playerPaddle = document.getElementById('playerPaddle');
    const aiPaddle = document.getElementById('aiPaddle');
    const ball = document.getElementById('ball');
    const playerScoreDisplay = document.getElementById('playerScore');
    const aiScoreDisplay = document.getElementById('aiScore');

    const gameWidth = gameArea.clientWidth;
    const gameHeight = gameArea.clientHeight;

    let ballX = gameWidth / 2;
    let ballY = gameHeight / 2;
    let ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1); // Direção inicial aleatória
    let ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1); // Direção inicial aleatória

    let playerY = gameHeight / 2 - 50;
    let aiY = gameHeight / 2 - 50;

    const paddleHeight = 100;
    const paddleWidth = 10;
    
    // Função para mover a bola
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Verificar colisão com a parte superior ou inferior
        if (ballY <= 0 || ballY >= gameHeight - 20) {
            ballSpeedY = -ballSpeedY; // Inverter a direção no eixo Y
            ballSpeedY += (Math.random() * 2 - 1); // Adicionar um pequeno efeito de variação aleatória
        }

        // Colisão com a raquete do jogador
        if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Inverter a direção no eixo X
            ballSpeedY += (Math.random() * 2 - 1); // Adicionar efeito de variação aleatória
        }

        // Colisão com a raquete da IA
        if (ballX >= gameWidth - paddleWidth - 20 && ballY >= aiY && ballY <= aiY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Inverter a direção no eixo X
            ballSpeedY += (Math.random() * 2 - 1); // Adicionar efeito de variação aleatória
        }

        // Se a bola passar pela raquete do jogador (perdeu um ponto)
        if (ballX <= 0) {
            aiScore++;
            aiScoreDisplay.textContent = aiScore;
            resetBall();
        }

        // Se a bola passar pela raquete da IA (perdeu um ponto)
        if (ballX >= gameWidth - 20) {
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            resetBall();
        }

        // Atualizar a posição da bola
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px}`;
    }

    // Função para mover a raquete do jogador
    document.addEventListener('mousemove', (e) => {
        playerY = e.clientY - gameArea.offsetTop - paddleHeight / 2;
        if (playerY < 0) playerY = 0;
        if (playerY > gameHeight - paddleHeight) playerY = gameHeight - paddleHeight;
        playerPaddle.style.top = `${playerY}px`;
    });

    // Função para mover a raquete da IA
    function moveAI() {
        if (aiY + paddleHeight / 2 < ballY) {
            aiY += 4; // A IA se move para baixo
        } else if (aiY + paddleHeight / 2 > ballY) {
            aiY -= 4; // A IA se move para cima
        }
        if (aiY < 0) aiY = 0;
        if (aiY > gameHeight - paddleHeight) aiY = gameHeight - paddleHeight;
        aiPaddle.style.top = `${aiY}px`;
    }

    // Função para resetar a bola
    function resetBall() {
        ballX = gameWidth / 2;
        ballY = gameHeight / 2;
        ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1);
        ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1);
    }

    // Função de loop do jogo
    function gameLoop() {
        moveBall();
        moveAI();
        requestAnimationFrame(gameLoop);
    }

    // Iniciar o loop do jogo
    gameLoop();
});
