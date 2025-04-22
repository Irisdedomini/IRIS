const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const player = {
    x: 50,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    speed: 4,
    color: 'blue'
};

const keys = {};
const bullets = [];
const enemies = [];
let score = 0;

// Movimiento continuo
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Disparo
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        bullets.push({
            x: player.x + player.width,
            y: player.y + player.height / 2 - 2.5,
            width: 10,
            height: 5,
            speed: 7,
            color: 'red'
        });
    }
});

// Crear enemigos cada cierto tiempo
setInterval(() => {
    enemies.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - 40),
        width: 40,
        height: 40,
        speed: 2 + Math.random() * 2,
        color: 'green'
    });
}, 1500);

// Actualizar lógica
function update() {
    // Movimiento del jugador
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;

    // Mover balas
    bullets.forEach((b, i) => {
        b.x += b.speed;
        if (b.x > canvas.width) bullets.splice(i, 1);
    });

    // Mover enemigos
    enemies.forEach((e, i) => {
        e.x -= e.speed;
        if (e.x + e.width < 0) enemies.splice(i, 1);
    });

    // Colisiones
    bullets.forEach((b, bi) => {
        enemies.forEach((e, ei) => {
            if (b.x < e.x + e.width &&
                b.x + b.width > e.x &&
                b.y < e.y + e.height &&
                b.y + b.height > e.y) {
                // Eliminar enemigo y bala
                bullets.splice(bi, 1);
                enemies.splice(ei, 1);
                score += 10;
                document.getElementById('score').textContent = `Puntos: ${score}`;
            }
        });
    });
}

// Dibujar todo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Jugador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Balas
    bullets.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });

    // Enemigos
    enemies.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
