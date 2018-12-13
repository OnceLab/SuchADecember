
let organictest; // for test

// define a PALETTE
const PALETTE = ["hsba(160, 100%, 100%, 0.1)", "hsba(200, 100%, 100%, 0.1)", "hsba(63, 100%, 81%, 0.1)", "hsba(348, 100%, 81%, 0.1)", "hsba(306, 100%, 74%, 0.1)"];

let flowers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //colorMode(HSB,360,100,100,100);
    //blendMode(ADD); // for radiant effect;
    organictest = new Shape(5,100)
    // for (let i = 0; i < 50; i++) {
    //     flowers.push(new Shape(int(random(3,6)),int(random(20,100))));
    // }

    blendMode(ADD); // for radiant effect;
    if (width < 1080) {
        for (let i = 0; i < 50; i++) {
            flowers.push(new Shape(int(random(4,7)),int(random(20,60))));
        }
    } else {
        for (let i = 0; i < 100; i++) {
            flowers.push(new Shape(int(random(4,7)),int(random(20,100))));
        }
    }
    background(15,25,24);
    let rando = random();
    if (rando < 0.25) {
        stroke(`rgba(255,255,255,0.3)`)
    } else if (rando < 0.5) {
        stroke(`rgba(255,255,255,0.2)`)
    } else if (rando < 0.75) {
        stroke(`rgba(255,255,255,0.1)`)
    } else {
        stroke(`rgba(255,255,255,0.01)`)
    }

    noLoop();

}



function draw() {

    // for test
    // organictest.render()

    flowers.forEach(flower => {
        flower.render();
    })


    // Title
    blendMode(BLEND)
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text('Such a December - 8', width/2 , height - 100);
    noLoop();
}




class Shape  {
    constructor(layers,radius) {
        this.layers = layers;
        this.radius = radius;
        this.position = createVector(random(width),random(height));
        this.xoff = 0;
        this.rotation = random(60);
        this.color = getRandomColor();

        // for the inner pistil
        this.innerRotation = 50;
        this.innerPosition = this.position;
        this.innerRadius = radius;
    }

    render() {


        // Build fundamental layers, the num of organicLayer depends on the depth of current layer

        for (let i = 0; i < this.layers; i++) {
            blendMode(BLEND)
            push();
                translate(this.position.x, this.position.y);

                for (let j = 0; j < i*1.5; j++) {
                    rotate(this.rotation);
                    let layer = new OrganicLayer(this.radius, this.position, this.color);
                    layer.render();
                    this.rotation += random(30,90);
                }
            pop();

            this.rotation += random(0,90);

            // expand the organic layers
            this.radius += this.innerRadius/5;


            // control the floating range of organic layet
            // let rando = random(1);
            // if (rando < 0.25) {
            //     this.position.x += (noise(this.xoff) * 1);
            // } else if (rando < 0.5){
            //     this.position.x += (-1 * noise(this.xoff) * 1);
            // } else if (rando < 0.75) {
            //     this.position.y += (noise(this.xoff) * 1);
            // } else {
            //     this.position.y += (-1 * noise(this.xoff) * 1);
            // }
            // this.xoff += 0.01;
        }


        // Build the pistill
        // push()
        // blendMode(ADD);
        // translate(this.position.x , this.position.y);
        //
        //
        // for (let j = 0; j < 3; j++) {
        //     rotate(this.innerRotation);
        //     let layer = new OrganicLayer(this.innerRadius/5, this.innerPosition,getRandomColor());
        //     layer.render();
        //     this.innerrotation += random(120,240);
        // }
        // pop()
    }

    // not finished, leave for another sketch
    fill(layer) {
        distribution = 1 / this.layers;
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

        this.radius = radius;
        this.color = color;


    }

    render() {
        fill(this.color);
        this.shape()
    }

    shape() {
        let start = 0;
        let degree = 360 / this.seperation;

        beginShape();
        while (this.count < this.seperation) {
            let v = p5.Vector.fromAngle(start);
            v = v.mult(this.radius);
            v= v.mult(noise(this.xoff, this.yoff));
            if (v.x > 0) {
                v.x +=20;
            }

            //console.log(v);

            let position = p5.Vector.add(this.position, v);



            vertex(v.x + this.radius/5, v.y);

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

