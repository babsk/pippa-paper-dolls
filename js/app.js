let gameData = null;
let browseMode = "collection";

let currentDoll = 1;
let dollSelectorOpen = false;

const Dolls = {

    "1": { id:1, name:"Pippa", hand:"pale" },
    "2": { id:2, name:"Emma",  hand:"pale" },
    "3": { id:3, name:"Marie", hand:"dark" },
    "4": { id:4, name:"Tammie", hand:"pale" },
    "5": { id:5, name:"Britt", hand:"dark" }

};

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

    clearScene();

    buildDollSelector();
}

function buildDollSelector()
{
    const container =
        document.getElementById("dollSelector");

    container.innerHTML = "";

    const entry =
        document.createElement("div");

    entry.className =
        dollSelectorOpen
            ? "collectionEntry open"
            : "collectionEntry";

    const current =
        document.createElement("div");

    current.className =
        "currentDoll";

    current.textContent =
        Dolls[currentDoll].name;

    const header =
        document.createElement("div");

    header.className =
        "dollSelectorHeader";

header.innerHTML =
`
    <div class="collectionName">
        <img class="flowerIcon ${dollSelectorOpen ? "open" : ""}"
             src="assets/flower.png"
             alt="">
        Dolls
    </div>
`;

    const doll = Dolls[currentDoll];

    const list = document.createElement("div");

    list.className = "outfitList";

    header.addEventListener("click", () =>
    {
        dollSelectorOpen =
            !dollSelectorOpen;


        buildDollSelector();
    });


    for (const doll of Object.values(Dolls))
    {
        const button =
            document.createElement("button");

        button.className =
            "outfitButton";

        button.textContent =
            doll.name;


        if (doll.id === currentDoll)
        {
            button.disabled = true;
        }


        button.addEventListener("click", () =>
        {
            currentDoll = doll.id;

            Scene.doll =
                "assets/dolls/" + Dolls[currentDoll].name.toLowerCase() + ".png";

            Scene.hand = "assets/dolls/hand_" + Dolls[currentDoll].hand + ".png";

            renderScene();

            buildDollSelector();
        });


        list.appendChild(button);
    }


    entry.appendChild(current);
    entry.appendChild(header);
    entry.appendChild(list);

    container.appendChild(entry);
}

function buildCollectionMenu()
{
    console.log("buildCollectionMenu");
    const wardrobeMenu = document.getElementById("wardrobeMenu");

    const collections =
        Object.values(gameData.collections)
        .filter(collection => !collection.special)
        .sort((a,b)=>a.year-b.year);

    for (const collection of collections)
    {
        const collectionEntry = document.createElement("div");

        collectionEntry.className = "collectionEntry";

        const collectionHeader = document.createElement("div");

        collectionHeader.className = "menuHeader collectionHeader";

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

        const outfitList = document.createElement("div");

        outfitList.className = "outfitList";

        collectionHeader.addEventListener("click", () =>
        {

            const isOpen = collectionEntry.classList.toggle("open");

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
    console.log("buildWardrobeMenu");
    const wardrobeMenu = document.getElementById("wardrobeMenu");

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
    console.log("buildOutfitList");
    for (const outfitId of collection.outfits)
    {
        const outfit = gameData.outfits[outfitId];

        if (!outfit)
            continue;

const row =
    document.createElement("div");

row.className =
    "outfitRow";


const button =
    document.createElement("button");

button.className =
    "outfitButton";

button.textContent =
    outfit.name;


const infoButton =
    document.createElement("button");

infoButton.className =
    "infoButton";

infoButton.textContent =
    "🌸";


infoButton.addEventListener("click", (event) =>
{
    event.stopPropagation();

    showOutfitInfo(outfit.id);
});

        if (outfit.articles.length === 0)
        {
            button.disabled = true;
        }

        button.addEventListener("click", () =>
        {
            Wardrobe.dressOutfit(outfit.id);

            closePanels();
        });

 //       outfitList.appendChild(button);

row.appendChild(button);

row.appendChild(infoButton);

outfitList.appendChild(row);
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

        document
            .getElementById("browseDisplay")
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
            .getElementById("browseDisplay")
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


document
    .getElementById("closeOutfitInfo")
    .addEventListener("click", () =>
    {
        document
            .getElementById("outfitInfoPopup")
            .style.display = "none";
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
        const articles = garments[categoryId];

        // Don't show empty categories
        if (articles.length === 0)
            continue;

        const categoryEntry = document.createElement("div");

        categoryEntry.className = "collectionEntry";

        const categoryHeader = document.createElement("div");

        categoryHeader.className = "menuHeader collectionHeader";

        const categoryName = CategoryLayers[categoryId];

        categoryHeader.innerHTML =
              `
                    <div class="collectionName">
                        ${categoryName}
                    </div>
              `;

        const articleList = document.createElement("div");

        articleList.className = "outfitList";

        categoryHeader.addEventListener("click", () =>
        {
            categoryEntry.classList.toggle("open");
        });

        const clearButton = document.createElement("button");

        clearButton.className = "outfitButton";

        clearButton.textContent = "✿ Remove " + CategoryLayers[categoryId];

        clearButton.addEventListener("click", () =>
        {
            Wardrobe.clearLayer(categoryId);

            closePanels();
        });

        articleList.appendChild(clearButton);

        for (const article of articles)
        {
            const button = document.createElement("button");

            button.className = "outfitButton";

            button.textContent = article.name;

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

    categoryHeader.className = "menuHeader collectionHeader";

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


function showOutfitInfo(outfitId)
{
    const outfit = gameData.outfits[outfitId];

    if (!outfit)
        return;


    let collectionName = "";

    for (const collection of Object.values(gameData.collections))
    {
        if (collection.outfits.includes(outfitId))
        {
            collectionName = collection.name;
            break;
        }
    }


    const imageContainer =
        document.getElementById("catalogueImageContainer");

    const title =
        document.getElementById("catalogueTitle");

    const collection =
        document.getElementById("catalogueCollection");

    loadCatalogueImage(outfitId);


    title.textContent =
        outfit.name;


    collection.textContent =
        collectionName;


    document
        .getElementById("outfitInfoPopup")
        .style.display = "block";
}

function loadCatalogueImage(outfitId)
{
    const img = new Image();

    img.onload = function ()
    {
        document.getElementById("catalogueImageContainer").innerHTML =
            `<img src="assets/boxes/${outfitId}.png">`;
    };

    img.onerror = function ()
    {
        // No scan available.
        // Show placeholder for now.
        document.getElementById("catalogueImageContainer").innerHTML =
            "<p>Preview coming soon</p>";
    };

    img.src = `assets/boxes/${outfitId}.png`;
}