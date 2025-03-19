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
    let ballSpeedX = 5 * (Math.random() < 0.5 ? 1 : -1); // velocidade inicial aleatória
    let ballSpeedY = 5 * (Math.random() < 0.5 ? 1 : -1); // velocidade inicial aleatória

    let playerY = gameHeight / 2 - 50;
    let aiY = gameHeight / 2 - 50;

    const paddleHeight = 100;
    const paddleWidth = 10;

    // Pontuação
    let playerScore = 0;
    let aiScore = 0;

    // Atualizar a posição da bola
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Verificar colisão com a parte superior ou inferior
        if (ballY <= 0 || ballY >= gameHeight - 20) {
            ballSpeedY = -ballSpeedY; // Reverte direção no eixo Y
        }

        // Colisão com a raquete do jogador
        if (ballX <= paddleWidth && ballY >= playerY && ballY <= playerY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Inverte direção no eixo X

            // Adicionar um pequeno efeito aleatório ao movimento após a colisão
            ballSpeedY += Math.random() * 2 - 1; // Aleatório entre -1 e 1
        }

        // Colisão com a raquete da IA
        if (ballX >= gameWidth - paddleWidth - 20 && ballY >= aiY && ballY <= aiY + paddleHeight) {
            ballSpeedX = -ballSpeedX; // Inverte direção no eixo X

            // Adicionar um pequeno efeito aleatório ao movimento após a colisão
            ballSpeedY += Math.random() * 2 - 1; // Aleatório entre -1 e 1
        }

        // Se a bola passar pela raquete do jogador (perdeu um ponto)
        if (ballX <= 0) {
            aiScore++;
            aiScoreDisplay.textContent = aiScore; // Atualiza o placar
            resetBall();
        }

        // Se a bola passar pela raquete da IA (perdeu um ponto)
        if (ballX >= gameWidth - 20) {
            playerScore++;
            playerScoreDisplay.textContent = playerScore; // Atualiza o
