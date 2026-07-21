let gameData = null;


window.onload = async () =>
{
    console.log("onload");

    await loadGameData();

    buildWardrobeMenu();

    Wardrobe.dressNaked();

    resizeStage();
};



async function loadGameData()
{
    console.log("Loading game data");

    const response = await fetch("gameData.json");

    gameData = await response.json();
}



function buildWardrobeMenu()
{
    const wardrobeMenu =
        document.getElementById("wardrobeMenu");


    const collections =
        Object.values(gameData.collections)
        .filter(collection => !collection.special)
        .sort((a,b)=>a.year-b.year);



    for (const collection of collections)
    {

        const collectionEntry =
            document.createElement("div");

        collectionEntry.className =
            "collectionEntry";



        const collectionHeader =
            document.createElement("div");


        collectionHeader.className =
            "collectionHeader";


collectionHeader.innerHTML =
`
<div class="collectionName">
    <img class="flowerIcon" src="assets/flower.png">
    ${collection.name}
</div>

<div class="collectionYear">
    ${collection.year !== null ? collection.year : ""}
</div>
`;



        const outfitList =
            document.createElement("div");


        outfitList.className =
            "outfitList";



        collectionHeader.addEventListener("click", () =>
        {

            const isOpen =
                collectionEntry.classList.toggle("open");


collectionHeader.innerHTML =
`
<div class="collectionName">
    <img class="flowerIcon ${isOpen ? "open" : ""}" 
         src="assets/flower.png">
    ${collection.name}
</div>

<div class="collectionYear">
    ${collection.year !== null ? collection.year : ""}
</div>
`;



            if (isOpen && outfitList.children.length === 0)
            {
                buildOutfitList(
                    collection,
                    outfitList
                );
            }

        });



        collectionEntry.appendChild(collectionHeader);

        collectionEntry.appendChild(outfitList);


        wardrobeMenu.appendChild(collectionEntry);

    }

}




function buildOutfitList(collection, outfitList)
{

    for (const outfitId of collection.outfits)
    {

        const outfit =
            gameData.outfits[outfitId];


        if (!outfit)
            continue;



        const button =
            document.createElement("button");


        button.className =
            "outfitButton";


        button.textContent =
            outfit.name;



        if (outfit.articles.length === 0)
        {
            button.disabled = true;
        }


        button.addEventListener("click", () =>
        {

            Wardrobe.dressOutfit(outfit.id);

            closePanels();

        });


        outfitList.appendChild(button);

    }

}