const CONFIG = {
  circleLineWidth: 2,
  circleRadius: 5,
  circleSpeed: 0.3,
  lineSpeed: 2,
  lineLineWidth: 3,
  lineAcceleration: 1.02,
  lineCollectionNum: 10,
  boomSpeed: 10,
  boomAcceleration: 0.95,
  boomAngel: Math.PI * 2,
  boomTargetCount: 100,
  boomGradient: 0.015,
  boomGravity: 0.98,
  boomCollectionNum: 4,
  boomLineWidth: 3,
  boomLineNum: { min: 10, max: 30 },
  animateTimerTarget: 50
}

let canvas = document.querySelector('#fireworks')
let cxt = canvas.getContext('2d')
let cw = (canvas.width = document.documentElement.offsetWidth)
let ch = (canvas.height = document.documentElement.offsetHeight)

function randomColor() {
  // 返回一个 [1, 254] 的数值
  let num = 3
  let colors = []
  while (num--) {
    colors.push(Math.floor(Math.random() * 254 + 1))
  }
  return colors.join(', ')
  // return '0,0,0'
}

class Circle {
  constructor(targetX, targetY) {
    this.targetLocation = { x: targetX, y: targetY }
    this.radius = CONFIG.circleRadius
  }

  draw() {
    cxt.beginPath()
    cxt.arc(
      this.targetLocation.x,
      this.targetLocation.y,
      this.radius,
      0,
      Math.PI * 2
    )
    cxt.lineWidth = CONFIG.circleLineWidth
    cxt.strokeStyle = `rgb(${randomColor()})`
    cxt.stroke()
  }

  update() {
    if (this.radius < CONFIG.circleRadius) {
      this.radius += CONFIG.circleSpeed
    } else {
      this.radius = 1
    }
  }

  init() {
    this.draw()
    this.update()
  }
}

class Line {
  constructor(startX, startY, targetX, targetY) {
    this.startLocation = { x: startX, y: startY }
    this.targetLocation = { x: targetX, y: targetY }
    this.nowLocation = { x: startX, y: startY }
    this.targetDistance = this.getDistance(
      this.startLocation.x,
      this.startLocation.y,
      this.targetLocation.x,
      this.targetLocation.y
    )
    this.angle = Math.atan2(
      this.targetLocation.y - this.startLocation.y,
      this.targetLocation.x - this.startLocation.x
    )
    this.speed = CONFIG.lineSpeed
    this.acceleration = CONFIG.lineAcceleration
    this.collection = new Array(CONFIG.lineCollectionNum)
    this.arrived = false
  }

  draw() {
    cxt.beginPath()
    try {
      cxt.moveTo(this.collection[0][0], this.collection[0][1])
    } catch (error) {
      cxt.moveTo(this.nowLocation.x, this.nowLocation.y)
    }
    cxt.lineWidth = CONFIG.lineLineWidth
    cxt.lineCap = 'round'
    cxt.lineTo(this.nowLocation.x, this.nowLocation.y)
    cxt.strokeStyle = `rgb(${randomColor()})`
    cxt.stroke()
  }

  update() {
    this.collection.shift()
    this.collection.push([this.nowLocation.x, this.nowLocation.y])
    this.speed *= this.acceleration
    let vx = Math.cos(this.angle) * this.speed
    let vy = Math.sin(this.angle) * this.speed
    let nowDistance = this.getDistance(
      this.startLocation.x,
      this.startLocation.y,
      this.nowLocation.x + vx,
      this.nowLocation.y + vy
    )
    if (nowDistance < this.targetDistance) {
      this.nowLocation.x += vx
      this.nowLocation.y += vy
    } else {
      this.arrived = true
    }
  }

  init() {
    this.draw()
    this.update()
  }

  getDistance(x1, y1, x2, y2) {
    let x = x2 - x1
    let y = y2 - y1
    let distance = Math.sqrt(x * x + y * y)
    return distance
  }
}

class Boom {
  constructor(startX, startY) {
    this.startLocation = { x: startX, y: startY }
    this.nowLocation = { x: startX, y: startY }
    this.speed = Math.random() * CONFIG.boomSpeed + 2
    this.angle = Math.random() * CONFIG.boomAngel
    this.acceleration = CONFIG.boomAcceleration
    this.targetCount = CONFIG.boomTargetCount
    this.nowNum = 1
    this.alpha = 1
    this.gradient = CONFIG.boomGradient
    this.gravity = CONFIG.boomGravity
    this.collection = new Array(CONFIG.boomCollectionNum)
    this.arrived = false
  }

  draw() {
    cxt.beginPath()
    try {
      cxt.moveTo(this.collection[0][0], this.collection[0][1])
    } catch (error) {
      cxt.moveTo(this.nowLocation.x, this.nowLocation.y)
    }
    cxt.lineCap = 'round'
    cxt.lineWidth = CONFIG.boomLineWidth
    cxt.lineTo(this.nowLocation.x, this.nowLocation.y)
    cxt.strokeStyle = `rgba(${randomColor()}, ${this.alpha})`
    cxt.stroke()
  }

  update() {
    this.collection.shift()
    this.collection.push([this.nowLocation.x, this.nowLocation.y])
    this.speed *= this.acceleration
    let vx = Math.cos(this.angle) * this.speed
    let vy = Math.sin(this.angle) * this.speed + this.gravity
    if (this.nowNum < this.targetCount) {
      this.nowNum++
    } else {
      this.alpha -= this.gradient
    }
    this.nowLocation.x += vx
    this.nowLocation.y += vy
    if (this.alpha <= 0) {
      this.arrived = true
    }
  }

  init() {
    this.draw()
    this.update()
  }
}

class Animate {
  constructor() {
    this.circles = []
    this.lines = []
    this.booms = []
    this.timerTarget = CONFIG.animateTimerTarget
    this.timerNum = 0
  }

  pushBoom(x, y) {
    for (
      let i =
        Math.random(CONFIG.boomLineNum.max - CONFIG.boomLineNum.min) +
        CONFIG.boomLineNum.min;
      i > 0;
      i--
    ) {
      this.booms.push(new Boom(x, y))
    }
  }

  initAnimate(target, callback) {
    target.forEach((value, index) => {
      value.init()
      if (callback) {
        callback(index)
      }
    })
  }

  run() {
    window.requestAnimationFrame(this.run.bind(this))
    cxt.clearRect(0, 0, cw, ch)
    this.initAnimate(this.lines, index => {
      this.circles[index].init()
      if (this.lines[index].arrived) {
        this.pushBoom(
          this.circles[index].targetLocation.x,
          this.circles[index].targetLocation.y
        )
        this.circles.splice(index, 1)
        this.lines.splice(index, 1)
      }
    })

    this.initAnimate(this.booms, index => {
      if (this.booms[index].arrived) {
        this.booms.splice(index, 1)
      }
    })
    if (this.timerNum >= this.timerTarget) {
      let startX = Math.random() * (cw / 2)
      let startY = ch
      let targetX = Math.random() * cw
      let targetY = Math.random() * (ch / 2)
      let line = new Line(startX, startY, targetX, targetY)
      let circle = new Circle(targetX, targetY)
      this.lines.push(line)
      this.circles.push(circle)
      this.timerNum = 0
    } else {
      this.timerNum++
    }
  }
}

let a = new Animate()
a.run()
