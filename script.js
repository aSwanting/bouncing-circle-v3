////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////

// Random Number Function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Circle Spawn Function
function spawnCircles(circleCount) {

    let circles = []

    for (let i = 1; i <= circleCount; i++) {
        circles.push(new Circle)
    }

    return circles
}

////////////////////////////////////////// CLASSES //////////////////////////////////////////

class Circle {

    constructor() {

        // Random values
        this.d = rand(30, 90)
        this.r = this.d / 2
        this.x = rand(this.r, window.innerWidth - this.r)
        this.y = rand(this.r, window.innerHeight - this.r)
        this.dx = this.getDirection(-8, 8)
        this.dy = this.getDirection(-8, 8)

        // DOM Element
        this.dom = this.buildCircle()

    }

    buildCircle() {

        // Create Circle
        const circle = document.createElement("div")

        // Circle Coordinates
        circle.style.width = this.d + "px"
        circle.style.translate = "-50% -50%"
        circle.style.left = this.x + "px"
        circle.style.top = this.y + "px"

        // Circle Style
        circle.style.position = "absolute"
        circle.style.aspectRatio = 1
        circle.style.borderRadius = "50%"
        circle.style.border = this.d / 10 + "px solid black"

        // Draw Circle
        document.body.append(circle)

        return circle

    }

    // Get Random Direction, Exclude 0
    getDirection(min, max) {

        let n = 0
        while (n === 0) {
            n = rand(min, max)
            console.log(n)
        }
        return n
    }

    // Move Circle, Bounce against Window Boundaries
    moveCircle() {

        // Right Boundary
        if (this.x + this.dx > window.innerWidth - this.r) {
            this.x = window.innerWidth - this.r
            this.dx = -this.dx
        }

        // Left Boundary
        if (this.x + this.dx < this.r) {
            this.x = this.r
            this.dx = -this.dx
        }

        // Bottom Boundary
        if (this.y + this.dy > window.innerHeight - this.r) {
            this.y = window.innerHeight - this.r
            this.dy = -this.dy
        }

        // Top Boundary
        if (this.y + this.dy < this.r) {
            this.y = this.r
            this.dy = -this.dy
        }

        // Increment Position
        this.x += this.dx
        this.y += this.dy
        this.dom.style.left = this.x + "px"
        this.dom.style.top = this.y + "px"

    }
}


////////////////////////////////////////// CODE //////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {

    let circleCount

    while (isNaN(circleCount) || circleCount === 0 || circleCount > 1000) {

        circleCount = parseInt(prompt("Number of circles to spawn (max 1000)"))

    }


    const circles = spawnCircles(circleCount)

    // Animate Circles
    function animate() {
        circles.forEach(element => {
            element.moveCircle()
        })
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

})
