const CategoryLayers = {

    "1": "dress",
    "2": "skirt",
    "3": "top",
    "4": "jacket",
    "5": "trousers",
    "6": "shoes",
    "7": "hat",
    "8": "bag"

};

const Wardrobe = {

    clear()
    {
    },

    dressOutfit(outfitId) {

        clearScene();

        const outfit = gameData.outfits[outfitId];

        if (!outfit) {
        console.log("Outfit not found:", outfitId);
        return;
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



    dressNaked()
    {
       renderScene();
    }



};