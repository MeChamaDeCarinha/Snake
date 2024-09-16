const gameStates = {
    running: "running",
    idle: "idle",
    stopped: "stopped",
}

class Game {
    constructor() {
        this.state = gameStates.stopped
        this.pos = createVector(0, 0)
        this.width = width - 200
        this.height = height

        this.gridSize = 5
        this.points = 0

        this.snake = null
        this.food = null
    }

    update() {
        // center game
        if (sidebar.state === sidebarStates.opening) this.pos.x -= 1.5
        if (sidebar.state === sidebarStates.closing) this.pos.x += 1.5

        if (this.snake && this.state === gameStates.running) {
            if (this.snake.body[0].x === this.food.pos.x && this.snake.body[0].y === this.food.pos.y) {
                this.points += 1
                this.snake.body.push(this.snake.body[this.snake.body.length - 1].copy())

                let food = new Food(this.height, this.gridSize)
                while (this.snake.body.some((bodyPart) => food.pos.x === bodyPart.x && food.pos.y === bodyPart.y)) {
                    food = new Food(this.height, this.gridSize)
                }

                this.food = food
            }

            this.snake.update()
        }
    }

    draw() {
        push()

        // translate to the x actual position
        translate(this.pos.x, 0)

        // first backgroud
        fill("#202020")
        square(-1, 0, this.width + 2)

        // second backgroud
        fill("#ededed")
        square(0, 0, this.width)

        if (this.food) this.food.draw()
        if (this.snake) this.snake.draw()

        // grid
        stroke("#909090")
        for (let i = 1; i < this.gridSize; i += 1) {
            line(0, (i * this.height) / this.gridSize, this.width, (i * this.height) / this.gridSize)
            line((i * this.width) / this.gridSize, 0, (i * this.width) / this.gridSize, this.height)
        }
        noStroke()

        if (this.state === gameStates.running) {
            fill("#121212")
            textSize(20)
            text("Points: " + this.points, 5, this.height - 10)
        }

        if (this.state === gameStates.idle) {
            fill(210, 210, 210, 225)
            stroke("#808080")
            strokeWeight(1)
            rect((this.width / 2) - 150, (this.height / 2) - 100, 300, 200, 10)
            textSize(35)
            fill(0)
            textAlign(CENTER, CENTER)
            text("You lost", this.width / 2, (this.height / 2) - 40)

            textSize(20)
            text("Total points: " + this.points, this.width / 2, (this.height / 2))

            textSize(15)
            text("Press R to restart", this.width / 2, (this.height / 2) + 70)
            text("ESC to show sidebar", this.width / 2, (this.height / 2) + 90)
        }

        pop()
    }

    start() {
        if (sidebar.state !== sidebarStates.closed) sidebar.state = sidebarStates.closing 
        this.points = 0

        this.snake = new Snake(this.height, this.gridSize)
        this.food = new Food(this.height, this.gridSize)

        this.state = gameStates.running
    }

    end() {
        this.state = gameStates.idle
    }
}
