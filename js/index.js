var sName =document.getElementById('sitename');
var url = document.getElementById('weburl');

var inputsList = [];
if(localStorage.getItem('inputs')!=null){
    inputsList = JSON.parse(localStorage.getItem('inputs'))
    display()
}
function main(){
add();
display();
refill();
}

function add(){
  if(validationName()&&validationSite()==true){
    var inputs = {
        name : sName.value,
        link :url.value       
    };
    inputsList.push(inputs);
    localStorage.setItem('inputs',JSON.stringify(inputsList))
  }
  else{
    sName.classList.add('is-invalid');
    url.classList.add('is-invalid')
  }
}

function display(){
    var holder = ``
    for(var i = 0;i<inputsList.length;i++){
        holder+=`
        <tr>
        <td class="py-3">${i+1}</td>
        <td class="py-3">${inputsList[i].name}</td>

        <td class="py-3">
        <a href="${inputsList[i].link}" class=" text-decoration-none fw-semibold text-center" target="_blank">
        <button  class="text-white btn btn-success rounded-3 fw-semibold visit-link ">
          <i class="fa-solid fa-eye"></i> Visit
        </button>
        </a>
      </td>

          <td class="py-3"><button class="btn btn-danger rounded-3 fw-semibold delete-btn d-flex align-items-center gap-1 justify-content-center m-auto" onclick='delItems(${i})'><i class="fa-solid fa-trash-can"></i>
          Delete</button></td>
      </tr>`
    }
    document.getElementById('bodyID').innerHTML = holder;
}

function refill(){
    sName.value = '';
    url.value = '';
}

function delItems(x){
inputsList.splice(x,1)
localStorage.setItem('inputs',JSON.stringify(inputsList))
display()
}

function validationName(){
    var regexname = /^\w{3,}(\s+\w+)*$/;
    var text = sName.value;
    if(regexname.test(text)){
        sName.classList.add('is-valid')
        sName.classList.remove('is-invalid')
         return true
    }
    else{
        sName.classList.remove('is-valid')
        sName.classList.add('is-invalid')
        return false
    }
}

 function validationSite(){
var regexSite =/^(https:\/\/www\.)[A-z]{1,}(\.com\/)$/;
var site = url.value;
if(regexSite.test(site)){
    url.classList.add('is-valid')
    url.classList.remove('is-invalid')
     return true
}
else{
    url.classList.remove('is-valid')
    url.classList.add('is-invalid')
    return false
}
 }