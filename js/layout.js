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