const Layers = {

    background:document.getElementById("backgroundLayer"),

    doll:document.getElementById("dollLayer"),

    topIn:document.getElementById("topInLayer"),

    trousersIn:document.getElementById("trousersInLayer"),

    shoes:document.getElementById("shoesLayer"),

    dress:document.getElementById("dressLayer"),

    skirt:document.getElementById("skirtLayer"),

    trousers:document.getElementById("trousersLayer"),

    top:document.getElementById("topLayer"),

    jacket:document.getElementById("jacketLayer"),

    hat:document.getElementById("hatLayer"),

    accessory:document.getElementById("accessoryLayer"),

    hand:document.getElementById("handLayer"),

    frame:document.getElementById("frameLayer")

};

function renderScene()
{
    for(const key in Layers)
    {
        Layers[key].src = Scene[key] || "assets/blank.png";
    }
}