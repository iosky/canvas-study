class Ball {
  constructor(radius) {
    this.x = 0
    this.y = 0
    this.tx = 0
    this.ty = 0
    this.radius = radius
    this.color = '#ff5722'
    this.lineWidth = 1
    this.rotation = 0
    this.scale = {
      x: 1,
      y: 1
    }
    this.vx = 0
    this.vy = 0
  }

  draw() {
    cxt.save()

    cxt.lineWidth = this.lineWidth
    cxt.translate(this.x, this.y)
    cxt.rotate(this.rotation)
    cxt.scale(this.scale.x, this.scale.y)
    cxt.fillStyle = this.color

    cxt.beginPath()
    cxt.arc(0, 0, this.radius, 0, Math.PI * 2)
    cxt.closePath()

    cxt.fill()

    cxt.restore()
  }

  getBound() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    }
  }
}
