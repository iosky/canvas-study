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

let target = null
word.getData()

animate()

setTimeout(() => {
  word.data.forEach(item => {
    item.tx = utiles.random(0, cw)
    item.ty = utiles.random(0, ch)
    item.destory = true
  })
}, 1500)

function animate() {
  target = requestAnimationFrame(animate)
  cxt.clearRect(0, 0, cw, ch)
  word.data.forEach((item, index) => {
    item.run()
    if (item.destory && item.radius < 1) {
      word.data.splice(index, 1)
    }
  })
  if (!word.data.length) {
    cancelAnimationFrame(target)
  }
}
