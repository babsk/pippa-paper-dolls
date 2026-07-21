const leftPanel = document.getElementById("leftPanel");
const rightPanel = document.getElementById("rightPanel");
const overlay = document.getElementById("overlay");

function closePanels()
{
    console.log("closePanels");
    leftPanel.classList.remove("open");
    rightPanel.classList.remove("open");

    overlay.style.display = "none";
}

function showCollections()
{
    console.log("showCollections");
    closePanels();

    leftPanel.classList.add("open");

    overlay.style.display = "block";
}

function showOutfits()
{
    console.log("showOutfits");
    closePanels();

    rightPanel.classList.add("open");
}

document
.getElementById("showCollections")
.addEventListener("click", showCollections);

document
.getElementById("showOutfits")
.addEventListener("click", showOutfits);

overlay.addEventListener("click", closePanels);