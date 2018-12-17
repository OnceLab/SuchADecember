
let organictest; // for test

// define a PALETTE
const PALETTE = ["hsba(160, 100%, 100%, 0.1)", "hsba(200, 100%, 100%, 0.1)", "hsba(63, 100%, 81%, 0.1)", "hsba(348, 100%, 81%, 0.1)", "hsba(306, 100%, 74%, 0.1)"];

// So 本来想做一些花 后来觉得吧 用grid展示会方便点 后来又觉得 这sketch都这样了 还是每朵花都放大个几十倍最方便 那就留待下回继续做花吧......

let flowers = [];
let strokeOn = false;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index','-10000');

    angleMode(DEGREES);

    organictest = new Shape(4,100)

    blendMode(ADD); // for radiant effect;
    if (width < 1080) {
        for (let i = 0; i < 50; i++) {
            flowers.push(new Shape(int(random(4,7)),int(customedRandoForRadius())));
        }
    } else {
        for (let i = 0; i < 50; i++) {
            flowers.push(new Shape(int(random(4,7)),int(customedRandoForRadius())));
        }
    }
    background(15,25,24);

    let rando = random();
    console.log(rando);
    if (rando < 0.5) {
        stroke(`rgba(64,128,255,0.05)`);
        strokeOn = true;
    }  else {
        noStroke();
    }

    noLoop();

}


function customedRandoForRadius() {
    let rando = random();

    if (rando < 0.75) {
        return random(400,800)
    } else if (rando < 0.85) {
        return random(80,100)
    } else if (rando < 0.95) {
        return random(20,40)
    } else {
        return random(100,120);
    }
}



function draw() {

    // for test
    // organictest.render()

    flowers.forEach(flower => {
        flower.render();
    })

}




class Shape  {
    constructor(layers,radius) {
        this.layers = layers;
        this.radius = radius;
        this.position = createVector(random(width),random(height));
        this.xoff = 0;
        this.rotation = random(60);
        this.color = getRandomColor();
        this.layerSep = int(random(75,90));

        // for the inner pistil
        this.innerRotation = 50;
        this.innerPosition = this.position;
        this.innerRadius = radius;
        this.pistillColor = getRandomColor();
        this.innerLayers = int(random(4,7));
    }

    render() {


        // Build fundamental layers, the num of organicLayer depends on the depth of current layer

        for (let i = 0; i < this.layers; i++) {
            blendMode(BLEND)
            push();
                translate(this.position.x, this.position.y);

                for (let j = 0; j < i*1.5; j++) {
                    rotate(this.rotation);
                    let layer = new OrganicLayer(this.radius, this.position, this.color, this.layerSep, true);
                    layer.render();
                }
            pop();

            this.rotation += random(0,90) * 0.618;

            // expand the organic layers
            this.radius += this.innerRadius/5;



        }


        // Build the pistill， buildNMD 不想build了
        // push()
        // blendMode(ADD);
        // translate(this.position.x , this.position.y);
        //
        //
        // for (let j = 0; j < (strokeOn ? this.innerLayers/2 : this.innerLayers); j++) {
        //     rotate(this.innerRotation);
        //     let layer = new OrganicLayer(this.innerRadius/6, this.innerPosition, this.pistillColor, 720);
        //     layer.render();
        //     this.innerRotation += 60;
        // }
        // pop()
    }

    // not finished, leave for another sketch
    fill(layer) {
        distribution = 1 / this.layers;
    }


}

class OrganicLayer{
    constructor(radius,position,color, sep = 90, x_twisted = false) {
        this.position = position;

        // key param decide the OrganicLayer shape
        this.seperation = sep; // defalut: 90

        this.xoff = random(0.5);
        this.yoff = random(0.5);
        this.increment = 0.05;
        this.count = 0;

        this.radius = radius;
        this.color = color;

        this.xTwisted = x_twisted


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
            // twist  half part of the organic shape

            if (this.xTwisted) {
                if (v.x > 0) {
                    v.x += this.radius/6 + 5;
                }
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

