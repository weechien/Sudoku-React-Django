// Timer to record time taken to solve the game
const Timer = (() => {
  let clock = 0
  let offset = 0
  let interval = null

  // Constructor function
  return function(time) {
    this.time = time

    const start = () => {
      if (!interval) {
        offset = Date.now()
        if (!clock) {
          const [min, sec] = this.time.split(':')
          const msMin = parseInt(min) * 60000
          const msSec = parseInt(sec) * 1000
          offset -= msMin + msSec
        }
        interval = setInterval(update, 1000)
      }
    }
    const stop = () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }
    const reset = () => {
      stop()
      clock = 0
      offset = 0
      this.time = '00:00'
    }
    const update = () => {
      const now = Date.now()
      clock += now - offset
      offset = now
      render()
    }
    const render = () => {
      const minutes = Math.floor(clock / 60000)
      const seconds = Math.floor(clock / 1000 - minutes * 60)
      this.time = minutes < 10 ? '0' + minutes : '' + minutes
      this.time += seconds < 10 ? ':0' + seconds : ':' + seconds
    }
    this.start = start
    this.stop = stop
    this.reset = reset
  }
})()

export default Timer
