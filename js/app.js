let gameData = null;
let browseMode = "collection";


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



function buildCollectionMenu()
{
    console.log("buildCollectionMenu");
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

function buildWardrobeMenu()
{
    const wardrobeMenu =
        document.getElementById("wardrobeMenu");

    wardrobeMenu.innerHTML = "";

    if (browseMode === "collection")
    {
        buildCollectionMenu();
    }
    else if (browseMode === "garment")
    {
        buildGarmentMenu();
    }
    else if (browseMode === "display")
    {
        buildDisplayMenu();
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
document
    .getElementById("startAgainButton")
    .addEventListener("click", () =>
{
    Wardrobe.clear();

    closePanels();
});

document
    .getElementById("browseCollections")
    .addEventListener("click", () =>
    {
        browseMode = "collection";

        document
            .getElementById("browseCollections")
            .classList.add("active");

        document
            .getElementById("browseGarments")
            .classList.remove("active");

        buildWardrobeMenu();
    });

document
    .getElementById("browseGarments")
    .addEventListener("click", () =>
    {
        browseMode = "garment";

        document
            .getElementById("browseCollections")
            .classList.remove("active");

        document
            .getElementById("browseGarments")
            .classList.add("active");

        buildWardrobeMenu();
    });

document
    .getElementById("browseDisplay")
    .addEventListener("click", () =>
{
    browseMode = "display";

    document
        .getElementById("browseCollections")
        .classList.remove("active");

    document
        .getElementById("browseGarments")
        .classList.remove("active");

    document
        .getElementById("browseDisplay")
        .classList.add("active");

    buildWardrobeMenu();
});


function buildGarmentMenu()
{
    console.log("buildGarmentMenu");
    const wardrobeMenu =
        document.getElementById("wardrobeMenu");



    const garments = {};



    // Create empty category groups
    for (const categoryId in CategoryLayers)
    {
        garments[categoryId] = [];
    }



    // Group articles by category
    for (const article of Object.values(gameData.articles))
    {
        if (garments[article.category])
        {
            garments[article.category].push(article);
        }
    }



    // Create the menu
    for (const categoryId in garments)
    {

        const articles =
            garments[categoryId];


        // Don't show empty categories
        if (articles.length === 0)
            continue;



        const categoryEntry =
            document.createElement("div");

        categoryEntry.className =
            "collectionEntry";



        const categoryHeader =
            document.createElement("div");

        categoryHeader.className =
            "collectionHeader";


        const categoryName =
            CategoryLayers[categoryId];


        categoryHeader.innerHTML =
        `
        <div class="collectionName">
            ${categoryName}
        </div>
        `;



        const articleList =
            document.createElement("div");


        articleList.className =
            "outfitList";



        categoryHeader.addEventListener("click", () =>
        {
            categoryEntry.classList.toggle("open");
        });

        const clearButton =
           document.createElement("button");

        clearButton.className =
            "outfitButton";

        clearButton.textContent =
           "✿ Remove " + CategoryLayers[categoryId];

        clearButton.addEventListener("click", () =>
        {
            Wardrobe.clearLayer(categoryId);

            closePanels();
        });

        articleList.appendChild(clearButton);

        for (const article of articles)
        {
            const button =
                document.createElement("button");


            button.className =
                "outfitButton";


            button.textContent =
                article.name;



            button.addEventListener("click", () =>
            {
                Wardrobe.wearArticle(article.id);

                closePanels();
            });



            articleList.appendChild(button);
        }



        categoryEntry.appendChild(categoryHeader);

        categoryEntry.appendChild(articleList);

        wardrobeMenu.appendChild(categoryEntry);

    }
}

function buildDisplayMenu()
{
    const wardrobeMenu =
        document.getElementById("wardrobeMenu");

    const groups = {
        scenery: [],
        frame: []
    };

    for (const article of Object.values(gameData.articles))
    {
        if (article.category === 9)
        {
            groups.scenery.push(article);
        }
        else if (article.category === 10)
        {
            groups.frame.push(article);
        }
    }

    createDisplayCategory(
        "Scenery",
        "scenery",
        groups.scenery,
        wardrobeMenu
    );

    createDisplayCategory(
        "Frames",
        "frame",
        groups.frame,
        wardrobeMenu
    );
}

function createDisplayCategory(
    title,
    type,
    articles,
    container)
{
    if (articles.length === 0)
        return;

    const categoryEntry =
        document.createElement("div");

    categoryEntry.className =
        "collectionEntry";

    const categoryHeader =
        document.createElement("div");

    categoryHeader.className =
        "collectionHeader";

    categoryHeader.innerHTML =
    `
    <div class="collectionName">
        ${title}
    </div>
    `;

    const articleList =
        document.createElement("div");

    articleList.className =
        "outfitList";

    categoryHeader.addEventListener("click", () =>
    {
        categoryEntry.classList.toggle("open");
    });

    const clearButton =
        document.createElement("button");

    clearButton.className =
        "outfitButton";

    clearButton.textContent =
        type === "scenery"
        ? "✿ No scenery"
        : "✿ No frame";

    clearButton.addEventListener("click", () =>
    {
        Wardrobe.clearDisplay(type);
        closePanels();
    });

    articleList.appendChild(clearButton);

    for (const article of articles)
    {
        const button =
            document.createElement("button");

        button.className =
            "outfitButton";

        button.textContent =
            article.name;

        button.addEventListener("click", () =>
        {
            Wardrobe.wearDisplayArticle(article.id);
            closePanels();
        });

        articleList.appendChild(button);
    }

    categoryEntry.appendChild(categoryHeader);
    categoryEntry.appendChild(articleList);
    container.appendChild(categoryEntry);
}

