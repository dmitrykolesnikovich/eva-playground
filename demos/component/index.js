import {
  Game,
  GameObject,
  resource,
  RESOURCE_TYPE,
  Component,
} from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import {Img, ImgSystem} from '@eva/plugin-renderer-img'

class Move extends Component {
  static componentName = 'Move';
  speed = {
    // 移动速度
    x: 100,
    y: 200,
  };
  init(obj) {
    Object.assign(this, obj);
  }
  update(e) {
    // 每秒 N 像素
    // console.log(e)
    const position = this.gameObject.transform.position;
    this.gameObject.transform.position.x += this.speed.x * (e.deltaTime / 1000);
    this.gameObject.transform.position.y += this.speed.y * (e.deltaTime / 1000);
    if (position.x >= 750 || position.x <= 0) {
      this.speed.x = -this.speed.x;
    }
    if (position.y >= 1000 || position.y <= 0) {
      this.speed.y = -this.speed.y;
    }
  }
  onPause() {
    this.oldSpeed = this.speed;
    this.speed = {
      x: 0,
      y: 0,
    };
  }
  onResume() {
    this.speed = this.oldSpeed;
  }
}
resource.addResource([
  {
    name: 'heart',
    type: RESOURCE_TYPE.IMAGE,
    src: {
      image: {
        type: 'png',
        url:
          '//gw.alicdn.com/bao/uploaded/TB1lVHuaET1gK0jSZFhXXaAtVXa-200-200.png',
      },
    },
    preload: false,
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new ImgSystem()
  ],
});

const image = new GameObject('image', {
  size: { width: 200, height: 200 },
  origin: { x: 0.5, y: 0.5 },
  position: {
    x: 0,
    y: 0,
  },
});
const img = image.addComponent(
  new Img({
    resource: 'heart',
  }),
);

game.scene.addChild(image);

const move = image.addComponent(
  new Move({
    speed: {
      x: 250,
      y: 200,
    },
  }),
);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    game.pause();
  } else {
    game.resume();
  }
});
