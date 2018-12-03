let rectArray = [];
const PALETTE = ["#f35393","#DEC058","#f775f7","#2EC6F4","#f2f3f3"];


function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    rectMode(CENTER);
    frameRate(30);
    for (let i = 0; i < max(int(windowWidth/20), int(windowHeight/20),40); i++) {
        let singleRect = new BreathingRect();
        rectArray.push(singleRect)

    }
}

function draw() {
    background(0);

    rectArray.forEach(sr => {
        sr.move();
        sr.render();
    })

    if (frameCount > 150) {
        //blendMode(BLEND);
        fill(255);
        noStroke();
        textSize(32);
        textAlign(CENTER);
        text('Such a December - 3', width/2 , height * 3 / 4);
        //noLoop();
    }
}

function getRandomColor() {
    const rando = floor(random(0,PALETTE.length));
    return PALETTE[rando]
}

class BreathingRect {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.width = random(20, 200);
        this.height = random(20, 200);

        this.color = getRandomColor();
        this.strokeWeight = random(1,5);
        this.velocity = createVector(random(-5,5), random(-5,5));
        this.velocity.normalize().mult(random(1,5));
        this.randoRate = random(-3,3);
        this.gen = floor(random(2));

    }

    move() {
        if(this.position.x < width && this.position.x > 0 && this.position.y < height && this.position.y > 0 ) {
            this.position.add(this.velocity);

        } else if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1.01;
            this.position.add(this.velocity);
        } else if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1.01;
            this.position.add(this.velocity);
        }


        this.width += this.velocity.x * this.randoRate;
        this.height += this.velocity.y * this.randoRate;
        this.strokeWeight = this.velocity.mag() * random(0.5,1);
    }

    render(){
        noFill();
        stroke(this.color);
        strokeWeight(this.strokeWeight);


            rect(this.position.x, this.position.y, this.width, this.height);



    }



}