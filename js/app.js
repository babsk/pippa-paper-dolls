let gameData = null;
window.onload = () =>
{
    Wardrobe.dressNaked();
};



async function loadCollections() {

    const response = await fetch("gameData.json");
    gameData = await response.json();

    const collectionList = document.getElementById("collections");

    const collections = Object.values(gameData.collections)
        .filter(collection => !collection.special);

    collections.sort((a, b) => a.id - b.id);

    for (const collection of collections) {

        const li = document.createElement("li");
        const button = document.createElement("button");

        button.textContent = collection.name;

        button.addEventListener("click", () => {
            console.log("collection clicked, load outfits");
            loadOutfits(collection.id);
        });

        li.appendChild(button);
        collectionList.appendChild(li);
    }
}
loadCollections();

function loadOutfits(collectionId) {
    console.log("loadOutfits - collectionId " + collectionId);
    const collection = gameData.collections[collectionId];

    if (!collection) return;

    document.getElementById("collectionTitle").textContent = collection.name;

    document.getElementById("collectionInfo").textContent =
        "Released: " + collection.year;

    const outfitContainer = document.getElementById("outfits");
    outfitContainer.innerHTML = "";


    for (const outfitId of collection.outfits) {

        const outfit = gameData.outfits[outfitId];

        if (!outfit) continue;

        const button = document.createElement("button");
        button.textContent = outfit.name;

        button.addEventListener("click", () => {
            Wardrobe.dressOutfit(outfit.id);
        });

        outfitContainer.appendChild(button);
    }
}