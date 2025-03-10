# Grid Movement Plugin for Phaser 3

![](images/movement.gif)

## Usage

### Install package (npm):

Install the dependency:

```
npm i --save phaser-grid-movement-plugin
```

And import it to your code:

```javascript
import * as GridMovementPlugin from "phaser-grid-movement-plugin";
```

### Install package (web):

You can also download the `GridMovementPlugin.min.js` from the `dist` folder and import it via:

```html
<script src="GridMovementPlugin.min.js"></script>
```

In your GameConfig add:

```javascript
const gameConfig = {

  ...

  plugins: {
    scene: [
      {
        key: "gridMovementPlugin",
        plugin: GridMovementPlugin,
        mapping: "gridMovementPlugin",
      },
    ],
  },

  ...

};

const game = new Phaser.Game(gameConfig);
```

In your Scenes create method add:

```javascript
function create () {

  ...

  const gridMovementConfig = {
    characters: [{
      id: "player",
      sprite: playerSprite,
      characterIndex: 6,
    }],
    firstLayerAboveChar: 3,
  };

  this.gridMovementPlugin.create(tilemap, gridMovementConfig);

  ...

}
```

That's all you need for a minimum configuration. See the examples folder for a complete example.

## API

### Config

- `characters: CharacterData[]`
  An array of character data. Each describing a character on the map.

- `firstLayerAboveChar: number`
  In your tilemap, the index of the first layer that should be rendered on top of all the character layers.

### CharacterData

- `id: string`

  A unique identifier for the character on the map. If you provice two characters with the same id, the last one will override the previous one.

- `sprite: Phaser.GameObjects.Sprite`

  The characters sprite.

- `characterIndex: number`

  The 0-based index of the character on the spritesheet.

- `speed: TileSizePerSecond` (optional, default: 4)

  The speed of a player in tiles per second.

- `startPosition: Phaser.Math.Vector2` (optional, default: (0,0))

  Start tile position of the player.

### Methods

- `create(tilemap: Phaser.Tilemaps.Tilemap, config: GridMovementConfig): void`

  Initializes the plugin.

- `getPosition(charId: string): Phaser.Math.Vector2`

  Returns the tile position of the character with the given id.

- `moveLeft(charId: string): Phaser.Math.Vector2`

  Initiates movement of the character with the given id. If the character is already moving nothing happens. If the movement direction is currently blocked, the character will only turn towards that direction. Movement commands are **not** queued.

- `moveRight(charId: string): Phaser.Math.Vector2`

- `moveUp(charId: string): Phaser.Math.Vector2`

- `moveDown(charId: string): Phaser.Math.Vector2`

- `setSpeed(charId: string, speed: number): void`

  Sets the speed in tiles per second for a character.

- `moveRandomly(charId: string, delay?: number = 0, radius?: number = -1): void`

  Initiates random movement of the character with the given id. The character will randomly pick one of the non-blocking directions. Optionally a `delay` in milliseconds can be provided. This represents the waiting time after a finished movement, before the next is being initiated. If a `radius` other than `-1` is provided, the character will not move further than that radius from its initial position (the position it has been, when `moveRandomly` was called). The distance is calculated with the [manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry). Additionally, if a radius other than `-1` was given, the character might move more than one tile into a random direction in one run (as long as the route is neither blocked nor outside of the radius).

- `stopMovingRandomly(charId: string): void`

  Stops moving a character randomly.
