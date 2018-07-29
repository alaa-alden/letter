function IntervalTimer(callback, interval) {
  let timerId
  let state = 0
  //  0 = idle, 1 = running, 2 = paused, 3= resumed

  this.pause = function () {
    if (state !== 1) return
    window.clearInterval(timerId)
    state = 2
  }

  this.resume = function () {
    if (state !== 2) return
    state = 3
    window.setTimeout(this.timeoutCallback, interval)
  }

  this.timeoutCallback = function () {
    if (state !== 3) return
    callback()
    timerId = window.setInterval(callback, interval)
    state = 1
  }
  this.changeInterval = function (NewInterval) {
    interval = NewInterval
    window.clearInterval(timerId)
    window.setInterval(callback, interval)
  }
  timerId = window.setInterval(callback, interval)
  state = 1
}
export default IntervalTimer
