console.log("Hello Test! Hello!");

const inpKey = document.getElementById("inpKey");
const inpValue = document.getElementById("inpValue");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");
const btnClear = document.getElementById("btnClear");
const sOutput = document.getElementById("sOutput");

btnInsert.addEventListener("click", onBtnInsertClick);
btnClear.addEventListener("click", onBtnClearClick);

f();

function onBtnClearClick() {
    localStorage.clear();
    location.reload();
}

function onBtnInsertClick() {
    var key = inpKey.value;
    var value = inpValue.value;
    if(key && value){
    var obj = {
        checked: false,
        value: value
    };

    var keyExist = localStorage.getItem(key);
    var existingValues = [];

    if(keyExist) {
        existingValues = JSON.parse(localStorage.getItem(key));
    }

    existingValues.push(obj);
    localStorage.setItem(key, JSON.stringify(existingValues));
    location.reload();
 }
} 


for(let i=0; i<localStorage.length;i++){
    const key = localStorage.key(i);
    // const value = localStorage.getItem(key);
    const obj = JSON.parse(localStorage.getItem(key));

     //lsOutput.innerHTML +=`<div><label><input type="checkbox" onchange="f(${i}, event)"/> ${key}: ${value}</label></div><br/>`;

     for(var j=0;j<obj.length; j++) {
         console.log(obj[j]);
         lsOutput.innerHTML +=`<div><label><input class="test" type="checkbox" `+ (obj[j].checked ? 'checked': '') +` value="${key}" onclick='handleClick(this, ${i}, ${j});'/>
          ${key}: ${obj[j].value} <button type="button" onclick='handleRemove(this, ${i}, ${j});' id="btnR">Remove</button>
            <button type="button" onclick='handleEdit(this, ${i}, ${j});' id="btnEdit">Update</button> <input type="text" class="up" id="updateField-${key}-${j}"> </label></div><br/>`;
     }
     
    //  lsOutput.innerHTML +=`<div><label><input class="test" type="checkbox" `+ (obj.checked ? 'checked': '') +` value="${key}" onclick='handleClick(this, ${i});'/> ${key}: ${obj.value} <button type="button" id="btnR">Remove</button></label></div><br/>`;


}

function handleClick(cb,index,val) {
   
   const key = localStorage.key(index);
    console.log("key=" + key);
    console.log("index="+index);
    console.log("j="+val);
    var objs = JSON.parse(localStorage.getItem(key));
    console.log("value=" + objs[val].value);

    // var obj = JSON.parse(localStorage.getItem(key));

    objs[val].checked = cb.checked;

    // localStorage.setItem(key, JSON.stringify(obj));
    localStorage.setItem(key, JSON.stringify(objs));

    f();

}


function f() {
    sOutput.innerHTML = '';
    for(let i=0; i<localStorage.length;i++){
        var k = localStorage.key(i);
        var obj = JSON.parse(localStorage.getItem(k));
        for(var j=0; j<obj.length;j++){
             if(obj[j].checked) {
            //sOutput.innerHTML += `${k}: ${obj[j].value} <br/>`;
            sOutput.innerHTML += `${k}<br/>`;
        }
        }
    }
}



function handleRemove(cb, index, objIndex){
    const key = localStorage.key(index);
    console.log("key="+key);
    console.log("objectIndex=" + objIndex);
    var objR = JSON.parse(localStorage.getItem(key));

    objR.splice(objIndex, 1);
    localStorage.setItem(key, JSON.stringify(objR));
    location.reload();
}

function handleEdit(cb, index, objIndex){
    var key = localStorage.key(index);
    var newVal = document.getElementById("updateField-"+key+"-"+objIndex).value;
    var objUpdate = JSON.parse(localStorage.getItem(key));
    if(newVal){
    objUpdate[objIndex].value = newVal;
    localStorage.setItem(key,JSON.stringify(objUpdate));
    location.reload();
    }
}