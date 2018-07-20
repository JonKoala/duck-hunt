
var handler = {

  get availableEvents() {
    return ['move', 'shoot'];
  },

  _start() {
    this.events = {};
    this.availableEvents.forEach(eventName => {
      this.events[eventName] = [];
    });

    document.addEventListener('keydown', handler.onKeydown.bind(handler));
  },

  _dispatchEvent(eventName, obj) {
    this.events[eventName].forEach(callback => {
      setTimeout(callback.bind(this, obj), 0);
    });
  },

  addEventListener(eventName, callback) {
    if (eventName in this.events)
      this.events[eventName].push(callback);
  },

  onKeydown(e) {
    if (e.key === 'ArrowRight')
      this._dispatchEvent('move', {direction: 1});
    if (e.key === 'ArrowLeft')
      this._dispatchEvent('move', {direction: -1});
    if (e.key === ' ')
      this._dispatchEvent('shoot');
  }
}

handler._start();

export default handler
