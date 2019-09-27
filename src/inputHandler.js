
export default class {

  constructor () {
    this.events = { move: [], shoot: [] }

    document.addEventListener('keydown', this.onKeydown.bind(this))
  }

  _dispatchEvent (eventName, obj) {
    this.events[eventName].forEach(callback => {
      setTimeout(callback.bind(this, obj), 0)
    })
  }

  addEventListener (eventName, callback) {
    if (eventName in this.events)
      this.events[eventName].push(callback)
  }

  onKeydown (e) {
    if (e.key === 'ArrowRight')
      this._dispatchEvent('move', { direction: 1 })
    if (e.key === 'ArrowLeft')
      this._dispatchEvent('move', { direction: -1 })
    if (e.key === ' ')
      this._dispatchEvent('shoot')
  }

}
