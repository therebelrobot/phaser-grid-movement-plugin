import * as Phaser from "phaser";
import { GridCharacter } from "../GridCharacter/GridCharacter";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridTilemap {
  private static readonly MAX_PLAYER_LAYERS = 1000;
  static readonly FIRST_PLAYER_LAYER = 1000;
  private characters = new Map<string, GridCharacter>();
  constructor(
    private tilemap: Phaser.Tilemaps.Tilemap,
    private firstLayerAboveChar: number
  ) {
    this.setLayerDepths();
  }

  addCharacter(character: GridCharacter) {
    this.characters.set(character.getId(), character);
  }

  getCharacters(): GridCharacter[] {
    return [...this.characters.values()];
  }

  hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true;
    return this.tilemap.layers.some((layer) => {
      const tile = this.tilemap.getTileAt(pos.x, pos.y, false, layer.name);
      return tile?.properties?.collides;
    });
  }

  hasNoTile(pos: Vector2): boolean {
    return !this.tilemap.layers.some((layer) =>
      this.tilemap.hasTileAt(pos.x, pos.y, layer.name)
    );
  }

  hasBlockingChar(pos: Vector2): boolean {
    return [...this.characters.values()].some((char) =>
      char.getTilePos().equals(pos)
    );
  }

  private setLayerDepths() {
    this.tilemap.layers.forEach((layer, index) => {
      if (index >= this.firstLayerAboveChar) {
        layer.tilemapLayer.setDepth(
          GridTilemap.FIRST_PLAYER_LAYER + GridTilemap.MAX_PLAYER_LAYERS + index
        );
      } else {
        layer.tilemapLayer.setDepth(index);
      }
    });
  }
}
