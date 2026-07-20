/*const STAGE_WIDTH = 707;
const STAGE_HEIGHT = 1204;

function resizeStage() {

    const stage = document.getElementById("stage");
    const container = document.getElementById("stageContainer");

    if (!stage || !container)
        return;

    stage.style.transform = "";

    const availableWidth = container.clientWidth;
    const availableHeight = container.clientHeight;

    const scale = Math.min(

        availableWidth / STAGE_WIDTH,

        availableHeight / STAGE_HEIGHT

    );

    const scaledWidth = STAGE_WIDTH * scale;
    const scaledHeight = STAGE_HEIGHT * scale;

    stage.style.transform =
        `translate(${(availableWidth-scaledWidth)/2}px, ${(availableHeight-scaledHeight)/2}px) scale(${scale})`;

}

window.addEventListener("resize", resizeStage);

window.addEventListener("load", resizeStage);*/

const STAGE_WIDTH = 707;
const STAGE_HEIGHT = 1204;

function resizeStage() {

    const stage = document.getElementById("stage");
    const container = document.getElementById("stageContainer");

    if (!stage || !container)
        return;

    const scale = Math.min(
        container.clientWidth / STAGE_WIDTH,
        container.clientHeight / STAGE_HEIGHT
    );

    stage.style.transformOrigin = "center center";
    stage.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", resizeStage);
window.addEventListener("load", resizeStage);