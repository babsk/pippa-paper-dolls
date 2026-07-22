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
    for(const key in Scene)
    {
        Scene[key]=null;    
    }
    Scene.doll = "assets/dolls/emma.png";
    Scene.hand = "assets/dolls/hand_pale.png";
}

Scene.doll = "assets/dolls/emma.png";
Scene.hand = "assets/dolls/hand_pale.png";