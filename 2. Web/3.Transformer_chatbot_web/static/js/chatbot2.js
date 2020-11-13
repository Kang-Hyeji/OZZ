"use strict";

// input 값 가지고 오기.
const index_input = document.querySelector("#index_input");
const index_button = document.querySelector("#index_button");
let user_name = "";

index_input.addEventListener("keydown", (event)=>{
    if (event.keyCode === 13){
        index_button.click();
    }
})

// home화면 닉네임 입력후 화면 전환
index_button.addEventListener("click", (event) => {
    if (index_input.value.length === 0){
        alert("닉네임을 입력해주세요!");
        event.preventDefault();
    } else{
        user_name = index_input.value;
        // dropdown menu h3에 username 입력
        const dropdown_menu_user_name = document.querySelector("#dropdown_menu_user_name");
        dropdown_menu_user_name.textContent = `${user_name} 님`;

        const index = document.getElementById("index");
        index.style.display = "none";

        const body_container = document.getElementById("body_container");
        body_container.style.display = "block";

        setTimeout(() => {
            createMinElem();
        }, 1000);
    }
});

// 스크롤 내려주는 함수
const scrollControl = ()=>{
    const scrollControl = document.getElementById("container");
    scrollControl.scrollTop = scrollControl.scrollHeight;        
}

// dropdown control 함수
const dropdown_control = (dropdownMenu, className) => {
    if (this.active){
        dropdownMenu.classList.remove(className);
    }else{
        dropdownMenu.classList.add(className);
    }
    this.active = !this.active;
}

// 시간 interval
setInterval(() => {
    const todayDateTime = new Date();
    const header_date_time = document.getElementById("header_main_date_time");
    const index_header_date_time = document.querySelector("#index_header_main_date_time");
    const greeting_date_time = document.querySelector("#greeting_index_header_main_date_time");
    header_date_time.innerText = todayDateTime.toLocaleTimeString();
    index_header_date_time.innerText = todayDateTime.toLocaleTimeString();
    greeting_date_time.innerText = todayDateTime.toLocaleTimeString();
}, 1000);


// home button 눌렀을 때와 reset 버튼 눌렀을때 이벤트 발생.
const home = document.querySelector("#header_content_home");
home.addEventListener("click", () => {
    location.reload();
})

// reset button event --> 대화창 clear해준다.
const reset = document.getElementById("header_content_reset");
reset.addEventListener("click", () => {
    const chat_content = document.querySelectorAll(".container_content");
    const user_content = document.querySelectorAll(".container_content_user");
    chat_content.forEach(content => content.remove());
    user_content.forEach(content => content.remove());
    setTimeout(() => {
        createMinElem();
    }, 1000);
})

// 전화기 눌렀을 때 이벤트 발생
const tel_icon = document.querySelector("#container_header_icon_tel");
const tel_number = document.querySelector("#container_header_icon_tel_number");
tel_icon.addEventListener("click", ()=>{
    if (this.active){
        tel_number.classList.remove("active");
        tel_icon.style.boxShadow = "";
    } else{
        tel_number.classList.add("active");
        tel_icon.style.boxShadow = "0px 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0,0,0,0.08)";
    }
    this.active = !this.active;
});
tel_icon.active = false;

// menu icon click event
const menu_icon = document.querySelector("#container_header_menu_icon");
const dropdown_menu = document.querySelector("#container_header_dropdown_menu");
menu_icon.addEventListener("click", () => {
    dropdown_control(dropdown_menu, "menu_active");
});
menu_icon.active = false;


var wss_protocol = (window.location.protocol == 'https:') ? 'wss://': 'ws://';
var chatSocket = new WebSocket(
        wss_protocol + window.location.host + '/ws/chat/'
);

// 메시지 받았을 때 처리하는 부분
chatSocket.onmessage = function(e) {
    let data = JSON.parse(e.data);
    let message = data['message'];
    if (targetArray[0] === "conghyoo-image"){
        matchSentenceByMin(message);
        scrollControl();
    }
};

