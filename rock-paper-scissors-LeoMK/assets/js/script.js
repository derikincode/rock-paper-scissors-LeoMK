const TYPES = [
  "/assets/img/rock.png",
  "/assets/img/paper.png",
  "/assets/img/scissors.png",
];
const TOTAL = 100; // const TOTAL = Math.sqrt(innerWidth * innerHeight) / 2;
const SIZE = 60;
const VEL = 10;
var itens = [];
var images = [];
let backgroundColor = "#000000"; // Cor inicial em formato hexadecimal: Black

function preload() {
  for (let i = 0; i < TYPES.length; i++) {
    images[i] = loadImage(TYPES[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < TOTAL; i++) {
    itens.push(new Item(int(random(TYPES.length))));
  }
}

function draw() {
  background(color(backgroundColor));
  itens.forEach((i) => i.update());
  itens.forEach((i) => i.draw());
}

class Item {
  constructor(type) {
    this.type = type;
    this.image = images[type];
    this.pos = createVector(random(width), random(height));
    this.easePos = createVector(this.pos.x, this.pos.y);
  }

  update() {
    this.pos.x += random(-VEL, VEL);
    this.pos.y += random(-VEL, VEL);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    this.easePos.x += (this.pos.x - this.easePos.x) * 0.09;
    this.easePos.y += (this.pos.y - this.easePos.y) * 0.09;

    itens.forEach((i) => {
      if (i.type != this.type) {
        if (
          distsq(i.easePos.x, i.easePos.y, this.easePos.x, this.easePos.y) <
          SIZE * SIZE
        ) {
          var result = i.type ^ this.type;
          if (result == 2) result = 0;
          else if (result == 3) result = 2;

          this.type = i.type = result;
          this.image = i.image = images[result];
        }
      }
    });
  }

  draw() {
    image(
      this.image,
      this.easePos.x - SIZE / 2,
      this.easePos.y - SIZE / 2,
      SIZE,
      SIZE
    );
  }
}

function distsq(x1, y1, x2, y2) {
  return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}

function changeBackgroundColor(hexColor) {
  backgroundColor = hexColor;
}

// by derikincode
