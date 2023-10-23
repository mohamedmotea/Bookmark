var inpname = document.querySelector("[name = 'bookname']");
var inpsite = document.querySelector("[name = 'booksite']");
var sub = document.querySelector(".sub");
var tbBody = document.getElementById("tableBody");
var bookArr =[];
var waringName = document.createElement("p");
waringName.textContent = `Site Name Rules : 3 letters or More`;
var waringSite= document.createElement("p");
waringSite.textContent = `Site URL Rules :  ( http -OR-https  ) ://   sitename  (.com)`;
var waringrepeat = document.createElement("p");
waringrepeat.textContent = "The Name is repeated";


if(localStorage.getItem("book") === null) {
    bookArr = [];
}else {
    bookArr = JSON.parse(localStorage.getItem("book"));
    display();
}

sub.onclick = function(){
    var bookobj = {
        name:inpname.value,
        site:inpsite.value,
    }
    for(var i=0;i<bookArr.length;i++){
        if( inpname.value === bookArr[i].name){
              inpname.style = "box-shadow: 0 0 0 2px red;";

            return inpname.after(waringrepeat);
        }
    }
    if(inpnameValid() === true && inpsiteValid() === true){
        bookArr.push(bookobj);
        localStorage.setItem("book" , JSON.stringify(bookArr))
        display()
        reset()
    }else if(inpnameValid() === false ){
        
        inpname.after(waringName)

    }else if(inpsiteValid() === false){
        inpsite.after(waringSite);
    }
}

function display(){
    var show  = ``;
    for(var i = 0; i <bookArr.length;i++){
            show += `
                <tr>
                <td>${i+1}</td>
                <td>${bookArr[i].name}</td>
                <td><button class="btn btn-success"><a class="text-white decoration-none" href="${bookArr[i].site}" target="_blank"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
                <td><button onclick="dlt(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
              
            </tr>
            `
    }
    tbBody.innerHTML = show;
}

function reset() {
    inpname.value = "";
    inpsite.value = "";
}
function dlt(index) {
    bookArr.splice(index , 1);
    localStorage.setItem("book" , JSON.stringify(bookArr))
    display()
}
inpname.oninput = function (){
if(inpnameValid() === true){
    inpname.style = " box-shadow: 0 0 0 2px #BFD3BB;";
}else{
    inpname.style = " box-shadow: 0 0 0 2px red;";
}
}
inpsite.oninput = function (){
    if(inpsiteValid() === true){
        inpsite.style = " box-shadow: 0 0 0 2px #BFD3BB;";
    }else{
        inpsite.style = " box-shadow: 0 0 0 2px red;";
    }
    }
function inpnameValid (){
    var regName = /^[a-z|A-Z]{3,}/ ;
    var inpValue = inpname.value;

    if(regName.test(inpValue)){
        return true;
    }else{
        return false;
    }
}
function inpsiteValid(){
    var regSite = /(http|https):\/\/[a-z]{3,}.com/;
    var siteValue = inpsite.value;
    if(regSite.test(siteValue)){
        return true;
    }else{
        return false;
    }
}


