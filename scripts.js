function onOff(){
    document
        .querySelector("#modal")
        .classList//propriedade 
        .toggle("hide")//alternancia
        //coloca e tira uma classe... nesse caso hide

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")
    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}
