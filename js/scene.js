const Scene = {

    background:null,

    dress:null,

    skirt:null,

    topIn:null,

    trousersIn:null,

    shoes:null,

    trousers:null,

    top:null,

    jacket:null,

    hat:null,

    bag:null,

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