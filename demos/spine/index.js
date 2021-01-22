import { Game, GameObject, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { Spine, SpineSystem } from '@eva/plugin-renderer-spine';

resource.addResource([
  {
    name: 'anim',
    // @ts-ignore
    type: 'SPINE',
    src: {
      ske: {
        type: 'json',
        url:
          'https://pages.tmall.com/wow/eva/b5fdf74313d5ff2609ab82f6b6fd83e6.json',
      },
      // @ts-ignore
      atlas: {
        type: 'atlas',
        url:
          'https://pages.tmall.com/wow/eva/b8597f298a5d6fe47095d43ef03210d4.atlas',
      },
      image: {
        type: 'png',
        url:
          'https://gw.alicdn.com/tfs/TB1YHC8Vxz1gK0jSZSgXXavwpXa-711-711.png',
      },
    },
  },
]);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: 750,
      height: 1000,
    }),
    new SpineSystem(),
  ],
  autoStart: true,
  frameRate: 60,
});

// 此处还在考虑如何设置默认场景的宽高
game.scene.transform.size = {
  width: 750,
  height: 1000,
};

const gameObject = new GameObject('spine', {
  anchor: {
    x:0.5,
    y:0.5,
  },
  scale: {
    x: 0.5,
    y: 0.5,
  },
});
const spine = new Spine({ resource: 'anim', animationName: 'idle' });
gameObject.addComponent(spine);
spine.on('complete', e => {
  console.log('动画播放结束', e.name);
});
spine.play('idle');
game.scene.addChild(gameObject);