chatSocket.onclose = function(e) {
    // 통신 끊겼을 때 알려주는 부분
};

const parent_container = document.getElementById("container");
const imgClickList = document.getElementsByClassName("container_header_img");
const firstmessage = "안녕하세요~ 콩휴입니다! 무엇을 도와 드릴까요?"
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
    newMinDiv.setAttribute("id", "container_content");
    newMinDivContainer.setAttribute("class", "container_content_p");
    newMinDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newMinImg.setAttribute("src", "static/assets/user-man.jpg");
    newMinImg.setAttribute("alt", "conghyoo-image");
    newMinNameP.setAttribute("class", "container_content_name");
    newMinTimeP.setAttribute("class", "container_content_time");
    newMinP.setAttribute("class", "container_content_text_p");
    newMinNameP.append("콩휴");
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

const targetArray = ["conghyoo-image"];

const footer_input = document.getElementById("footer_input");
const footer_button = document.getElementById("footer_button");

// user chating
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
    newDiv.setAttribute("id", "container_content_user");
    newDivContainer.setAttribute("class", "container_content_p");
    newDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newImg.setAttribute("src", "static/assets/user-woman.jpg");
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

// chatbot chating
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
    newByMinDiv.setAttribute("id", "conatainer_content");
    newByMinDivContainer.setAttribute("class", "container_content_p");
    newByMinDivContainerTextTime.setAttribute("class", "container_content_p_text_time");
    newByMinImg.setAttribute("src", "static/assets/user-man.jpg");
    newByMinImg.setAttribute("alt", "conghyoo-image");
    newByMinNameP.setAttribute("class", "container_content_name");
    newByMinTimeP.setAttribute("class", "container_content_time");
    newByMinP.setAttribute("id", "container_content_text_p");
    newByMinP.setAttribute("class", "container_content_text_p");
    newByMinNameP.append("콩휴");
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


// enter key event
footer_input.addEventListener("keydown", (event) => {
     if (event.keyCode === 13){ // enter, return
        document.querySelector('#footer_button').click();
    }
});

// click event
footer_button.addEventListener("click", (event) => {
    if (footer_input.value.length === 0){
        alert("메세지를 입력해주세요!");
        event.preventDefault();
    } else{
        createElem();
        let messageInputDom = document.querySelector('#footer_input');
        let message = messageInputDom.value;
        // console.log(message);

        // 메세지 받아서 전송하는 부분
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        footer_input.value = "";
        scrollControl();
    }   
});

// footer icon click event
const footer_emoticon = document.querySelector("#footer_emoticon");
const footer_paperclip = document.querySelector("#footer_paperclip");
const footer_microphone = document.querySelector("#footer_microphone");
const footer_icon_dropdown_menu = document.querySelector("#footer_icon_dropdown_menu");

footer_emoticon.addEventListener("click", () => {
    dropdown_control(footer_icon_dropdown_menu, "footer_icon_dropdown_menu_active");
});
footer_emoticon.active = false;

footer_microphone.addEventListener("click", () => {
    dropdown_control(footer_icon_dropdown_menu, "footer_icon_dropdown_menu_active");
});
footer_microphone.active = false;

footer_paperclip.addEventListener("click", () => {
    dropdown_control(footer_icon_dropdown_menu, "footer_icon_dropdown_menu_active");
});
footer_paperclip.active = false;

// greeting message logout 클릭시 event 발생
const greeting_message = document.querySelector("#greeting_message");
const logout = document.querySelector("#logout");
const body_container = document.querySelector("#body_container");
const greeting_index = document.querySelector("#greeting_index");
logout.addEventListener("click",()=>{
    greeting_message.style.display = "flex";
    // body_container.classList.add("body_container_active");
    body_container.style.display = "none";
    greeting_index.style.display = "flex";
});

// return home click event
const returnIcon = document.querySelector("#greeting_message_return");
returnIcon.addEventListener("click", () => {
    location.reload();
});