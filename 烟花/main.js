const CONFIG = {
  circleLineWidth: 2,
  circleRadius: 5,
  circleSpeed: 0.3
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
