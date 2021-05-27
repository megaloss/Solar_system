class Planet {
  constructor(name, orb, dia, color, pos, vel, info, img, angle, a_vel) {
    this.name = name;
    this.orb = orb;
    this.dia = dia;
    this.color = color;
    this.orig_color = color;
    this.pos = pos;
    this.vel = vel;
    this.info = info;
    this.img = img;
    this.angle = angle;
    this.a_vel = a_vel;
  }

  draw() {
    let x = this.orb * cos(this.pos);
    let y = this.orb * sin(this.pos);
    this.x = x
    this.y = y

    fill(this.color);
    if (this.img) {
      translate(x, y);
      rotate(this.angle);
      if (this.name == 'Sun') {
        image(this.img, 0, 0, this.dia + random(1, 20), this.dia + random(1, 20));

      } else {
        image(this.img, 0, 0, this.dia, this.dia);
      }
      rotate(-this.angle);
      translate(-x, -y);

    } else {
      circle(x, y, this.dia);
    }

  }


  draw_orbit() {
    noFill();
    strokeWeight(0.2);
    stroke(this.color);
    circle(0, 0, this.orb * 2);

  }

  mouseOn(px, py) {
    px = (px - tx) / sf;
    py = (py - ty) / sf;
    let d = dist(px, py, this.x, this.y);
    if (d < this.dia / 2.5) {
      textSize(20 / sf);
      fill(0);
      textStyle(BOLD);
      text(this.name, px + 10 / sf, py - 10 / sf);
      fill(200, 200, 200, 150);
      textStyle(NORMAL);
      text(this.name, px + 10 / sf, py - 10 / sf);
      fill(255);
      textStyle(ITALIC);
      if (this.info) {
        text(this.info, px, py + 20 / sf);
      }
      textSize(20);
    }
  }
  move() {
    this.pos += this.vel * rate.value();
    if (this.img) {
      this.angle += this.a_vel * rate.value();
    }
  }

}

class Luna extends Planet {
  constructor(name, orb, dia, color, pos, vel, info, img, angle, a_vel, host) {
    super(name, orb, dia, color, pos, vel, info, img, angle, a_vel);
    this.host = host;
  }
  draw() {
    let x = this.orb * cos(this.pos);
    let y = this.orb * sin(this.pos);
    let xx = this.host.orb * cos(this.host.pos);
    let yy = this.host.orb * sin(this.host.pos);
    x += xx;
    y += yy;
    this.x = x;
    this.y = y;
    noStroke();
    fill(this.color);
    if (this.img) {
      translate(x, y);
      rotate(this.angle);
      image(this.img, 0, 0, this.dia, this.dia);
      circle(0, 0, this.dia);
      rotate(-this.angle);
      translate(-x, -y);

    } else {
      circle(x, y, this.dia);
    }

  }

  draw_orbit() {
    noFill();
    strokeWeight(0.1);
    stroke(this.color);
    circle(this.host.x, this.host.y, this.orb * 2);

  }

}


var rate;

// name, distance from the sun, diameter, color, position, velosity, info, image, angle, angle velosity
const sun = new Planet('Sun', 0, 90, [255, 190, 0], 0, 0, 'This is our sun.', 'sun.png', 0, 0)
const mercury = new Planet('Mercury', 50, 15, [150, 150, 100], 1, 0.009, 'Closest to the Sun', 'mercury.png', 0, 0.3)
const earth = new Planet('Earth', 130, 30, [150, 155, 255], 0, 0.0055, 'This is my planet. \n I live here. \n Please come to visit us !', 'earth.png', 0, 0.15);
const venus = new Planet('Venus', 90, 35, [150, 55, 255], 4, 0.0075, ' It looks beautifull from distance', 'venus.png', 0, 0.15);
const mars = new Planet('Mars', 170, 25, [255, 55, 55], 0.5, 0.004, 'The red planet', 'mars.png', 0, 0.2)
const jupiter = new Planet('Jupiter', 230, 55, [255, 255, 55], 1.5, 0.0045, 'Jupiter is mainly gas and liquid \n and is the largest planet in the \n Solar System.', 'jupyter.png', 0, -0.12)
const saturn = new Planet('Saturn', 300, 75, [255, 55, 255], 3, 0.003, 'It is a gas giant with\n an average radius of about\n nine times that of Earth.', 'saturn.png', -1.5, 0.1)
// name, distance from the sun, diameter, color, position, velosity, info, image, angle, angle velosity, host

const moon = new Luna('Moon', 20, 7, [125, 125, 125, 150], 0.5, -0.08, 'Misha loves to stare at it \n before he falls asleep', 'moon.png', 0, -0.055, earth)
const phobos = new Luna('Phobos', 16, 2, [55, 55, 55, 150], 0.5, -0.06, 0, 'moon.png', 0, 0.07, mars)
const deimos = new Luna('Deimos', 18, 1, [85, 55, 55, 150], -0.5, 0.05, 0, 'moon.png', 0, 0.04, mars);
const io = new Luna('Io', 25, 4, [85, 85, 35, 150], -0.5, -0.05, 0, 'moon.png', 0, 0.04, jupiter);
const europa = new Luna('Europa', 30, 4, [85, 155, 55, 150], 0, 0.025, 0, 'moon.png', 0, 0.07, jupiter);
const ganymede = new Luna('Ganymede', 35, 5, [75, 55, 55, 150], 0.5, 0.05, 0, 'moon.png', 0, 0.05, jupiter);
const callisto = new Luna('Callisto', 40, 6, [85, 35, 35, 150], -2.5, 0.015, 0, 'moon.png', 0, -0.04, jupiter);


var solar_system = [mercury, earth, venus, mars, sun, jupiter, saturn, moon, phobos, deimos, io, ganymede, callisto, europa]


let sf = 1,
  tx = 200,
  ty = 200;

function preload() {

  for (var planet of solar_system) {
    if (planet.img) {
      planet.img = loadImage(planet.img);
    }
  }

}

function setup() {
  createCanvas(1920, 900);
  tx = width / 2;
  ty = height / 2;
  rate = createSlider(-5, 5, 0.05, 0.05);
  imageMode(CENTER);

}


function draw() {
  background(0);
  fill(255, 200, 0);
  textSize(70);
  text('Solar system in action', width / 2 - 350, 100);
  textSize(20);

  translate(tx, ty);
  scale(sf);

  for (var planet of solar_system) {
    planet.draw_orbit();
    planet.draw();
    planet.move();
    planet.mouseOn(mouseX, mouseY);
  }
}


function applyScale(s) {
  sf = sf * s;
  tx = mouseX * (1 - s) + tx * s;
  ty = mouseY * (1 - s) + ty * s;
}

function mouseDragged() {
  tx += mouseX - pmouseX;
  ty += mouseY - pmouseY;

}

window.addEventListener("wheel", function(e) {
  applyScale(e.deltaY < 0 ? 1.05 : 0.95);
});