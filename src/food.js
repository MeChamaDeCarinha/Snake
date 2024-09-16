class Food {
    constructor(gameSize, gridSize) {
        this.pos = createVector(Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize))
        this.size = gameSize / gridSize
    }

    draw() {
        push()

        fill("#ff5555")
        rect(this.pos.x * this.size, this.pos.y * this.size, this.size, this.size)

        pop()
    }
}
