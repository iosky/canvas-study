let canvas = document.querySelector('#container')
let cxt = canvas.getContext('2d')
let cw = (canvas.width = document.documentElement.clientWidth)
let ch = (canvas.height = document.documentElement.clientHeight)

const CONFIG = {
  minDistance: 9000, // 最小极限距离的平方值
  dotStyle: 'rgba(110, 100, 100, 0.8)',
  dotNum: 100,
  dotMaxSpeed: 1,
  dotMinSpeed: -1
}

function random(min, max) {
  return Math.random() * (max - min) + min
}

function getDistance(x1, y1, x2, y2) {
  let x = x2 - x1
  let y = y2 - y1
  let distance = x * x + y * y
  return distance
}

class Dot {
  constructor(x, y, xa, ya) {
    this.x = x || random(0, cw)
    this.y = y || random(0, ch)
    this.xa = random(CONFIG.dotMinSpeed, CONFIG.dotMaxSpeed)
    this.ya = random(CONFIG.dotMinSpeed, CONFIG.dotMaxSpeed)
  }

  setSpeed(x, y) {
    this.xa = x
    this.ya = y
  }

  draw() {
    cxt.beginPath()
    cxt.arc(this.x, this.y, 1, 0, Math.PI * 2)
    cxt.fillStyle = CONFIG.dotStyle
    cxt.fill()
  }

  update() {
    this.x += this.xa
    this.y += this.ya
    // 边界判断
    this.xa *= this.x > cw || this.x < 0 ? -1 : 1
    this.ya *= this.y > ch || this.y < 0 ? -1 : 1
  }

  init() {
    this.draw()
    this.update()
  }
}

class Line {
  constructor(sx, sy, tx, ty) {
    this.sx = sx
    this.sy = sy
    this.tx = tx
    this.ty = ty
    this.distance = getDistance(sx, sy, tx, ty)
    this.relativeValue =
      (CONFIG.minDistance - this.distance) / CONFIG.minDistance
    this.lineAlpha = this.relativeValue + 0.2
    this.lineWidth = this.relativeValue / 2
  }

  draw() {
    cxt.beginPath()
    cxt.lineWidth = this.lineWidth
    cxt.strokeStyle = `rgba(110, 110, 110, ${this.lineAlpha})`
    cxt.moveTo(this.sx, this.sy)
    cxt.lineTo(this.tx, this.ty)
    cxt.stroke()
  }

  update() {
    this.relativeValue =
      (CONFIG.minDistance - this.distance) / CONFIG.minDistance
    this.lineAlpha = this.relativeValue + 0.2
    this.lineWidth = this.relativeValue / 2
  }

  init() {
    this.draw()
    this.update()
  }
}
class Animate {
  constructor() {
    this.dots = []
    this.animateTarget = CONFIG.animateTarget
    this.nowTimer = 0
    this.mx = null
    this.my = null
    this.mouseListener()
    this.createDots()
  }

  createDots() {
    let num = CONFIG.dotNum
    while (num--) {
      let dot = new Dot()
      this.dots.push(dot)
    }
  }

  mouseListener() {
    canvas.onmousemove = e => {
      this.mx = e.clientX
      this.my = e.clientY
      let dot = new Dot(this.mx, this.my)
      dot.setSpeed(0, 0)
      this.dots.splice(0, 1, dot)
    }

    canvas.onmouseleave = e => {
      this.mx = null
      this.my = null
      this.dots.shift()
    }
  }
  run() {
    window.requestAnimationFrame(this.run.bind(this))
    cxt.clearRect(0, 0, cw, ch)
    // this.dots.push(new Dot(this.mx, this.my))
    this.dots.forEach((dot, index) => {
      dot.init()
      // 判断距离是否小于最小连线距离
      let length = this.dots.length
      for (let i = index + 1; i < length; i++) {
        let otherDot = this.dots[i]
        let distance = getDistance(dot.x, dot.y, otherDot.x, otherDot.y)
        if (distance < CONFIG.minDistance) {
          if (index === 0) {
            // 说明这是鼠标生成的一个点
            distance >= CONFIG.minDistance / 2 &&
              ((otherDot.x += 0.03 * (dot.x - otherDot.x)),
              (otherDot.y += 0.03 * (dot.y - otherDot.y)))
          }
          let line = new Line(dot.x, dot.y, otherDot.x, otherDot.y)
          line.init()
        }
      }
    })
  }
}

let animate = new Animate()
animate.run()
