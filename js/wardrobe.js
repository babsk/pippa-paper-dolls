const CategoryLayers = {

    "1": "dress",
    "2": "skirt",
    "3": "top",
    "4": "jacket",
    "5": "trousers",
    "6": "shoes",
    "7": "hat",
    "8": "accessory"

};

const Wardrobe = {

    clear()
    {
        clearScene();

        renderScene();
    },

    dressOutfit(outfitId) {

        clearScene();

        const outfit = gameData.outfits[outfitId];

        if (!outfit) {
        console.log("Outfit not found:", outfitId);
        return;
        }

	console.log("outfit " + outfit.articles.length);
	if (outfit.articles.length == 0)
        {
           alert("This outfit has not been released yet");
        }

        for (const articleId of outfit.articles) {

            const article = gameData.articles[articleId];

            console.log("Article category" + article.category);

            if (!article) continue;

            let layer = CategoryLayers[article.category];

            if (article.position === "trousers_in") {
                 layer = "trousersIn";
            }

            if (article.position === "top_in") {
                 layer = "topIn";
            }

            if (layer) {
                Scene[layer] = "assets/clothes/img_" + articleId + ".png";
            }
        }

        renderScene();
    },

    wearArticle(articleId) {

        const article = gameData.articles[articleId];

        if (!article) {
            console.log("Article not found:", articleId);
            return;
        }


        console.log("Wearing article:", article.name);


        let layer = CategoryLayers[article.category];


        if (article.position === "trousers_in") {
            layer = "trousersIn";
        }


        if (article.position === "top_in") {
            layer = "topIn";
        }


        if (layer) {

            Scene[layer] =
                "assets/clothes/img_" + articleId + ".png";

        }


        renderScene();

    },

clearLayer(categoryId)
{
    let layer = CategoryLayers[categoryId];

    if (!layer)
        return;

    if (layer === "top")
    {
        Scene.top = null;
        Scene.topIn = null;
    }
    else if (layer === "trousers")
    {
        Scene.trousers = null;
        Scene.trousersIn = null;
    }
    else
    {
        Scene[layer] = null;
    }

    renderScene();
},

wearDisplayArticle(articleId)
{
    const article = gameData.articles[articleId];

    if (!article)
        return;

    if (article.category === 9)
    {
        Scene.background =
            "assets/clothes/img_"
            + articleId
            + ".png";
    }
    else if (article.category === 10)
    {
        Scene.frame =
            "assets/clothes/img_"
            + articleId
            + ".png";
    }

    renderScene();
},

clearDisplay(type)
{
    if (type === "scenery")
    {
        Scene.background = null;
    }
    else if (type === "frame")
    {
        Scene.frame = null;
    }

    renderScene();
},

    dressNaked()
    {
       renderScene();
    }



};