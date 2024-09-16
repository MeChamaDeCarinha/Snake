const keyCodes = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    up: 38,
    left: 37,
    down: 40,
    right: 39,

    R: 82,
    escape: 27
}

let sidebar,
    game = undefined

function setup() {
    const canvas = createCanvas(800, 600)

    // canvas.position((window.innerWidth - 800) / 2, (window.innerHeight - 800) / 2)
    canvas.parent("container")

    frameRate(144)
    noStroke()

    sidebar = new Sidebar()
    game = new Game()
}

function draw() {
    background("#d5d5d5")

    sidebar.update()
    game.update()
    
    game.draw()
    sidebar.draw()
}

function keyPressed() {
    if ((keyCode === keyCodes.W || keyCode === keyCodes.up) && game.snake.canMove(0, -1)) game.snake.direction = createVector(0, -1)
    if ((keyCode === keyCodes.A || keyCode === keyCodes.left) && game.snake.canMove(-1, 0)) game.snake.direction = createVector(-1, 0)
    if ((keyCode === keyCodes.S || keyCode === keyCodes.down) && game.snake.canMove(0, 1)) game.snake.direction = createVector(0, 1)
    if ((keyCode === keyCodes.D || keyCode === keyCodes.right) && game.snake.canMove(1, 0)) game.snake.direction = createVector(1, 0)

    if (keyCode === keyCodes.R) game.start()    
    if (keyCode === keyCodes.escape && sidebar.state === sidebarStates.closed) sidebar.state = sidebarStates.opening
}
