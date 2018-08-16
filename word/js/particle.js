class Particle {
  constructor({ x, y }) {
    this.x = utiles.random(10, cw)
    this.y = utiles.random(10, ch)
    this.tx = x
    this.ty = y
    this.radius = Math.random() * 4 + 2
    this.friction = 0.99
    this.gravity = 0
    this.deceleration = 0.18

    this.vx = 0
    this.vy = 0

    this.flag = false
    this.destory = false

    this.color = `rgba(255,255,255,${Math.random() + 0.1})`
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx, this.vy * this.vy)
  }

  setSpeed(speed) {
    let angle = this.getAngle()
    this.vx = Math.cos((angle * 180) / Math.PI) * speed
    this.vy = Math.sin((angle * 180) / Math.PI) * speed
  }

  getAngle() {
    return Math.atan2(this.vy, this.vx)
  }

  setAngle(angle) {
    let speed = this.getSpeed()
    this.vx = Math.cos((angle * 180) / Math.PI) * speed
    this.vy = Math.sin((angle * 180) / Math.PI) * speed
  }

  draw() {
    cxt.save()
    cxt.fillStyle = this.color
    cxt.beginPath()
    cxt.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    cxt.closePath()
    cxt.fill()
    cxt.restore()
  }

  update() {

      let dx = this.tx - this.x
      let dy = this.ty - this.y

      this.vx = dx * this.deceleration
      this.vy = dy * this.deceleration


    this.x += this.vx
    this.y += this.vy

    this.vx *= this.x > cw || this.x < 0 ? -1 : 1
    this.vy *= this.y > ch || this.y < 0 ? -1 : 1

    if (this.radius < 8 && this.flag === false) {
      this.radius += Math.random() * 0.2
    } else {
      this.flag = true
    }

    if (this.flag) {
      this.radius -= Math.random() * 0.2
    }

    if (!this.destory && this.radius < 1) {
      this.radius = Math.random() * 4 + 2
      this.flag = false
    }

    //this.setSpeed(speed)
    //this.setAngle(Math.random() * 2 * Math.PI)
  }
  run() {
    this.draw()
    this.update()
  }
}
