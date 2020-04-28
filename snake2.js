var GAME_SPEED ;
var step=0;

function start(counter) {
    GAME_SPEED = counter;
    const SNAKE_COLOUR = '#B6FF00';
    const SNAKE_BORDER_COLOUR = 'black';
    const FOOD_COLOUR = 'red';
    const FOOD_BORDER_COLOUR = 'darkred';
    
    let snake = [
    {x: 160, y: 160},
    {x: 128, y: 160},  
    {x: 96, y: 160},  
    {x: 64, y: 160},  
    {x: 32, y: 160},
    ]

    
    let score = 0;
    let changingDirection = false;
    let foodX;
    let foodY;
    let dx = 32;
    let dy = 0;
    const gameCanvas = document.getElementById("gameCanvas");
    const ctx = gameCanvas.getContext("2d");
    
    main();
    
    createFood();
    
    
    document.addEventListener("keydown", changeDirection);

    function main() {
      document.getElementById('step').innerHTML = "Step: " + step;
      document.getElementById('score').innerHTML = "Score: " + score;

      if (didGameEnd()) {
            clearCanvas();
            document.getElementById('gameOver').innerHTML = "<br>"+"Game Over!!"+ "<br>" + '<button onclick="Reload()" class="btn btn-primary tot">Restart</button>'
        return
        };
            setTimeout(function onTick() {
                changingDirection = false;
                clearCanvas();  
                drawFood();
                advanceSnake();
                drawSnake();
                main();
              }, GAME_SPEED)
          
      
    }
    
    
    function clearCanvas() {
      
      ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
      for(var i=0;i<gameCanvas.height;i+=64){
        for(var j=0;j<gameCanvas.width;j+=64){
            ctx.fillStyle = 'rgb(172, 115, 57)';
            ctx.fillRect(i,j,32,32);
        }
    }
    for(var i=32;i<gameCanvas.height;i+=64){
        for(var j=32;j<gameCanvas.width;j+=64){
            ctx.fillStyle = 'rgb(172, 115, 57)';
            ctx.fillRect(i,j,32,32);
            
        }
    }
    for(var i=0;i<gameCanvas.height;i+=64){
      for(var j=32;j<gameCanvas.width;j+=64){
          ctx.fillStyle = 'rgb(217, 179, 140)';
          ctx.fillRect(i,j,32,32);
          
      }
  }
  for(var i=32;i<gameCanvas.height;i+=64){
    for(var j=0;j<gameCanvas.width;j+=64){
        ctx.fillStyle = 'rgb(217, 179, 140)';
        ctx.fillRect(i,j,32,32);
        
    }
}
    }

    function drawFood() {
      ctx.fillStyle = FOOD_COLOUR;
      ctx.strokestyle = FOOD_BORDER_COLOUR;
      ctx.fillRect(foodX, foodY, 32, 32);
      ctx.strokeRect(foodX, foodY, 32, 32);
    }

    function advanceSnake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);

      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      
      if (didEatFood) {
        score += 10;
        createFood();
      } else {
        snake.pop();
      }
    }

    function didGameEnd() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }

      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 32;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 32;

      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }
    
    /**
     * Generates a random number that is a multiple of 10 given a minumum
     * and a maximum number
     * @param { number } min - The minimum number the random number can be
     * @param { number } max - The maximum number the random number can be
     */
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 32) * 32;
    }

    function createFood() {

      foodX = randomTen(0, gameCanvas.width - 32);
      foodY = randomTen(0, gameCanvas.height - 32);

      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
      });
    }

    function drawSnake() {
      snake.forEach(drawSnakePart)
    }

    /**
     * Draws a part of the snake on the canvas
     * @param { object } snakePart - The coordinates where the part should be drawn
     */
    function drawSnakePart(snakePart) {
      ctx.fillStyle = SNAKE_COLOUR;
      ctx.strokestyle = SNAKE_BORDER_COLOUR;
      ctx.fillRect(snakePart.x, snakePart.y, 32, 32);
      ctx.strokeRect(snakePart.x, snakePart.y, 32,32);
    }

    /**
     * Changes the vertical and horizontal velocity of the snake according to the
     * key that was pressed.
     * The direction cannot be switched to the opposite direction, to prevent the snake
     * from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     * @param { object } event - The keydown event
     */
    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      if (changingDirection) return;
      changingDirection = true;

      const keyPressed = event.keyCode;
      
      const goingUp = dy === -32;
      const goingDown = dy === 32;
      const goingRight = dx === 32;
      const goingLeft = dx === -32;
      
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -32;
        dy = 0;
        step+=1;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -32;
        step+=1;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 32;
        dy = 0;
        step+=1;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 32;
        step+=1;
      }
    }
}

function Reload(){
    location.reload();  
}
console.log("%cDHWAJ GUPTA! Thomso IITR", "color: green; font-size:30px;");