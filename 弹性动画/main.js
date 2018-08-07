let canvas = document.querySelector('#demo'),
  cxt = canvas.getContext('2d'),
  cw = (canvas.width = window.innerWidth),
  ch = (canvas.height = window.innerHeight),
  ballNum = 3,
  balls = [],
  targetBall = new Ball(30),
  spring = 0.03,
  friction = 0.9,
  handle = null,
  animate = null,
  olderX = (olderY = 0)
targetBall.x = cw / 2
targetBall.h = ch / 2

while (ballNum--) {
  let ball = new Ball(10)
  ball.x = utiles.random(0, cw)
  ball.y = utiles.random(0, ch)
  balls.push(ball)
}

balls.forEach(ball => {
  ball.radius = 20
})

window.addEventListener('mousedown', e => {
  balls.forEach(b => {
    if (utiles.containPoint(b.getBound(), e.pageX, e.pageY)) {
      handle = b
    }
  })
})

window.addEventListener('mousemove', e => {
  if (handle) {
    handle.x = e.pageX
    handle.y = e.pageY
  }
})

window.addEventListener('mouseup', e => {
  handle = null
})

run()

function update(ball) {
  let dx = ball.x - targetBall.x
  let dy = ball.y - targetBall.y

  targetBall.vx += dx * spring
  targetBall.vy += dy * spring
}

function draw(ball) {
  cxt.save()

  cxt.strokeStyle = '#000'
  cxt.lineWidth = 2

  cxt.beginPath()
  cxt.moveTo(ball.x, ball.y)
  cxt.lineTo(targetBall.x, targetBall.y)
  cxt.closePath()

  cxt.stroke()
  ball.draw(cxt)
}

function run() {
  animate = window.requestAnimationFrame(run)
  cxt.clearRect(0, 0, cw, ch)
  balls.forEach(update)

  olderX = targetBall.x
  olderY = targetBall.y

  targetBall.vx *= friction
  targetBall.vy *= friction

  targetBall.x += targetBall.vx
  targetBall.y += targetBall.vy

  cxt.beginPath()
  balls.forEach(draw)
  cxt.closePath()

  targetBall.draw()

  // if (Math.abs(targetBall.vx) < 0.01 && Math.abs(targetBall.vy) < 0.01) {
  //   window.cancelAnimationFrame(animate)
  //   animate = null
  // }
}
