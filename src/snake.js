class Snake {
    constructor(gameSize, gridSize) {
        this.body = [createVector(Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize))]
        this.size = gameSize / gridSize
        this.direction = createVector(0, 0)
        this.doStep = 0
        this.velocity = 3
    }

    update() {
        if (this.doStep > 10) {
            let nextStep = this.body[0].copy().add(this.direction)

            if (nextStep.x < 0 || nextStep.y < 0 || nextStep.x >= game.gridSize || nextStep.y >= game.gridSize) {
                if (this.body.length > 1) return game.end()
                return
            }

            if (this.body.length > 1 && this.body.some((bodyPart) => bodyPart.x === nextStep.x && bodyPart.y === nextStep.y)) return game.end()

            this.body.unshift(nextStep)

            this.body.pop()
            this.doStep = 0
        }

        this.doStep += this.velocity / deltaTime
    }

    draw() {
        push()

        
        // snake body
        for (let i = 0; i < this.body.length; i++) {
            fill("#55ff55")
            if (i === 0) fill("#55ee55")
            rect(this.body[i].x * this.size, this.body[i].y * this.size, this.size, this.size)
        }

        pop()
    }

    canMove(x, y) {
        if (this.body.length === 1) return true

        if (x && x === 1 && this.body[0].x < this.body[1].x) return false
        if (x && x === -1 && this.body[0].x > this.body[1].x) return false

        if (y && y === 1 && this.body[0].y < this.body[1].y) return false
        if (y && y === -1 && this.body[0].y > this.body[1].y) return false

        return true
    }
}
