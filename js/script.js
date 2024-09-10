const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translationBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag ,id) =>{
    for(const country_code in countries){
        //console.log(countries[country_code]);
        let selected;
        if(id==0 && country_code == "en-GB"){
            selected = "selected";
        }
        else if(id==1 && country_code == "ta-LK"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option); //adding oprions tag inside select tag
    }
});


exchangeIcon.addEventListener("click",()=>{
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value=  selectTag[1].value ;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});


translationBtn.addEventListener("click",()=>{
    let text= fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    //console.log(text, translateFrom,translateTo);

    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");

    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data=> {
        console.log(data);
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation.");
    });

});

icons.forEach(icon =>{
    icon.addEventListener("click",({target}) =>{
        //console.log(target);
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                //console.log("From")
                navigator.clipboard.writeText(fromText.value);
            } else{
                //console.log("to")
                navigator.clipboard.writeText(toText.value);
            }
        }else{
         console.log("speech icon clicked")
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else{

                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
})
