document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("playBtn");
    const instructionsBtn = document.getElementById("instructionsBtn");
    const creditsBtn = document.getElementById("creditsBtn");
    const instructionsMenuBtn = document.getElementById("instructionsMenuBtn");
    const creditsMenuBtn = document.getElementById("creditsMenuBtn");
    const playAgainBtn = document.getElementById("playAgainBtn");
    const menuBtn = document.getElementById("menuBtn");

    const menu = document.querySelector(".menu");
    const instructions = document.getElementById("instructions");
    const credits = document.getElementById("credits");
    const gameArea = document.getElementById("gameArea");
    const gameOver = document.getElementById("gameOver");
    const finalScore = document.getElementById("finalScore");
    const scoreDisplay = document.getElementById("score");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let snake;
    let direction;
    let food;
    let score;
    const gridSize = 20;
    const canvasSize = 500;

    function show(element) {
        element.classList.remove("hidden");
    }

    function hide(element) {
        element.classList.add("hidden");
    }

    function resetGame() {
        snake = [{ x: gridSize * 2, y: gridSize * 2 }];
        direction = { x: 0, y: 0 };
        score = 0;
        placeFood();
        updateScore();
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
        };
    }

    function updateScore() {
        scoreDisplay.textContent = `SCORE: ${score}`;
    }

    function gameLoop() {
        if (direction.x !== 0 || direction.y !== 0) {
            const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score += 10;
                updateScore();
                placeFood();
            } else {
                snake.pop();
            }

            if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y) || head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
                endGame();
                return;
            }
        }

        drawGame();
        setTimeout(gameLoop, 100);
    }

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "lime";
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function endGame() {
        finalScore.textContent = `SCORE: ${score}`;
        hide(gameArea);
        show(gameOver);
    }

    function changeDirection(event) {
        const key = event.key;
        if (key === "ArrowUp" && direction.y === 0) {
            direction = { x: 0, y: -1 };
        } else if (key === "ArrowDown" && direction.y === 0) {
            direction = { x: 0, y: 1 };
        } else if (key === "ArrowLeft" && direction.x === 0) {
            direction = { x: -1, y: 0 };
        } else if (key === "ArrowRight" && direction.x === 0) {
            direction = { x: 1, y: 0 };
        }
    }

    playBtn.addEventListener("click", () => {
        hide(menu);
        show(gameArea);
        resetGame();
        gameLoop();
    });

    instructionsBtn.addEventListener("click", () => {
        hide(menu);
        show(instructions);
    });

    creditsBtn.addEventListener("click", () => {
        hide(menu);
        show(credits);
    });

    instructionsMenuBtn.addEventListener("click", () => {
        hide(instructions);
        show(menu);
    });

    creditsMenuBtn.addEventListener("click", () => {
        hide(credits);
        show(menu);
    });

    playAgainBtn.addEventListener("click", () => {
        hide(gameOver);
        show(gameArea);
        resetGame();
        gameLoop();
    });

    menuBtn.addEventListener("click", () => {
        hide(gameOver);
        show(menu);
    });

    window.addEventListener("keydown", changeDirection);
});
