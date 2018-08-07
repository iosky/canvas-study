# canvas-study

学习 canvas 写的 demo
通过在网上学习如何使用 canvas，同时也将学习过程中看到的实例代码，理解代码的前提下，使用 es6 的语法来进行代码的重构，同时增加自己对该 demo 的一些理解，
加入个人看法，进行 demo 的优化，以及改变

##弹性动画
要点在于，根据目标点和当前位置的相对距离，确定物体移动的加速度

```js
let dx = target.x - now.x
let dy = target.y - now.y

now.vx += dx * spring
now.vy += dy * spring

now.x += now.vx
now.y += now.vy

now.vx *= friction
now.vy *= friction
```

##角度反弹
通过圆周运动的参数方程来实现坐标的旋转，把斜面旋转为水平面，水平面上的角度反弹，较为简单
角度存在表示需要通过旋转角度获取真实的坐标值
根据圆的参数方程 x = Rcos y = Rsin
可得 oldx = Rcos(old)
oldy = Rsin(old)
old 表示在(oldx, oldy)这个点在圆上所处角度
newx = Rcos(angle + old)
newy = Rsin(angle + old)
angle 表示旋转的角度
展开三角函数得
newx = Rcos(angle)cos(old) - Rsin(angle)sin(old)
newy = Rsin(angle)cos(old) + Rcos(angle)sin(old)
即 newx = Rcos(angle)oldx - Rsin(angle)oldy
newy = Rsin(angle)oldx + Rcos(angle)oldy
