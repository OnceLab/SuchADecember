let rectArray = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    blendMode(ADD);
    noFill();
    rectMode(CENTER);
    for (let i = 0; i < 100; i++) {
        let singleRect = new BreathingRect()
        rectArray.push(singleRect)

    }
}

function draw() {
    background(0);

    rectArray.forEach(sr => {
        sr.move();
        sr.render();
    })
}

function mouseClicked() {
    blendMode(BLEND);
    background(0);
    blendMode(ADD);
    rectArray = [];
    for (let i = 0; i < 100; i++) {
        let singleRect = new BreathingRect()
        rectArray.push(singleRect)

    }
}

class BreathingRect {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.width = random(20, 200);
        this.height = random(20, 100);

        this.stroke = (255,255, 100);
        this.strokeWeight = random(1,5);

        this.heightSpeed = random(0.5,1) * 10;

        this.gen = floor(random(0,4));
        this.velocity0 = createVector(random(5,15), random(5,15));
        this.velocity1 = createVector(random(-5,-15), random(-5,-15));
        this.velocity2 = createVector(random(-5,-15), random(5,15));
        this.velocity3 = createVector(random(5,15), random(-5,-15));


    }

    move() {
        this.height += this.heightSpeed;

        if (this.height > 1000 && this.gen == 0) {
            this.position.add(this.velocity0);
        } else if (this.height > 1000 && this.gen == 1){
            this.position.add(this.velocity1);
        } else if (this.height > 1000 && this.gen == 2){
            this.position.add(this.velocity2);
        } else if (this.height > 1000 && this.gen == 3){
            this.position.add(this.velocity3);
        }
    }

    render(){
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);

        rect(this.position.x, this.position.y, this.width, this.height);
    }

}