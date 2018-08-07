let canvas = document.querySelector('#demo'),
  cxt = canvas.getContext('2d'),
  cw = (canvas.width = window.innerWidth),
  ch = (canvas.height = window.innerHeight),
  ball = new Ball(30),
  line = new Line(0, 0, 600, 0),
  bounce = -0.7,
  gravity = 0.5
ball.x = cw / 4 + ball.radius * 2
ball.y = 100
line.x0 = cw / 4
line.y0 = 300
line.angle = (30 * Math.PI) / 180

animate()

function animate() {
  window.requestAnimationFrame(animate)
  cxt.clearRect(0, 0, cw, ch)

  let cos = Math.cos(line.angle),
    sin = Math.sin(line.angle),
    bound = line.getBound()
  ball.vy += gravity

  ball.x += ball.vx
  ball.y += ball.vy

  if (
    ball.x + ball.radius > bound.x &&
    ball.x - ball.radius < bound.x + bound.width
  ) {
    let dx = ball.x - line.x0,
      dy = ball.y - line.y0

    let dyr = cos * dy - sin * dx
    let vyr = cos * ball.vy - sin * ball.vx

    if (dyr > -ball.radius && dyr < vyr) {
      let dxr = cos * dx + sin * dy
      let vxr = cos * ball.vx + sin * ball.vy

      dyr = -ball.radius
      vyr *= bounce
      // 旋转回去
      dx = cos * dxr - sin * dyr
      dy = sin * dxr + cos * dyr

      ball.vx = cos * vxr - sin * vyr
      ball.vy = sin * vxr + cos * vyr

      ball.x = line.x0 + dx
      ball.y = line.y0 + dy
    }
  }
  // 边界判断
  if (ball.x < ball.radius) {
    ball.x = ball.radius
    ball.vx *= bounce
  } else if (ball.x + ball.radius > cw) {
    ball.x = cw - ball.radius
    ball.vx *= bounce
  }
  if (ball.y < ball.radius) {
    ball.y = ball.radius
    ball.vy *= bounce
  } else if (ball.y + ball.radius > ch) {
    ball.y = ch - ball.radius
    ball.vy *= bounce
  }

  ball.draw()
  line.draw()
}
