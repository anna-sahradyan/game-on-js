import {setupGround, updateGround} from "./ground.js";

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.000001
//?get container element

const containerElem = document.querySelector("[data-container]");
const scoreElement = document.querySelector("[data-score]");
const startElement = document.querySelector("[data-start-screen]");
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, {once: true})
setupGround();
let lastTime;
let speedScale;
let score;

function update(time) {
    if (lastTime === null) {
        lastTime = time;
        window.requestAnimationFrame(update)
        return
    }
    const delta = time - lastTime
    lastTime = time;
    updateGround(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta)
    window.requestAnimationFrame(update);
}

//?updateSpeedScale
function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

//?updateScore
function updateScore(delta) {
    score += delta * 0.01;
    scoreElement.textContent = Math.floor(score);
}

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    startElement.classList.add("hide")
    window.requestAnimationFrame(update);
}

function setPixelToWorldScale() {
    let worldToPixelScale;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT
    }
    containerElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
    containerElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}
