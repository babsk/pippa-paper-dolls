const ArticleType = {

    Dress:1,

    Skirt:2,

    Top:3,

    Jacket:4,

    Trousers:5,

    Shoes:6,

    Hat:7,

    Bag:8,

    Background:9,

    Frame:10

};

const Position = {

    Normal:null,

    TopIn:"top_in",

    TrousersIn:"trousers_in"

};

class Article {

    constructor(id, name, type, position, background) {

        this.id = id;
        this.name = name;
        this.type = type;
        this.position = position;
        this.background = background;

    }

    get image() {
        return `assets/articles/${this.id}.png`;
    }

    get thumbnail() {

        switch (this.background) {

            case "thumb":
            case "thumbfill":
                return `assets/articles/thumb_${this.id}.png`;

            default:
                return this.image;
        }
    }

    get needsGreyBackground() {
        return this.background === "fill" ||
               this.background === "thumbfill";
    }
}