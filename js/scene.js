const Scene = {

    background:null,

    topIn:null,

    trousersIn:null,

    shoes:null,

    dress:null,

    skirt:null,

    trousers:null,

    top:null,

    jacket:null,

    hat:null,

    accessory:null,

    frame:null,

    hand:null

};

function clearScene()
{
    console.log("clearScene");
    for(const key in Scene)
    {
        Scene[key]=null;    
    }
    Scene.doll =  "assets/dolls/" + Dolls[currentDoll].name + ".png";
    console.log("hand is " + Dolls[currentDoll].hand);
    Scene.hand = "assets/dolls/hand_" + Dolls[currentDoll].hand + ".png";
}