//  1*[get total]
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


//    *8[updata]
let mood = "create";
let tmp;

// //to test let sucsfull
// console.log(title,price,taxes,ads,total,count,category,submit)

function getTotal(){
if(price.value != ""){
      let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
      total.innerHTML = result;
      total.style.background = "#040";
}
else{
      total.innerHTML = "";
      total.style.background = "rgb(78, 0, 0)";

}
}


//  2*[create product]

let dataPro;
if (localStorage.product != null){
      dataPro =  JSON.parse(localStorage.product);
}
else {
      dataPro = [];
}
submit.onclick = function(){
let newPro = {
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase(),
}
//    6*[count create]
//    *8[updata]
if(title.value != ""
&&price.value != ""
&&category.value != ""
&&newPro.count < 100){
      if(mood === "create"){
      if(newPro.count > 1){
      for(let i = 0;i<newPro.count;i++)
      dataPro.push(newPro);
}else{      dataPro.push(newPro);
};
}else{dataPro[tmp]= newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
}clearDtat();
}

//  3*[save data to localStorage]
localStorage.setItem("product", JSON.stringify(dataPro));

showData();
}


//  4*[clear inputs]
function clearDtat(){
      title.value = "";
      price.value = "";
      taxes.value = "";
      ads.value = "";
      discount.value= "";
      total.innerHTML = "";
      count.value = "";
      category.value = "";
}


//    5*[read]
function showData(){
      getTotal()

let table = "";
for(let i = 0;i<dataPro.length; i++){
      table += `
      <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td>
      <button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `

}
document.getElementById("tbody").innerHTML = table;
//       *-8[show btton deleta all]
let btndelete = document.getElementById("deleteAll");
if(dataPro.length > 0){
btndelete.innerHTML = `<button onclick="deleteAll()">delete all (${dataPro.length})</button>`
}else{btndelete.innerHTML = ""}
};
showData();



//    7*[delete]
function deleteData(i){
  dataPro.splice(i,1);
  localStorage.product=JSON.stringify(dataPro);
  showData();
};

//       8*[deleta all]
function deleteAll(){
localStorage.clear();
dataPro.splice(0);
showData();
};
//    8*[updata]
function updateData(i){
      title.value = dataPro[i].title;
      price.value = dataPro[i].price;
      taxes.value = dataPro[i].taxes;
      ads.value = dataPro[i].ads;
      ads.value = dataPro[i].ads;
      discount.value = dataPro[i].discount;
      getTotal()
      count.style.display = "none";
      category.value = dataPro[i].category;
      submit.innerHTML = "Updata";
      mood = "update";
      tmp = i;
      scroll({top:0,
            behavior:"smooth"
      })
      
}


//    9*[search]
let searchMood = "title";

function getSerchMood(id){
      let search = document.getElementById("search");
      if(id == "searchTitle"){
      searchMood = "title";
      search.placeholder = "Search By Title";
}else{
      searchMood = "caregory";
search.placeholder = "Search By Category";
}
search.focus();
search.value ="";
showData();
}

function searchData(value){
let table = "";
if(searchMood == "title"){
for(let i = 0; i < dataPro.length; i++){
      if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
      }
}
}else{for(let i = 0; i < dataPro.length; i++){
      if(dataPro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>
            <button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `
      }
}


}document.getElementById("tbody").innerHTML = table;

}



//    10*[claen data]
