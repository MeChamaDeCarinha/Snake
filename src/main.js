let sidebar, settings = undefined

function setup() {
    const canvas = createCanvas(800, 600)

    // canvas.position((window.innerWidth - 800) / 2, (window.innerHeight - 800) / 2)
    canvas.parent("container")

    frameRate(144)
    noStroke()

    sidebar = new Sidebar()

}

function draw() {
    background(0)

    sidebar.draw()
    sidebar.update()
}
