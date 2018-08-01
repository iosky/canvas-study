let canvas = document.querySelector('#container')
let cxt = canvas.getContext('2d')
let cw = (canvas.width = window.innerWidth)
let ch = (canvas.height = window.innerHeight)
let colors = [
  ['#6ca0f6', '#367aec'],
  ['#52D681', '#00ad7c'],
  ['#FF847C', '#E84A5F']
]

let blue = document.querySelectorAll('.blue')[0]
let green = document.querySelectorAll('.green')[0]
let purple = document.querySelectorAll('.purple')[0]

const NUM = 300

class Dot {
  constructor(x, y, baseY) {
    this.x = x
    this.y = y
    this.baseY = baseY
    this.targetY = 0
    this.vy = 0
    this.friction = 0.15
    this.deceleration = 0.95
    this.animate = null
  }

  updateY(diffValue) {
    this.targetY = diffValue + this.baseY
    this.vy += this.targetY - this.y
    this.vy *= this.deceleration
    this.y += this.vy * this.friction
  }
}

class Water {
  constructor() {
    this.dots = []
    this.diffValues = []
    this.autoDiff = 1000
    this.dd = 15
    this.vPos = 150
    this.color = 0
    this.init()
    this.mouseListener()
    this.wheelListener()
  }

  setColor(color) {
    this.color = color
  }

  init() {
    let length = NUM
    for (let i = 0; i < length; i++) {
      let dot = new Dot((cw / (NUM - 1)) * i, ch / 2, ch / 2)
      this.dots.push(dot)
      this.diffValues.push(0)
    }
  }

  draw() {
    cxt.save()
    cxt.fillStyle = colors[this.color][0]
    cxt.beginPath()
    cxt.moveTo(0, ch)
    let length = this.dots.length
    for (let i = 0; i < length; i++) {
      cxt.lineTo(this.dots[i].x, this.dots[i].y)
    }
    cxt.lineTo(cw, ch / 2)
    cxt.lineTo(cw, ch)
    cxt.lineTo(0, ch)
    cxt.fill()
    cxt.restore()

    cxt.save()
    cxt.fillStyle = colors[this.color][1]
    cxt.beginPath()
    cxt.moveTo(0, ch)
    for (let i = 0; i < length; i++) {
      cxt.lineTo(this.dots[i].x, this.dots[i].y + 5)
    }
    cxt.lineTo(cw, ch / 2)
    cxt.lineTo(cw, ch)
    cxt.lineTo(0, ch)
    cxt.fill()
    cxt.fillStyle = '#fff'
    cxt.font = '12px sans-serif'
    cxt.textBaseline = 'middle'
    cxt.fillText(
      `滚轮改变液体粘稠度 / Viscosity    ${(((this.dd - 15) * 20) / 7).toFixed(
        2
      )} %`,
      20,
      ch - 20
    )
    cxt.restore()
  }

  update() {
    this.autoDiff -= this.autoDiff * 0.9
    this.diffValues[this.vPos] = this.autoDiff
    for (let i = this.vPos - 1; i > 0; i--) {
      let d = this.vPos - i
      if (d > this.dd) {
        d = this.dd
      }
      this.diffValues[i] -=
        (this.diffValues[i] - this.diffValues[i + 1]) * (1 - 0.01 * d)
    }

    for (let i = this.vPos + 1; i < NUM; i++) {
      let d = i - this.vPos
      if (d > this.dd) {
        d = this.dd
      }
      this.diffValues[i] -=
        (this.diffValues[i] - this.diffValues[i - 1]) * (1 - 0.01 * d)
    }
    for (let index = 0; index < this.dots.length; index++) {
      this.dots[index].updateY(this.diffValues[index])
    }
  }

  run() {
    // if (this.animate) {
    //   return
    // }
    this._run()
  }
  _run() {
    this.animate = window.requestAnimationFrame(this._run.bind(this))
    cxt.clearRect(0, 0, cw, ch)
    this.update()
    this.draw()
    if (this.diffValues[this.vPos] === 0) {
      window.cancelAnimationFrame(this.animate)
      this.animate = null
    }
  }

  mouseListener() {
    canvas.onmousedown = e => {
      let mouse = { x: e.pageX, y: e.pageY }
      if (mouse.y > ch / 2 - 50 && mouse.y < ch / 2 + 50) {
        this.autoDiff = 1000
        this.vPos = Math.floor(((NUM - 2) * mouse.x) / cw) + 1
        this.diffValues[this.vPos] = this.autoDiff
      }
      if (!this.animate) {
        this._run()
      }
    }
  }

  wheelListener() {
    window.onmousewheel = e => {
      let s = e.wheelDelta
      if (s > 0) {
        this.dd > 15 ? this.dd-- : (this.dd = this.dd)
      } else {
        this.dd < 50 ? this.dd++ : (this.dd = this.dd)
      }
    }
  }
}

let w = new Water()

w.run()

blue.onclick = e => {
  w.setColor(0)
}

green.onclick = e => {
  w.setColor(1)
}

purple.onclick = e => {
  w.setColor(2)
}
