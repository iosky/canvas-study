class Shape {
  constructor({ value, x, y, size }) {
    this.value = value
    this.startX = x
    this.startY = y
    this.size = size
    this.data = []
  }

  getData() {
    cxt.textAlign = 'center'
    cxt.font = `${this.size}px sans-serif`
    cxt.fillText(this.value, this.startX, this.startY)

    let imgData = cxt.getImageData(0, 0, cw, ch)
    let buffer32 = new Uint32Array(imgData.data.buffer)
    for (let i = 0; i < ch; i += gridY) {
      for (let j = 0; j < cw; j += gridX) {
        if (buffer32[i * cw + j]) {
          let particle = new Particle({
            x: j,
            y: i
          })
          this.data.push(particle)
        }
      }
    }
    cxt.clearRect(0, 0, cw, ch)
  }
}
