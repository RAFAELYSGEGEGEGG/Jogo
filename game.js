// Jogo Stumble Guys - Modificado
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Definindo variáveis de movimentação
let speed = 5;
let jumpPower = 15;
let gravity = 0.5;
let isJumping = false;
let jumpHeight = 0;

// Personagem
let player = {
    x: 100,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'green',
    velocityX: 0,
    velocityY: 0,
    isOnGround: true
};

// Função de física básica (gravidade, colisão)
function applyPhysics() {
    if (!player.isOnGround) {
        player.velocityY += gravity;
    } else {
        player.velocityY = 0;
        if (player.y >= canvas.height - player.height) {
            player.y = canvas.height - player.height;
            player.isOnGround = true;
        }
    }

    player.y += player.velocityY;
    player.x += player.velocityX;
}

// Função para desenhar o personagem
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Função para mover o personagem com base no toque na tela
function movePlayerWithTouch(event) {
    // Obtenha as coordenadas do toque
    const touchX = event.touches ? event.touches[0].clientX : event.clientX;
    const touchY = event.touches ? event.touches[0].clientY : event.clientY;

    // Ajusta a movimentação do jogador com base na posição do toque
    const moveSpeed = 2;

    if (touchX < canvas.width / 2) { // Movendo para a esquerda
        player.velocityX = -moveSpeed;
    } else { // Movendo para a direita
        player.velocityX = moveSpeed;
    }

    if (touchY < canvas.height / 2 && player.isOnGround) { // Pulo
        player.velocityY = -jumpPower;
        player.isOnGround = false;
    }
}

// Função de atualização do jogo
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    applyPhysics();
    drawPlayer();
    requestAnimationFrame(updateGame); // Atualiza o jogo
}

// Adiciona evento de toque para movimentação e pulo
canvas.addEventListener('touchstart', movePlayerWithTouch);
canvas.addEventListener('touchmove', movePlayerWithTouch);  // Para mover conforme o dedo arrasta

// Inicia o jogo
updateGame();
