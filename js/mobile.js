const leftPanel = document.getElementById("leftPanel");
const overlay = document.getElementById("overlay");


function closePanels()
{
    console.log("closePanels");

    leftPanel.classList.remove("open");

    overlay.style.display = "none";
}



function showCollections()
{
    console.log("showCollections");

    leftPanel.classList.add("open");

    overlay.style.display = "block";
}



document
    .getElementById("showCollections")
    .addEventListener("click", showCollections);



overlay.addEventListener("click", closePanels);