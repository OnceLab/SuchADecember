
let organictest; // for test


// grid system
const FLOWER_SIZE = 80;

const PADDING = FLOWER_SIZE * 3.5;
const GRID_BOX = PADDING + FLOWER_SIZE;

const COLUNMS = 3;
const ROWS = 3;
const MARGIN = FLOWER_SIZE * 3;

const START = FLOWER_SIZE * 3;



// define a PALETTE
const PALETTE = ["hsba(160, 100%, 100%, 0.1)", "hsba(200, 100%, 100%, 0.1)", "hsba(63, 100%, 81%, 0.1)", "hsba(348, 100%, 81%, 0.1)", "hsba(306, 100%, 74%, 0.1)"];


let strokeOn = false;

function setup() {
    const totalX = GRID_BOX * COLUNMS + MARGIN;
    const totalY = GRID_BOX * ROWS + MARGIN;
    createCanvas(totalX, totalY);


    angleMode(DEGREES);

    organictest = new Shape(width/2, height/2, 4,100);

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

let totalFlowers = [];

function draw() {

    // for test
    // organictest.render();
    // console.log(organictest)

    for (let x = 0; x < COLUNMS; x++) {
        for (let y = 0; y < ROWS; y++) {
            const POSX = START + x * GRID_BOX;
            const POSY = START + y * GRID_BOX;

            totalFlowers.push(new Shape(POSX,POSY,int(random(4,9)), FLOWER_SIZE));
        }
    }

    for (let i = 0; i < totalFlowers.length; i++) {
        totalFlowers[i].render();
    }


    // Title
    blendMode(BLEND)
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text('Such a December - 10 (The End)', width/2 , height - 100);
    noLoop();
}


function getRandomSep() {
    let rando = random();

    if (rando < 0.3) {
        return 3
    } else if (rando < 0.5) {
        return 6
    } else {
        return int(random(30,90))
    }


}

class Shape  {
    constructor(posX, posY, layers,radius) {
        this.layers = layers;
        this.radius = radius;
        this.position = createVector(posX,posY);
        this.xoff = 0;
        this.rotation = random(60);
        this.color = getRandomColor();
        this.layerSep = getRandomSep();

        // for the inner pistil
        this.innerRotation = 50;
        this.innerPosition = this.position;
        this.innerRadius = radius/4;
        this.pistillColor = getRandomColor();
        this.innerLayers = int(random(4,7));
    }

    render() {


        // Build fundamental layers, the num of organicLayer depends on the depth of current layer

        for (let i = 0; i < this.layers; i++) {
            blendMode(BLEND)
            push();
                translate(this.position.x, this.position.y);

                for (let j = 0; j < min(i*1.5,this.layers); j++) {
                    rotate(this.rotation);
                    let layer = new OrganicLayer(this.radius, this.position, this.color, this.layerSep, true);
                    layer.render();
                }
            pop();

            this.rotation += random(0,90) * 0.618;

            // expand the organic layers
            this.radius += this.innerRadius/5;



        }



        push()
        blendMode(ADD);
        translate(this.position.x , this.position.y);


        for (let j = 0; j < 24; j++) {
            rotate(this.innerRotation);
            let layer = new OrganicLayer(this.innerRadius/6, this.innerPosition, this.pistillColor, 720, true);
            layer.render();
            this.innerRotation += 60;
        }
        pop()
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

