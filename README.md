# duck-hunt

A duck hunt game to play on your url

# Demo

You can play it [here](https://jonkoala.github.io/demos/duck-hunt/)

Use your arrow keys to aim and spacebar to shoot!

## Installation

Using npm:

```bash
$ npm install duck-hunt
```

Using jsDelivr CND:

```html
<script src="https://cdn.jsdelivr.net/npm/duck-hunt/dist/duck-hunt.min.js"></script>
```

## Usage

Basic usage:

```js
import DuckHunt from 'duck-hunt'

const game = new DuckHunt()
game.start()
```

You can also configure some game parameters when creating the instance
```js
const game = new DuckHunt({
  mapLength: 100,
  numDucks: 5,
  duckRespawnTurns: 100
})
```

## License
[MIT](LICENSE)