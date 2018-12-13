
let organictest; // for test

// define a PALETTE
const PALETTE = ["rgba(142,229,238,0.2)", "rgba(255,120,120, 0.15)", "rgba(243,231,140,0.3)", "rgba(251,184,255, 0.1)", "rgba(217,83,79,0.1)"];

let flowers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //colorMode(HSB);
    blendMode(ADD); // for radiant effect;
    if (width < 1080) {
        for (let i = 0; i < 50; i++) {
            flowers.push(new Shape(int(random(5,15)),int(random(20,50))));
        }
    } else {
        for (let i = 0; i < 100; i++) {
            flowers.push(new Shape(int(random(5,15)),int(random(20,40))));
        }
    }

    background(0);
    noStroke();
    noLoop();

}



function draw() {
    flowers.forEach(flower => {
        flower.render();
    })

    // Title
    blendMode(BLEND)
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text('Such a December - 7', width/2 , height - 100);
    noLoop();
}




class Shape  {
    constructor(layers,radius) {
        this.layers = layers;
        this.radius = radius;
        this.position = createVector(random(width),random(height));
        this.xoff = 0;
    }

    render() {
        for (let i = 0; i < this.layers; i++) {
            let layer = new OrganicLayer(this.radius, this.position);
            layer.render();

            // expand the organic layers
            this.radius *= 1.05;


            // control the floating range of organic layet
            let rando = random(1);
            if (rando > 0.5) {
                this.position.add(noise(this.xoff) * 15);
            } else {
                this.position.add(-1 * noise(this.xoff) * 15);
            }
            this.xoff += 0.1;
        }
    }

    // not finished, leave for another sketch
    fill(layer) {
        distribution = 1 / this.layers;
    }


}

class OrganicLayer{
    constructor(radius,position) {
        this.position = position;
        this.seperation = 1800;
        this.xoff = random(0.5);
        this.yoff = random(0.5);
        this.increment = 0.05;
        this.count = 0;

        this.radius = radius;

    }

    render() {
        color = getRandomColor();
        fill(color);
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

