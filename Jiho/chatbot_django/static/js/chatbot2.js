"use strict";

// 누구누구님 Ozz Chat-Bot에 오신걸 환영합니다.
const user_name = prompt("닉네임을 입력해주세요.");
const greetingFunc = () => {
    let greetingP = document.getElementById("header_main_greeting_p");
    greetingP.innerHTML = `${user_name}님`+ `<br/>` +`Ozz Chat-Bot에 오신걸 환영합니다.`;

    setInterval(() => {
        const index = document.getElementById("index");
        index.style.display = "none";
    }, 2000);
    
    setInterval(() => {
        const body_container = document.getElementById("body_container");
        body_container.style.display = "block";
    },2060);    
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

// console.log(parent_container);
var wss_protocol = (window.location.protocol == 'https:') ? 'wss://': 'ws://';
var chatSocket = new WebSocket(
        wss_protocol + window.location.host + '/ws/chat/'
        );

// 메시지 받았을 때 처리하는 부분
chatSocket.onmessage = function(e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        if (targetArray[0] === "min_image"){
            matchSentenceByMin(message);
            scrollControl();
        } else if (targetArray[0] === "byung_image"){
            matchSentenceByByung(message);
            scrollControl();
        }
    };

chatSocket.onclose = function(e) {
    // 통신 끊겼을 때 알려주는 부분
};


const imgClickList = document.getElementsByClassName("container_header_img");
const firstmessage = "주문하시겠어요?"
const createMinElem = () => {
    let today = new Date();
    let newMinDiv = document.createElement("div");
    let newMinDivContainer = document.createElement("div");
    let newMinDivContainerTextTime = document.createElement("div");
    let newMinImg = document.createElement("img");
    let newMinP = document.createElement("p");
    let newMinNameP = document.createElement("p");
    let newMinTimeP = document.createElement("p");
    newMinDiv.setAttribute("class", "container_content");
    newMinDivContainer.setAttribute("class", "container_content_p");
    newMinDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newMinImg.setAttribute("src", "static/assets/minjong.png");
    newMinImg.setAttribute("alt", "min_image");
    newMinNameP.setAttribute("class", "container_content_name");
    newMinTimeP.setAttribute("class", "container_content_time");
    newMinP.setAttribute("class", "container_content_text_p");
    newMinNameP.append("Ozz min~");
    newMinTimeP.append(`${today.getHours()}:${today.getMinutes()}`);
    newMinP.append(firstmessage);
    parent_container.appendChild(newMinDiv);
    newMinDiv.appendChild(newMinImg);
    newMinDiv.appendChild(newMinDivContainer);
    
    newMinDivContainer.appendChild(newMinNameP);
    newMinDivContainer.appendChild(newMinDivContainerTextTime);

    newMinDivContainerTextTime.appendChild(newMinP);
    newMinDivContainerTextTime.appendChild(newMinTimeP);
}

const createByungElem = () => {
    let today = new Date();
    let newByungDiv = document.createElement("div");
    let newByungDivContainer = document.createElement("div");
    let newByungDivContainerTextTime = document.createElement("div");
    let newByungImg = document.createElement("img");
    let newByungP = document.createElement("p");
    let newByungNameP = document.createElement("p");
    let newByungTimeP = document.createElement("p");
    newByungDiv.setAttribute("class", "container_content");
    newByungDivContainer.setAttribute("class", "container_content_p");
    newByungDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newByungImg.setAttribute("src", "static/assets/gong.jpg");
    newByungImg.setAttribute("alt", "byung_image");
    newByungNameP.setAttribute("class", "container_content_name");
    newByungTimeP.setAttribute("class", "container_content_time");
    newByungP.setAttribute("class", "container_content_text_p");
    newByungNameP.append("Ozz gong~");
    newByungTimeP.append(`${today.getHours()}:${today.getMinutes()}`);
    newByungP.append(firstmessage);
    parent_container.appendChild(newByungDiv);
    newByungDiv.appendChild(newByungImg);
    newByungDiv.appendChild(newByungDivContainer);

    newByungDivContainer.appendChild(newByungNameP);
    newByungDivContainer.appendChild(newByungDivContainerTextTime);

    newByungDivContainerTextTime.appendChild(newByungP);
    newByungDivContainerTextTime.appendChild(newByungTimeP);
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
    let newDivContainerTextTime = document.createElement("div");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    let newNameP = document.createElement("p");
    let newTimeP = document.createElement("p");
    newDiv.setAttribute("class", "container_content_user");
    newDivContainer.setAttribute("class", "container_content_p");
    newDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newImg.setAttribute("src", "static/assets/user-man.jpg");
    newImg.setAttribute("alt", "user_image");
    newP.setAttribute("class", "container_content_text_p");
    newP.setAttribute("id", "container_content_text_p");
    newNameP.setAttribute("class", "container_content_name");
    newTimeP.setAttribute("class", "container_content_time");
    newNameP.append(user_name);
    newTimeP.append(`${today.getHours()}:${today.getMinutes()}`)
    newP.append(input_value);
    parent_container.appendChild(newDiv);
    newDiv.appendChild(newDivContainer);

    newDivContainer.appendChild(newNameP);
    newDivContainer.appendChild(newDivContainerTextTime);
    newDivContainerTextTime.appendChild(newTimeP);
    newDivContainerTextTime.appendChild(newP);

    newDiv.appendChild(newImg);
    scrollControl();
}


const matchSentenceByMin = (message) => {
    let today = new Date();
    let newByMinDiv = document.createElement("div");
    let newByMinDivContainer = document.createElement("div");
    let newByMinDivContainerTextTime = document.createElement("div");
    let newByMinImg = document.createElement("img");
    let newByMinP = document.createElement("p");
    let newByMinNameP = document.createElement("p");
    let newByMinTimeP = document.createElement("p");
    newByMinDiv.setAttribute("class", "container_content");
    newByMinDivContainer.setAttribute("class", "container_content_p");
    newByMinDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newByMinImg.setAttribute("src", "static/assets/minjong.png");
    newByMinImg.setAttribute("alt", "min_image");
    newByMinNameP.setAttribute("class", "container_content_name");
    newByMinTimeP.setAttribute("class", "container_content_time");
    newByMinP.setAttribute("id", "container_content_text_p");
    newByMinP.setAttribute("class", "container_content_text_p");
    newByMinNameP.append("Ozz min~");
    newByMinTimeP.append(`${today.getHours()}:${today.getMinutes()}`)
    newByMinP.append(message);
    setTimeout(() => {
        parent_container.appendChild(newByMinDiv);
        newByMinDiv.appendChild(newByMinImg);
        newByMinDiv.appendChild(newByMinDivContainer);

        newByMinDivContainer.appendChild(newByMinNameP);
        newByMinDivContainer.appendChild(newByMinDivContainerTextTime);
        
        newByMinDivContainerTextTime.appendChild(newByMinP);
        newByMinDivContainerTextTime.appendChild(newByMinTimeP);
        scrollControl();
    }, 1000); 
}

const matchSentenceByByung = (message) => {
    let today = new Date();
    let newByByungDiv = document.createElement("div");
    let newByByungDivContainer = document.createElement("div");
    let newByByungDivContainerTextTime = document.createElement("div");
    let newByByungImg = document.createElement("img");
    let newByByungP = document.createElement("p");
    let newByByungNameP = document.createElement("p");
    let newByByungTimeP = document.createElement("p");
    newByByungDiv.setAttribute("class", "container_content");
    newByByungDivContainer.setAttribute("class", "container_content_p");
    newByByungDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newByByungImg.setAttribute("src", "static/assets/gong.jpg");
    newByByungImg.setAttribute("alt", "byung_image");
    newByByungNameP.setAttribute("class", "container_content_name");
    newByByungTimeP.setAttribute("class", "container_content_time");
    newByByungP.setAttribute("id", "container_content_text_p");
    newByByungP.setAttribute("class", "container_content_text_p");
    newByByungNameP.append("Ozz gong~");
    newByByungTimeP.append(`${today.getHours()}:${today.getMinutes()}`)
    newByByungP.append(message);
    setTimeout(() => {
        parent_container.appendChild(newByByungDiv);
        newByByungDiv.appendChild(newByByungImg);
        newByByungDiv.appendChild(newByByungDivContainer);

        newByByungDivContainer.appendChild(newByByungNameP);
        newByByungDivContainer.appendChild(newByByungDivContainerTextTime);

        newByByungDivContainerTextTime.appendChild(newByByungP);
        newByByungDivContainerTextTime.appendChild(newByByungTimeP);

        scrollControl();
    }, 1000);
}

footer_input.addEventListener("keydown", (event) => {
     if (event.keyCode === 13){ // enter, return
        document.querySelector('#footer_button').click();
    }
});

footer_button.addEventListener("click", (event) => {
    if (footer_input.value.length === 0){
        alert("입력하고 눌러 이년아!");
        event.preventDefault();
    } else{
        createElem();
        let messageInputDom = document.querySelector('#footer_input');
        let message = messageInputDom.value;
        console.log(message);

        // 메세지 받아서 전송하는 부분
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        footer_input.value = "";
        scrollControl();
    }   
});
