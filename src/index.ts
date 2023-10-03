import '../css/main.css';

import { Application, Assets } from 'pixi.js';
import { GameRoot } from './GameRoot';
import { GameWorkFlow } from './GameWorkFlow';

const app = new Application<HTMLCanvasElement>({ width: 2048, height: 1080 });
document.body.appendChild(app.view);

//@ts-ignore
globalThis.__PIXI_APP__ = app;

app.view.style.position = "absolute";
app.view.style.width = window.innerWidth + "px";
app.view.style.height = window.innerHeight + "px";
app.view.style.display = "block";

const resizeHandler = () => {
    
    window.isPortrait = window.innerHeight > window.innerWidth;
    window.globalScaleFactorX = app.renderer.width / window.innerWidth;
    window.globalScaleFactorY = app.renderer.height / window.innerHeight;
    window.renderer = app.renderer;

    console.log(window.globalScaleFactorX, window.globalScaleFactorY);

    app.view.style.width = window.innerWidth + "px";
    app.view.style.height = window.innerHeight + "px";
};

window.addEventListener('resize', resizeHandler, false);

resizeHandler();

Assets.addBundle('assets', {
    'background': './assets/img/bg.jpg',
    'button_spin': './assets/img/button_spin.png',
    'counter': "./assets/img/counter.png",
    'reels': "./assets/img/reels.png",
    'H1': "./assets/img/H1.png",
    'H2': "./assets/img/H2.png",
    'H3': "./assets/img/H3.png",
    'H4': "./assets/img/H4.png",
    'L1': "./assets/img/L1.png",
    'L2': "./assets/img/L2.png",
    'L3': "./assets/img/L3.png",
    'L4': "./assets/img/L4.png",
    'WILD': "./assets/img/WILD.png",
})

const logProgress = (res: number) => {
    console.log("loading: " + Math.floor(res * 100) + '%');
}

Assets.loadBundle('assets', logProgress).then(() => {
    app.stage.addChild(new GameRoot());
    new GameWorkFlow();
})

animate();


function animate() {
    requestAnimationFrame(animate);
    app.renderer.render(app.stage);
}


