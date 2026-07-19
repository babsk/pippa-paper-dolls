const Layers = {

    background:document.getElementById("backgroundLayer"),

    doll:document.getElementById("dollLayer"),

    dress:document.getElementById("dressLayer"),

    skirt:document.getElementById("skirtLayer"),

    topIn:document.getElementById("topInLayer"),

    trousersIn:document.getElementById("trousersInLayer"),

    shoes:document.getElementById("shoesLayer"),

    trousers:document.getElementById("trousersLayer"),

    top:document.getElementById("topLayer"),

    jacket:document.getElementById("jacketLayer"),

    hat:document.getElementById("hatLayer"),

    bag:document.getElementById("bagLayer"),

    hand:document.getElementById("handLayer"),

    frame:document.getElementById("frameLayer")

};

function renderScene()
{
    for(const key in Layers)
    {
        Layers[key].src = Scene[key] || "";
    }
}