"use strict";
// 누구누구님 Ozz Chat-Bot에 오신걸 환영합니다.
const user_name = prompt("닉네임을 입력해주세요.");
const greetingFunc = () => {
    // let greetingName = document.getElementById("header_main_greeting_name");
    let greetingP = document.getElementById("header_main_greeting_p");
    greetingP.innerHTML = `${user_name}님`+ `<br/>` +`Ozz Chat-Bot에 오신걸 환영합니다.`;
    // greetingName.append("ods");
    // greetingP.append("Ozz Chat-Bot에 오신걸 환영합니다.");
}
greetingFunc();

// 스크롤 내려주는 함수
const scrollControl = ()=>{
    const scrollControl = document.getElementById("container");
    scrollControl.scrollTop = scrollControl.scrollHeight;        
}

const todayDate = new Date();
let dayDate = todayDate.toLocaleDateString();
document.getElementById("header_main_date_day").innerText = dayDate;

setInterval(() => {
    const todayDateTime = new Date();
    const header_date_time = document.getElementById("header_main_date_time");
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
    let today = new Date();
    // console.log(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
    let newMinDiv = document.createElement("div");
    let newMinDivContainer = document.createElement("div");
    let newMinDivContainerNameTime = document.createElement("div");
    let newMinImg = document.createElement("img");
    let newMinP = document.createElement("p");
    let newMinNameP = document.createElement("p");
    let newMinTimeP = document.createElement("p");
    newMinDiv.setAttribute("class", "container_content");
    newMinDivContainer.setAttribute("class", "container_content_p");
    newMinDivContainerNameTime.setAttribute("class", "container_content_p_name_time");
    newMinImg.setAttribute("src", "./assets/minjong.png");
    newMinImg.setAttribute("alt", "min_image");
    newMinNameP.setAttribute("class", "container_content_name");
    newMinTimeP.setAttribute("class", "container_content_time");
    newMinP.setAttribute("class", "container_content_text_p");
    newMinNameP.append("Min~");
    newMinTimeP.append(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
    newMinP.append("무엇이든 물어보세요!");
    parent_container.appendChild(newMinDiv);
    newMinDiv.appendChild(newMinImg);
    newMinDiv.appendChild(newMinDivContainer);
    newMinDivContainer.appendChild(newMinDivContainerNameTime);
    newMinDivContainerNameTime.appendChild(newMinNameP);
    newMinDivContainerNameTime.appendChild(newMinTimeP);
    newMinDivContainer.appendChild(newMinP);
}

const createByungElem = () => {
    let today = new Date();
    // console.log(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
    let newByungDiv = document.createElement("div");
    let newByungDivContainer = document.createElement("div");
    let newByungDivContainerNameTime = document.createElement("div");
    let newByungImg = document.createElement("img");
    let newByungP = document.createElement("p");
    let newByungNameP = document.createElement("p");
    let newByungTimeP = document.createElement("p");
    newByungDiv.setAttribute("class", "container_content");
    newByungDivContainer.setAttribute("class", "container_content_p");
    newByungDivContainerNameTime.setAttribute("class", "container_content_p_name_time");
    newByungImg.setAttribute("src", "./assets/byung.png");
    newByungImg.setAttribute("alt", "byung_image");
    newByungNameP.setAttribute("class", "container_content_name");
    newByungTimeP.setAttribute("class", "container_content_time");
    newByungP.setAttribute("class", "container_content_text_p");
    newByungNameP.append("Byung~");
    newByungTimeP.append(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`);
    newByungP.append("무엇이든 물어보세요!");
    parent_container.appendChild(newByungDiv);
    newByungDiv.appendChild(newByungImg);
    newByungDiv.appendChild(newByungDivContainer);
    newByungDivContainer.appendChild(newByungDivContainerNameTime);
    newByungDivContainerNameTime.appendChild(newByungNameP);
    newByungDivContainerNameTime.appendChild(newByungTimeP);
    newByungDivContainer.appendChild(newByungP);
}

// 민이나 병을 선택했을때! 해당 이미지 크기와 색상변경 추가

const targetArray = [];

for (let i = 0; i < imgClickList.length; i++){
    if (imgClickList[i] === imgClickList[0]){
        imgClickList[i].addEventListener("click", (event)=>{
            // console.log(imgClickList[i]);
            createMinElem();
            const targetMin = parent_container.lastChild.firstChild.alt;
            targetArray.push(targetMin);
            // console.log(targetArray);
            imgClickList[i].style.backgroundColor = "#fff"
            // scrollControl();
        });
    } else if (imgClickList[i] === imgClickList[1]){
        imgClickList[i].addEventListener("click",(event)=>{
            // console.log(imgClickList[i]);
            createByungElem();
            const targetByung = parent_container.lastChild.firstChild.alt;
            targetArray.push(targetByung);
            // console.log(targetArray);
            imgClickList[i].style.backgroundColor = "#fff"
            // scrollControl();
        });
    }
}

const footer_input = document.getElementById("footer_input");
const parent_container = document.getElementById("container");
const footer_button = document.getElementById("footer_button");
// console.log(parent_container);

const createElem = () => {
    let today = new Date();
    let input_value = footer_input.value;
    let newDiv = document.createElement("div");
    let newDivContainer = document.createElement("div");
    let newDivContainerNameTime = document.createElement("div");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    let newNameP = document.createElement("p");
    let newTimeP = document.createElement("p");
    newDiv.setAttribute("class", "container_content_user");
    newDivContainer.setAttribute("class", "container_content_p");
    newDivContainerNameTime.setAttribute("class", "container_content_p_name_time");
    newImg.setAttribute("src", "./assets/tiger.png");
    newImg.setAttribute("alt", "tiger_image");
    newP.setAttribute("class", "container_content_text_p");
    newP.setAttribute("id", "container_content_text_p");
    newNameP.setAttribute("class", "container_content_name");
    newTimeP.setAttribute("class", "container_content_time");
    newNameP.append(user_name);
    newTimeP.append(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
    newP.append(input_value);
    parent_container.appendChild(newDiv);
    newDiv.appendChild(newDivContainer);
    newDivContainer.appendChild(newDivContainerNameTime);
    newDivContainerNameTime.appendChild(newTimeP);
    newDivContainerNameTime.appendChild(newNameP);
    newDivContainer.appendChild(newP);
    newDiv.appendChild(newImg);
}


const matchSentenceByMin = () => {
    let today = new Date();
    let newByMinDiv = document.createElement("div");
    let newByMinDivContainer = document.createElement("div");
    let newByMinDivContainerNameTime = document.createElement("div");
    let newByMinImg = document.createElement("img");
    let newByMinP = document.createElement("p");
    let newByMinNameP = document.createElement("p");
    let newByMinTimeP = document.createElement("p");
    newByMinDiv.setAttribute("class", "container_content");
    newByMinDivContainer.setAttribute("class", "container_content_p");
    newByMinDivContainerNameTime.setAttribute("class", "container_content_p_name_time");
    newByMinImg.setAttribute("src", "./assets/minjong.png");
    newByMinImg.setAttribute("alt", "min_image");
    newByMinNameP.setAttribute("class", "container_content_name");
    newByMinTimeP.setAttribute("class", "container_content_time");
    newByMinP.setAttribute("id", "container_content_text_p");
    newByMinP.setAttribute("class", "container_content_text_p");
    newByMinNameP.append("Min~");
    newByMinTimeP.append(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
    newByMinP.append("꺅!!!!!!!");
    setTimeout(() => {
        parent_container.appendChild(newByMinDiv);
        newByMinDiv.appendChild(newByMinImg);
        newByMinDiv.appendChild(newByMinDivContainer);
        newByMinDivContainer.appendChild(newByMinDivContainerNameTime);
        newByMinDivContainerNameTime.appendChild(newByMinNameP);
        newByMinDivContainerNameTime.appendChild(newByMinTimeP);
        newByMinDivContainer.appendChild(newByMinP);
        scrollControl();
    }, 1000); 
}

const matchSentenceByByung = () => {
    let today = new Date();
    let newByByungDiv = document.createElement("div");
    let newByByungDivContainer = document.createElement("div");
    let newByByungDivContainerNameTime = document.createElement("div");
    let newByByungImg = document.createElement("img");
    let newByByungP = document.createElement("p");
    let newByByungNameP = document.createElement("p");
    let newByByungTimeP = document.createElement("p");
    newByByungDiv.setAttribute("class", "container_content");
    newByByungDivContainer.setAttribute("class", "container_content_p");
    newByByungDivContainerNameTime.setAttribute("class", "container_content_p_name_time");
    newByByungImg.setAttribute("src", "./assets/byung.png");
    newByByungImg.setAttribute("alt", "byung_image");
    newByByungNameP.setAttribute("class", "container_content_name");
    newByByungTimeP.setAttribute("class", "container_content_time");
    newByByungP.setAttribute("id", "container_content_text_p");
    newByByungP.setAttribute("class", "container_content_text_p");
    newByByungNameP.append("Byung~");
    newByByungTimeP.append(`${today.getMonth()}.${today.getDate()} ${today.getHours()}:${today.getMinutes()}`)
    newByByungP.append("네이노어어ㅗㅁ오ㅗㅁㅇ노!");
    setTimeout(() => {
        parent_container.appendChild(newByByungDiv);
        newByByungDiv.appendChild(newByByungImg);
        newByByungDiv.appendChild(newByByungDivContainer);
        newByByungDivContainer.appendChild(newByByungDivContainerNameTime);
        newByByungDivContainerNameTime.appendChild(newByByungNameP);
        newByByungDivContainerNameTime.appendChild(newByByungTimeP);
        newByByungDivContainer.appendChild(newByByungP);
        scrollControl();
    }, 1000);
}

footer_input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13){
        if (footer_input.value.length === 0){
            alert("입력하고 눌러 이년아!");
            event.preventDefault();
        } else{
            createElem();
            let p_text = document.getElementById("container_content_text_p").innerText;

            // switch cass 문으로 사용하면 더 좋을 듯?!
            if (p_text === "안녕?"){
                if (targetArray[0] === "min_image"){
                    matchSentenceByMin();
                    // string.empty
                    footer_input.value = "";
                    scrollControl();
                } else if (targetArray[0] === "byung_image"){
                    matchSentenceByByung();
                    footer_input.value = "";
                    scrollControl();
                }
            } else{
                if (targetArray[0] === "min_image"){
                    matchSentenceByMin();
                    footer_input.value = "";
                    scrollControl();
                } else if (targetArray[0] === "byung_image"){
                    matchSentenceByByung();
                    footer_input.value = "";
                    scrollControl();
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
        let p_text = document.getElementById("container_content_text_p").innerText;
        // console.log(p_text);

        if (p_text === "안녕?"){
            if (targetArray[0] === "min_image"){
                matchSentenceByMin();
                footer_input.value = "";
                scrollControl();
            } else if (targetArray[0] === "byung_image"){
                matchSentenceByByung();
                footer_input.value = "";
                scrollControl();
            }
        } else{
            if (targetArray[0] === "min_image"){
                matchSentenceByMin();
                footer_input.value = "";
                scrollControl();
            } else if (targetArray[0] === "byung_image"){
                matchSentenceByByung();
                footer_input.value = "";
                scrollControl();
            }
        }
    }   
});
