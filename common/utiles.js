class Utiles {
  /**
   * 利用勾股定理计算两点之间的距离
   * @param {number} x1 开始点的横坐标
   * @param {number} y1 开始点的纵坐标
   * @param {number} x2 结束点的横坐标
   * @param {number} y2 结束点的纵坐标
   */
  getDistance(x1, y1, x2, y2) {
    let dx = x1 - x2
    let dy = y1 - y2
    return Math.sqrt(dx * dx + dy * dy)
  }

  random(min, max) {
    return Math.random() * (max - min) + min
  }

  containPoint(rect, x, y) {
    return (
      x > rect.x &&
      x < rect.x + rect.width &&
      y > rect.y &&
      y < rect.y + rect.height
    )

    /*  return !(
      x < rect.x ||
      x > rect.x + rect.width ||
      y < rect.y ||
      y > rect.y + rect.height
    ) */

    /* let xl = x > rect.x && x < rect.x + rect.width
    let yl = y < rect.y && y > rect.y + rect.height

    return xl && yl */
  }
}

window.utiles = new Utiles()
