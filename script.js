let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let country = document.querySelector(".country ");
let category = document.querySelector(".category");
let count = document.querySelector(".count");
let mainarray = [];
let flag = "create";
let updatenum;
//// shoe button of delete all when mainarray has elemenet


//calculat total
function calctotal() {
    if (price.value != "" && !isNaN(parseInt(price.value))) {

        total.innerHTML = +(price.value) + (+ taxes.value) + (+ ads.value) - (+ discount.value);
        total.style.backgroundColor = 'green';


    }
    else {
        total.innerHTML = "enter numbers ";
        total.style.backgroundColor = "red"
    }

}

function create() {

   
        if (localStorage.getItem("device")) {
            mainarray = JSON.parse(localStorage.getItem("device"));
        }
        else {
            mainarray = [];
        }

        let device = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            country: country.value,
            category: category.value,


    }
    if(flag==="create"){
        if (parseInt(count.value) > 1) {
            for (let i = 0; i < count.value; i++) {
                mainarray.push(device);
            }
        }
        else {
            mainarray.push(device);
        }
    }
    else {
        mainarray[updatenum] = device;
        flag = "create";
        document.getElementsByClassName("create")[0].value = "create";
        document.getElementsByClassName("count")[0].style.display = "block";
      

    }
      
        localStorage.setItem("device", JSON.stringify(mainarray));

        price.value = title.value = taxes.value = taxes.value = ads.value = discount.value = total.value = count.value = country.value = category.value = "";
        showdata();

    }
  
     


    







    
  



/// function show info in table 
function showdata() {
    if (localStorage.getItem("device")) {
        document.querySelector("tbody").innerHTML = "";
        mainarray = JSON.parse(localStorage.getItem("device"));
        for (let i = 0; i < mainarray.length; i++) {
            let newrow = document.createElement("tr");
            newrow.innerHTML = `<tr>
        <td>${i}</td>
                <td>${mainarray[i].title}</td>
                <td>${mainarray[i].price}</td>
                <td>${mainarray[i].taxes}</td>
                <td>${mainarray[i].ads}</td>
                <td>${mainarray[i].discount}</td>
                <td>${mainarray[i].total}</td>
                <td>${mainarray[i].country}</td>
                <td>${mainarray[i].category}</td>
                <td><button onclick="update(${i})">update</button>
                </td>
                <td><button onclick="deleteelement(${i})">delete</button></td>
               

            </tr>`;
            document.querySelector("tbody").appendChild(newrow);
        }
    }
    document.getElementsByClassName("deleteall")[0].value = `Delete all (${mainarray.length})`;
    if (mainarray.length > 0) {
        document.getElementsByClassName("deleteall")[0].style.display = "block";
    }
    else {
        document.getElementsByClassName("deleteall")[0].style.display = "none";
    }
   

}
showdata();

function deleteelement(i) {
 
    let d = mainarray.splice(i, 1);

    localStorage.device = JSON.stringify(mainarray);
    showdata();

}
/////////// delete all element
function deleteall() {
    if (mainarray.length > 0) {
    

        document.querySelector("tbody").innerHTML = "";
        mainarray = [];
        localStorage.clear();
    }
    document.getElementsByClassName("deleteall")[0].value = `Delete all (${mainarray.length})`;
    if (mainarray.length > 0) {
        document.getElementsByClassName("deleteall")[0].style.display = "block";
    }
    else {
        document.getElementsByClassName("deleteall")[0].style.display = "none";
    }
    
}

function update(i) {
    title.value = mainarray[i].title;
    price.value = mainarray[i].price;
    taxes.value = mainarray[i].taxes;
    ads.value = mainarray[i].ads;
    discount.value = mainarray[i].discount;
    total.value = mainarray[i].total;
    country.value = mainarray[i].country;
    category.value = mainarray[i].category;
    document.getElementsByClassName("count")[0].style.display = "none";
    document.getElementsByClassName("create")[0].value = "update";
    updatenum = i;;
    flag = "update";
 

  
    
}
//////////////////search

let modesearch = "title";
function search(id) {
    document.getElementsByClassName("search")[0].focus();
    if (id == "searchcateogry") {
        document.getElementsByClassName("search")[0].placeholder = " search by cateogry";
        modesearch = "category";
      
    }
    if (id == "searchtitle") {
        document.getElementsByClassName("search")[0].placeholder = " search by title";
        modesearch = "title";
    }


}
function getsearchitem(searchitem) {
    let searcharray = [];
   
   
    for (let i = 0; i < mainarray.length; i++){
        if (mainarray[i][modesearch].includes(searchitem)) {
            
            searcharray.push(mainarray[i]);
        }
       
    }
    document.querySelector("tbody").innerHTML = "";
    for (let i = 0; i < searcharray.length; i++) {
        let newrow = document.createElement("tr");
        newrow.innerHTML = `<tr>
        <td>${i}</td>
                <td>${searcharray[i].title}</td>
                <td>${searcharray[i].price}</td>
                <td>${searcharray[i].taxes}</td>
                <td>${searcharray[i].ads}</td>
                <td>${searcharray[i].discount}</td>
                <td>${searcharray[i].total}</td>
                <td>${searcharray[i].country}</td>
                <td>${searcharray[i].category}</td>
                <td><button onclick="update(${i})">update</button>
                </td>
                <td><button onclick="deleteelement(${i})">delete</button></td>
               

            </tr>`;
        document.querySelector("tbody").appendChild(newrow);
    }
    
}