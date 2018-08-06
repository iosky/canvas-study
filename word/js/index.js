let canvas = document.querySelector('#canvas'),
  cxt = canvas.getContext('2d'),
  cw = (canvas.width = window.innerWidth),
  ch = (canvas.height = window.innerHeight),
  gridX = 4,
  gridY = 4,
  speed = 0

let word = new Shape({
  value: 'HELLO CODER',
  x: cw / 2,
  y: ch / 2,
  size: 100
})

let animateTarget = null
word.getData()

animate()

setTimeout(() => {
  speed = 10
}, 500)

function animate() {
  animateTarget = window.requestAnimationFrame(animate)
  cxt.clearRect(0, 0, cw, ch)
  word.data.forEach((item, index) => {
    item.run()
    if (
      item.x - item.radius > cw ||
      item.x + item.radius < 0 ||
      (item.y - item.radius > ch || item.y + item.radius < 0)
    ) {
      word.data.splice(index, 1)
    }
  })
  if (!word.data.length) {
    window.cancelAnimationFrame(animateTarget)
  }
}
