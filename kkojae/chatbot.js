
const todayDate = new Date();
let dayDate = todayDate.toLocaleDateString();
document.getElementById("header_date_day").innerText = dayDate;

setInterval(() => {
    const todayDateTime = new Date();
    const header_date_time = document.getElementById("header_date_time");
    header_date_time.innerText = todayDateTime.toLocaleTimeString();
}, 1000);

const reset = document.getElementById("header_content_reset");

reset.addEventListener("click", () => {
    location.reload();
})

// 이미지를 클릭했을 때 이벤트 발생!
// 채팅창에 민이나 병이 나와서 무엇이든 물어보세요! 메세지 띄워준다.

const imgClickList = document.getElementsByClassName("container_header_img");

const createMinElem = () => {
    let newMinDiv = document.createElement("div");
    let newMinImg = document.createElement("img");
    let newMinP = document.createElement("p");
    newMinDiv.setAttribute("class", "container_content");
    newMinImg.setAttribute("src", "./minjong.png");
    newMinImg.setAttribute("alt", "min_image");
    newMinP.append("무엇이든 물어보세요!");
    parent_container.appendChild(newMinDiv);
    newMinDiv.appendChild(newMinImg);
    newMinDiv.appendChild(newMinP);
}

const createByungElem = () => {
    let newByungDiv = document.createElement("div");
    let newByungImg = document.createElement("img");
    let newByungP = document.createElement("p");
    newByungDiv.setAttribute("class", "container_content");
    newByungImg.setAttribute("src", "./byung.png");
    newByungImg.setAttribute("alt", "byung_image");
    newByungP.append("무엇이든 물어보세요!");
    parent_container.appendChild(newByungDiv);
    newByungDiv.appendChild(newByungImg);
    newByungDiv.appendChild(newByungP);
}

const targetArray = [];

for (let i = 0; i < imgClickList.length; i++){
    if (imgClickList[i] === imgClickList[0]){
        imgClickList[i].addEventListener("click", (event)=>{
            console.log(imgClickList[i]);
            createMinElem();
            const targetMin = parent_container.lastChild.firstChild.alt;
            targetArray.push(targetMin);
            console.log(targetArray);
        });
    } else if (imgClickList[i] === imgClickList[1]){
        imgClickList[i].addEventListener("click",(event)=>{
            console.log(imgClickList[i]);
            createByungElem();
            const targetByung = parent_container.lastChild.firstChild.alt;
            targetArray.push(targetByung);
            console.log(targetArray);
        });
    }
}

const footer_input = document.getElementById("footer_input");
const parent_container = document.getElementById("container");
const footer_button = document.getElementById("footer_button");
// console.log(parent_container);

const createElem = () => {
    let input_value = footer_input.value;
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    newDiv.setAttribute("class", "container_content_jae");
    newP.setAttribute("id", "container_content_jae_p");
    newP.setAttribute("class", "container_content_jae_p");
    newImg.setAttribute("src", "./tiger.png");
    parent_container.appendChild(newDiv);
    newDiv.appendChild(newP);
    newDiv.appendChild(newImg);
    document.getElementById("container").lastElementChild.firstChild.innerText = input_value;
    // console.log(document.getElementById("container").lastElementChild.firstChild);
}

const matchSentenceByMin = () => {
    let newByMinDiv = document.createElement("div");
    let newByMinP = document.createElement("p");
    let newByMinImg = document.createElement("img");
    newByMinDiv.setAttribute("class", "container_content");
    newByMinP.setAttribute("id", "container_content_min_p");
    newByMinImg.setAttribute("src", "./minjong.png");
    newByMinImg.setAttribute("alt", "min_image");
    parent_container.appendChild(newByMinDiv);
    newByMinDiv.appendChild(newByMinImg);
    newByMinDiv.appendChild(newByMinP);
    setTimeout(() => {
        document.getElementById("container").lastElementChild.lastChild.innerText = "꺄아아아악!!!";
        // console.log(document.getElementById("container").lastElementChild.lastChild);
    }, 1000); 
}

const matchSentenceByByung = () => {
    let newByByungDiv = document.createElement("div");
    let newByByungP = document.createElement("p");
    let newByByungImg = document.createElement("img");
    newByByungDiv.setAttribute("class", "container_content");
    newByByungP.setAttribute("id", "container_content_min_p");
    newByByungImg.setAttribute("src", "./byung.png");
    newByByungImg.setAttribute("alt", "byung_image");
    parent_container.appendChild(newByByungDiv);
    newByByungDiv.appendChild(newByByungImg);
    newByByungDiv.appendChild(newByByungP);
    setTimeout(() => {
        document.getElementById("container").lastElementChild.lastChild.innerText = "네 이노오오오옴!!";
    }, 1000);
}

footer_input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13){
        if (footer_input.value.length === 0){
            alert("입력하고 눌러 이년아!");
            event.preventDefault();
        } else{
            createElem();
            let p_text = document.getElementById("container_content_jae_p").innerText;

            // switch cass 문으로 사용하면 더 좋을 듯?!
            if (p_text === "안녕?"){
                if (targetArray[0] === "min_image"){
                    matchSentenceByMin();
                    // string.empty
                    footer_input.value = "";
                } else if (targetArray[0] === "byung_image"){
                    matchSentenceByByung();
                    footer_input.value = "";
                }
            } else{
                if (targetArray[0] === "min_image"){
                    matchSentenceByMin();
                    footer_input.value = "";
                } else if (targetArray[0] === "byung_image"){
                    matchSentenceByByung();
                    footer_input.value = "";
                }
            }
        }
    }
});

footer_button.addEventListener("click", (event) => {
    if (footer_input.value.length === 0){
        alert("입력하고 눌러 이년아!");
        event.preventDefault();
    } else{
        createElem();
        let p_text = document.getElementById("container_content_jae_p").innerText;
        // console.log(p_text);

        if (p_text === "안녕?"){
            if (targetArray[0] === "min_image"){
                matchSentenceByMin();
                footer_input.value = "";
            } else if (targetArray[0] === "byung_image"){
                matchSentenceByByung();
                footer_input.value = "";
            }
        } else{
            if (targetArray[0] === "min_image"){
                matchSentenceByMin();
                footer_input.value = "";
            } else if (targetArray[0] === "byung_image"){
                matchSentenceByByung();
                footer_input.value = "";
            }
        }
    }   
});
