let rectArray = [];
const PALETTE = ["#f35393","#DEC058","#f775f7","#2EC6F4","#f2f3f3","#fffe7b","#ccffb2"];

function setup() {
    background(0);
    createCanvas(windowWidth, windowHeight);
    //blendMode(ADD);
    noStroke();
    fill('rgba(0,64,188,0.8)')
    rectMode(CENTER);
    for (let i = 0; i < 100; i++) {
        let singleRect = new BreathingRect()
        rectArray.push(singleRect)

    }
}

function draw() {
    background(255);

    rectArray.forEach(sr => {
        sr.move();
        sr.render();
    })

    let trueSet = 0;
    rectArray.forEach(elli => {
        if (elli.radius >= elli.radiusLimit) {
            trueSet += 1;
        }
    })

    if (trueSet >= rectArray.length) {
        //blendMode(BLEND);
        fill(0);
        textSize(32);
        textAlign(CENTER);
        text('Such a December - 6', width/2 , height/2);
        noLoop();
    }


}

function getRandomColor() {
    const rando = floor(random(0,PALETTE.length));
    return PALETTE[rando]
}

class BreathingRect {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.width = random(500, 800);
        this.height = random(100, 300);
        this.fill = getRandomColor();
        this.heightShrink = random(1,5);
        this.widthShrink = random(1,10);

        this.on = false // when the height shrinking process ends, the width shrinking will begin. Then when the width shrinking ends, the generations of ellipse will be turned on.
        this.radius = 0;
        this.radiusExpandingRate= random(1,10);

        this.randoSet = random(1);
        if (this.randoSet < 0.5) {
            this.radiusLimit = random(20,50);
        } else if (0.5 < this.randoSet && this.randoSet < 0.95) {
            this.radiusLimit = random(50,150);
        } else {
            this.radiusLimit = random(300, 600);
        }


    }

    move() {
        if (this.height >= 5) {
            this.height -= this.heightShrink;
        }	else if (this.height < 5) {
            this.height = 4.5;
            if (this.width > 0) {
                this.width -= this.widthShrink;
            } else {
                this.width = 0;
                this.on = true;

            }

        }

    }

    render() {
        fill(this.fill);

        if (this.on) {
            ellipse(this.position.x, this.position.y, this.radius, this.radius);
            if (this.radius < this.radiusLimit) {
                this.radius += this.radiusExpandingRate;
            }
        } else {
            rect(this.position.x, this.position.y, this.width, this.height);
        }

    }



}