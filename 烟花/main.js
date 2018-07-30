const CONFIG = {
  circleLineWidth: 2,
  circleRadius: 5,
  circleSpeed: 0.3,
  lineSpeed: 2,
  lineLineWidth: 3,
  lineAcceleration: 1.02,
  lineCollectionNum: 10
}

let canvas = document.querySelector('#fireworks')
let cxt = canvas.getContext('2d')
let cw = (canvas.width = window.innerWidth)
let ch = (canvas.height = window.innerHeight)

function randomColor() {
  // 返回一个 [1, 254] 的数值
  let num = 3
  let colors = []
  while (num--) {
    colors.push(Math.floor(Math.random() * 254 + 1))
  }
  return colors.join(', ')
}

class Circle {
  constructor(targetX, targetY) {
    this.tragetLocation = { x: targetX, y: targetY }
    this.radius = CONFIG.circleRadius
  }

  draw() {
    cxt.beginPath()
    cxt.arc(
      this.tragetLocation.x,
      this.tragetLocation.y,
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

class line {
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
      this.targetLocation.x - this.startLocation.x,
      this.targetLocation.y - this.startLocation.y
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
      cxt.moveTo(this.startLocation.x, this.startLocation.y)
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
    let x = x1 - x2
    let y = y1 - y2
    let distance = Math.sqrt(x ** 2, y ** 2)
    return distance
  }
}
