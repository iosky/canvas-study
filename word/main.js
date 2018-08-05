let maxX = 0
let canvas = document.createElement('canvas')
let cxt = canvas.getContext('2d')
let cw = (canvas.width = window.innerWidth)
let ch = (canvas.height = window.innerHeight)
document.body.appendChild(canvas)
class Word {
  constructor() {
    this.bubbles = []
    this.offsetX = 0
    this.offsetY = 0
  }

  draw(value) {
    this._transform(value)
  }
  /**
   *
   * @param {string} value 需要显示在canvas里面的文字
   */
  _transform(value) {
    let canvas = document.createElement('canvas')
    let fontSize = 100
    let { width, height } = this._getSize(value, fontSize)
    document.body.removeChild(document.querySelector('#container'))
    canvas.width = width
    canvas.height = height
    let cxt = canvas.getContext('2d')
    cxt.fillStyle = 'orange'
    cxt.font = `${fontSize}px sans-serif`
    cxt.fillText(value, 0, height - 30, cw)
    this._getImage(canvas, cxt).then(() => {
      this.offsetX = (cw - maxX) / 2
      this.bubbles.forEach(item => {
        item.setOffset(this.offsetX, this.offsetY)
        item.init()
      })
    })
  }

  _getImage(canvas, cxt) {
    let self = this
    return new Promise(function(resolve, reject) {
      let url = canvas.toDataURL('image/jpeg')
      let img = new Image()
      img.src = url
      img.onload = () => {
        cxt.clearRect(0, 0, canvas.width, canvas.height)
        cxt.drawImage(img, 0, 0, img.width, img.height)
        let imgData = cxt.getImageData(0, 0, img.width, img.height)
        let diff = 6
        for (let i = 0, h = canvas.height; i < h; i += diff) {
          for (let j = 0, w = canvas.width; j < w; j += diff) {
            let colors = 0
            for (let k = 0; k < diff * diff; k++) {
              let row = ~~(k / diff)
              let col = k % diff
              let elPos = ((i + row) * canvas.width + j + col) * 4
              let r = imgData.data[elPos]
              let g = imgData.data[elPos + 1]
              let b = imgData.data[elPos + 2]
              if (r < 10 && g < 10 && b < 10) {
                colors++
              }
            }
            if (colors < (diff * diff * 2) / 3) {
              if (2 * j > maxX) {
                maxX = 2 * j
              }
              let newBubble = new Bubble(j * 2, i * 2, 6, '#fff')
              self.bubbles.push(newBubble)
            }
          }
        }
        resolve()
      }
    })
  }

  _getSize(value, fontSize) {
    let container = document.createElement('div')
    container.id = 'container'
    container.style.display = 'inline-block'
    container.innerText = value
    container.style.fontSize = `${fontSize}px`
    document.body.appendChild(container)
    this.offsetX = (cw - container.offsetWidth) / 2
    this.offsetY = (ch - container.offsetHeight - fontSize * 2) / 2
    return { width: container.offsetWidth, height: container.offsetHeight }
  }
}

class Bubble {
  constructor(x, y, radius, color) {
    this.pos = { x, y }
    this.radius = radius
    this.color = color
  }

  draw() {
    cxt.beginPath()
    cxt.fillStyle = this.color
    cxt.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
    cxt.fill()
  }

  init() {
    this.draw()
  }

  setOffset(x, y) {
    this.pos.x += x
    this.pos.y += y
  }
}

let texts = ['HELLO CODER']
let words = []
texts.forEach(value => {
  let word = new Word()
  words.push(word)
  word.draw(value)
})

// TODO: 下一步计划： 增加动画效果
