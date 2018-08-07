class Line {
  constructor(x, y, tx, ty) {
    this.x = x
    this.y = y
    this.tx = tx
    this.ty = ty
    this.x0 = 0
    this.y0 = 0
    this.lineWidth = 2
    this.lineCap = 'butt' // butt round square
    this.color = 'rgba(0,0,0,0.8)'
    this.angle = 0
  }

  draw() {
    cxt.save()
    cxt.translate(this.x0, this.y0)
    cxt.rotate(this.angle)
    cxt.strokeStyle = this.color
    cxt.lineWidth = this.lineWidth
    cxt.lineCap = this.lineCap
    cxt.beginPath()
    cxt.moveTo(this.x, this.y)
    cxt.lineTo(this.tx, this.ty)
    cxt.closePath()
    cxt.stroke()
    cxt.restore()
  }

  getBound() {
    if (!this.angle) {
      let minX = Math.min(this.x, this.tx)
      let minY = Math.min(this.y, this.ty)
      let maxX = Math.max(this.x, this.ty)
      let maxY = Math.max(this.y, this.ty)
      return {
        x: this.x0 + minX,
        y: this.y0 + minY,
        width: maxX - minX,
        height: maxY - minY
      }
    } else {
      // 角度存在表示需要通过旋转角度获取真实的坐标值
      // 根据圆的参数方程 x = Rcos y = Rsin
      // 可得 oldx = Rcosm oldy = Rsinm  m表示该点在圆上所处角度
      // newx = Rcos(angle + m) newy = Rsin(angle + m) angle表示旋转的角度
      // 展开三角函数得
      // newx  = Rcos(angle)cosm - Rsin(angle)sinm
      // newy = Rsin(angle)cosm + Rcos(angle)sinm
      let cos = Math.cos(this.angle)
      let sin = Math.sin(this.angle)
      let xr = cos * this.x - sin * this.y
      let yr = sin * this.x + cos * this.y
      let txr = cos * this.tx - sin * this.ty
      let tyr = sin * this.tx + cos * this.ty
      console.log(xr, yr, txr, tyr)

      return {
        x: this.x0 + Math.min(xr, txr),
        y: this.y0 + Math.max(yr, tyr),
        width: Math.max(xr, txr) - Math.min(xr, txr),
        height: Math.max(yr, tyr) - Math.min(yr, tyr)
      }
    }
  }
}
