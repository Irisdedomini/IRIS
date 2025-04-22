// Obtener el canvas y el contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Establecer las dimensiones del canvas
canvas.width = 800;
canvas.height = 600;

// Variables del jugador
const player = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
    color: 'blue'
};

// Dibujar al jugador
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Actualizar la posición del jugador
function updatePlayerPosition() {
    // Movimiento básico con las teclas de flecha
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && player.y > 0) {
            player.y -= player.speed;
        }
        if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
            player.y += player.speed;
        }
        if (event.key === 'ArrowLeft' && player.x > 0) {
            player.x -= player.speed;
        }
        if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    });
}

// Función principal de actualización del juego
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    drawPlayer(); // Dibujar al jugador
    requestAnimationFrame(gameLoop); // Llamar de nuevo a la función de animación
}

// Iniciar el juego
updatePlayerPosition();
gameLoop();
