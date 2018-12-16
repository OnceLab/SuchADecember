
let organictest; // for test

// define a PALETTE
const PALETTE = ["rgba(142,229,238,0.2)", "rgba(255,120,120, 0.15)", "rgba(243,231,140,0.3)", "rgba(251,184,255, 0.1)", "rgba(217,83,79,0.1)"];

let flowers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //colorMode(HSB);
    //blendMode(ADD); // for radiant effect;
    if (width < 1080) {
        for (let i = 0; i < 50; i++) {
            flowers.push(new Shape(int(random(10,15)),int(random(20,50))));
        }
    } else {
        for (let i = 0; i < 100; i++) {
            flowers.push(new Shape(int(random(10,15)),int(random(5,40))));
        }
    }

    organictest = new Shape(5,60)

    background(0);
    frameRate(30);
    noStroke();
    //noLoop();

}



function draw() {
    background(0);
    // flowers.forEach(flower => {
    //     flower.render();
    //     flower.move();
    // })

    organictest.move();
    organictest.render();


}




class Shape  {
    constructor(layers,radius) {
        this.layers = layers;
        this.radius = radius;
        this.position = createVector(random(0, width + 300),100);
        this.xoff = random(10);
        this.yoff = random(10);
        this.color = getRandomColor();

        this.life = 100;
    }

    render() {
        let basicRadius = this.radius;
        for (let i = 0; i < this.layers; i++) {
            let layer = new OrganicLayer(basicRadius, this.position, this.color);
            layer.render();

            // expand the organic layers
            basicRadius *= 1.05;
        }
    }


    move() {
        this.position.x += random(-20,1) < 0 ? noise(this.xoff, this.yoff) * -50 : noise(this.xoff, this.yoff) * 100;
        //this.position.y += 5;
        this.position.y += random(-20,1) < 0 ? noise(this.xoff, this.yoff) * 50 : noise(this.xoff, this.yoff) * -100;

        this.xoff += 0.01;
        this.yoff += 0.01;

        //console.log(this.position.y)
    }


}

class OrganicLayer{
    constructor(radius,position,color) {
        this.position = position;
        this.seperation = 1800;
        this.xoff = random(0.5);
        this.yoff = random(0.5);
        this.increment = 0.05;
        this.count = 0;
        this.color = color;
        this.radius = radius;

    }

    render() {
        fill(this.color);
        this.shape();
    }

    shape() {
        let start = 0;
        let degree = 360 / this.seperation;

        beginShape();
        while (this.count < this.seperation) {
            let v = p5.Vector.fromAngle(start);
            v = v.mult(this.radius);
            v= v.mult(noise(this.xoff, this.yoff));
            //console.log(v);

            let position = p5.Vector.add(this.position, v);


            vertex(position.x, position.y);

            start += degree;
            this.count += 1;
            this.xoff += this.increment;
            this.yoff += this.increment;
        }
        endShape(CLOSE);
    }

}

function getRandomColor() {
    const rando = floor(random(0,PALETTE.length));
    return PALETTE[rando]
}

