rectArray = [];

function setup() {
    background(0);
    createCanvas(windowWidth, windowHeight);
    //blendMode(ADD);
    noStroke();
    fill('rgba(0,64,128,0.01)')
    rectMode(CENTER);
    for (let i = 0; i < 100; i++) {
        let singleRect = new BreathingRect()
        rectArray.push(singleRect)

    }
}

function draw() {


    rectArray.forEach(sr => {
        sr.move();
        sr.render();
    })

    let trueSet = 0;
    rectArray.forEach(rec => {
        if (rec.width < -1.2*width) {
            trueSet += 1;
        }
    })

    if (trueSet >= rectArray.length) {
        blendMode(BLEND);
        fill(255);
        textSize(32);
        textAlign(CENTER);
        text('Such a December - 5', width/2 , height/2);
        noLoop();
    }

}

class BreathingRect {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.width = random(20, 200);
        this.height = random(20, 200);
        this.heightLimit = random(300,700);
        this.widthShrink = random(5,15);

        //this.stroke = (255, 255, 100);
        this.strokeWeight = random(1, 5);
        this.posVelocity = createVector(random(5, 15), random(5, 15));
        this.negVelocity = createVector(random(-5, -15), random(-5, -15));
        this.gen = floor(random(0, 2))

    }

    move() {
        if (this.height < this.heightLimit) {
            this.height += random(0.5) * 10;
        }	else if (this.height >= this.heightLimit) {
            this.width -= this.widthShrink;
        }

    }

    render() {
        //stroke(this.stroke);
        //strokeWeight(this.strokeWeight);

        rect(this.position.x, this.position.y, this.width, this.height);
    }



}