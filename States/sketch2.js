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

    let trueSet = 0;

    rectArray.forEach(rec => {
        if (rec.position.x > 1.5*width || rec.position.x < -1.5*width) {
            trueSet += 1;
        }
    })

    //console.log(trueSet);
    if (trueSet >= rectArray.length) {
        blendMode(BLEND);
        background(255);
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text('Such a December - 2', width/2 , height/2);
        noLoop();
    }
}

function mouseClicked() {
    blendMode(BLEND);
    background(0);
    loop();
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
        this.width = random(10, 100);
        this.height = random(20, 100);

        this.stroke = (255,255, 100);
        this.strokeWeight = random(1,2);

        this.heightSpeed = random(0.5,1) * 10;

        this.gen = floor(random(0,4));
        this.velocity0 = createVector(random(5,15), random(5,15));
        this.velocity1 = createVector(random(-5,-15), random(-5,-15));
        this.velocity2 = createVector(random(-5,-15), random(5,15));
        this.velocity3 = createVector(random(5,15), random(-5,-15));


    }

    move() {
        this.height += this.heightSpeed;

        if (this.height > height * 0.8 && this.gen == 0) {
            this.position.add(this.velocity0);
        } else if (this.height > height * 0.9 && this.gen == 1){
            this.position.add(this.velocity1);
        } else if (this.height > height * 1&& this.gen == 2){
            this.position.add(this.velocity2);
        } else if (this.height > height * 1.1&& this.gen == 3){
            this.position.add(this.velocity3);
        }
    }

    render(){
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);

        rect(this.position.x, this.position.y, this.width, this.height);
    }

}