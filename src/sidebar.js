const states = {
    open: "open",
    opening: "opening",
    closed: "closed",
    closing: "closing",
}

class Sidebar {
    constructor() {
        this.pos = createVector(width - 200, -1)
        this.width = 200
        this.height = height
        this.state = states.open

        this.settingsButton = createButton("⚙")
        this.settingsButton.position(this.pos.x + this.width - 45, 10, "absolute")
        this.settingsButton.parent("container")
        this.settingsButton.addClass("roundButton")
        
        this.playButton = createButton("Play")
        this.playButton.position(this.pos.x + (this.width / 2) - 57.5, (height / 2) - 12.5, "absolute")
        this.playButton.parent("container")
        this.playButton.addClass("button")

        this.playButton.mousePressed(() => {
            if (this.state === states.open) this.state = states.closing
            if (this.state === states.closed) this.state = states.opening
        })
    }

    draw() {
        fill("#121212")
        stroke("#202020")
        rect(this.pos.x, this.pos.y, width, height + 1)
    }

    update() {
        if (this.state === states.closing) {
            this.pos.x += 3
            this.settingsButton.position(this.settingsButton.x + 3, this.settingsButton.y)
            this.playButton.position(this.playButton.x + 3, this.playButton.y)
            if (this.pos.x > width) {
                this.state = states.closed
            }
        }
        if (this.state === states.opening) {
            this.pos.x -= 3
            this.settingsButton.position(this.settingsButton.x - 3, this.settingsButton.y)
            this.playButton.position(this.playButton.x - 3, this.playButton.y)
            if (this.pos.x < width - this.width) {
                this.state = states.open
            }
        }
    }
}
