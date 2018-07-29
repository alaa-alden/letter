function IntervalTimer(callback, interval) {
  let timerId,
    startTime,
    remaining = 0
  let state = 0 //  0 = idle, 1 = running, 2 = paused, 3= resumed

  this.pause = function () {
    if (state != 1) return

    remaining = interval - (new Date() - startTime)
    window.clearInterval(timerId)
    state = 2
  }

  this.resume = function () {
    if (state != 2) return

    state = 3
    window.setTimeout(this.timeoutCallback, remaining)
  }

  this.timeoutCallback = function () {
    if (state != 3) return

    callback()

    startTime = new Date()
    timerId = window.setInterval(callback, interval)
    state = 1
  }

  startTime = new Date()
  timerId = window.setInterval(callback, interval)
  state = 1
}
// Utility Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomIndex(length) {
  return Math.floor(Math.random() * length)
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
export {
  distance,
  randomIndex,
  randomIntFromRange,
  IntervalTimer
}
