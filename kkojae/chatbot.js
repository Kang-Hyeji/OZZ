const footer_button = document.getElementById("footer_button");
const footer_input = document.getElementById("footer_input");
const parent_container = document.getElementById("container");
// console.log(parent_container);

const create_elem = function(){
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
    document.getElementById("container_content_jae_p").innerText = input_value;
}


footer_button.addEventListener("click", function(event){
    if (footer_input.value.length === 0){
        event.preventDefault();
    } else{
        create_elem();
        let p_text = document.getElementById("container_content_jae_p").innerText;
        console.log(p_text);

        if (p_text === "나 사랑해?"){
            let newDiv2 = document.createElement("div");
            let newP2 = document.createElement("p");
            let newImg2 = document.createElement("img");
            newDiv2.setAttribute("class", "container_content");
            newP2.setAttribute("id", "container_content_min_p");
            newImg2.setAttribute("src", "./minjong.png");
            parent_container.appendChild(newDiv2);
            newDiv2.appendChild(newImg2);
            newDiv2.appendChild(newP2);
            setTimeout(() => {
                document.getElementById("container_content_min_p").innerText = "음....난 병헌이를 사랑해..."
            }, 2000);            
        }
    }   
})
