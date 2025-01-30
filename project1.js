//get elements
{
  let title = document.getElementById("title");
  let price = document.getElementById("price");
  let taxes = document.getElementById("taxes");
  let ads = document.getElementById("ads");
  let discount = document.getElementById("discount");
  let total = document.getElementById("total");
  let count = document.getElementById("count");
  let category = document.getElementById("category");
  let create = document.getElementById("create");
  let search = document.getElementById("search");
  let searchByTitle = document.getElementById("search-by-title");
  let searchByCategory = document.getElementById("search-by-category");
  let tbody = document.getElementById("tbody");
  let cancel = document.getElementById("cancel");
}
let btnMood = "create";
let temp;
// get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerText = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerText = "";
    total.style.backgroundColor = "rgb(186, 0, 0)";
  }
}
///////////////////////////////////////////////////////////
//create product
let newData = [];
if (localStorage.product != null) {
  newData = JSON.parse(localStorage.product);
}
create.onclick = function () {
  //////////////////////////////////
  //take data
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  /////////////////////////////
  if (newProduct.title != "") {
    if (count.value == "") {
      count.value = "1";
    }
    if (btnMood == "create") {
      for (let i = 0; i < +count.value; i++) {
        newData.push(newProduct);
      }
    } else {
      newData[temp] = newProduct;
      count.style.display = "block";
      create.innerHTML = "Create";
      btnMood = "create";
      cancel.innerHTML = ``;
    }
    clearInputs();
    getTotal();
  } else {
    create.style.backgroundColor = "red";
    create.innerHTML = "Please Enter The Title";
    setTimeout(() => {
      create.innerHTML = "Create";
      create.style.backgroundColor = "rgb(201, 9, 222)";
    }, 2000);
  }
  /////////////////////////////
  //save data in local storage
  localStorage.setItem("product", JSON.stringify(newData));
  show();
};

////////////////////////////////////////////////////////////////
//clear inputs
function clearInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
//////////////////////////////////////////////////////////////////////
//read
show();
function show() {
  let rows = "";
  for (let i = 0; i < newData.length; i++) {
    rows += `
    <tr>
    <td>${i + 1}</td>
    <td>${newData[i].title}</td>
    <td>${newData[i].price}</td>
    <td>${newData[i].taxes}</td>
    <td>${newData[i].ads}</td>
    <td>${newData[i].discount}</td>
    <td>${newData[i].total}</td>
    <td>${newData[i].category}</td>
    <td><button onclick="update(${i})" id="update">Update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
    </tr>`;
  }
  tbody.innerHTML = rows;
  btnForDeleteAll();
}
//localStorage.clear();
//////////////////////////////////////////////////////////////////
//delete
function deleteItem(i) {
  newData.splice(i, 1);
  localStorage.product = JSON.stringify(newData);
  show();
}
/////////////////////////////////////////////////////////////////
//delete all
function btnForDeleteAll() {
  let btnDeleteAll = document.getElementById("deleteAll");
  if (newData.length != 0) {
    btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${newData.length})</button>`;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
}
function deleteAll() {
  if (confirm("you will delete all data")) {
    newData.splice(0);
    localStorage.clear();
    show();
  }
}
/////////////////////////////////////////////////////////////////////////
//count
////////////////////////////////////////////////////////////////////////
//update
function update(i) {
  btnMood = "update";
  count.style.display = "none";
  title.value = newData[i].title;
  price.value = newData[i].price;
  taxes.value = newData[i].taxes;
  ads.value = newData[i].ads;
  discount.value = newData[i].discount;
  category.value = newData[i].category;
  getTotal();
  temp = i;
  create.innerHTML = "Update";
  cancel.innerHTML = `<button>Cancel</button>`;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
///////////////////////////
cancel.onclick = function () {
  clearInputs();
  cancel.innerHTML = ``;
  count.style.display = "block";
  create.innerHTML = "Create";
  btnMood = "create";
};
/////////////////////////////////////////////////////////////////////
//search
let searchMood = "search-by-title";
function btnSearch(id) {
  search.focus();
  if (id == "search-by-title") {
    searchMood = "search-by-title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "search-by-category";
    search.placeholder = "Search By Category";
  }
  search.value = "";
  show();
}
//////////////////////////////
function searchFunction(value) {
  let rows = "";
  for (let i = 0; i < newData.length; i++) {
    if (searchMood == "search-by-title") {
      if (newData[i].title.includes(value.toLowerCase())) {
        rows += `
        <tr>
        <td>${i + 1}</td>
        <td>${newData[i].title}</td>
        <td>${newData[i].price}</td>
        <td>${newData[i].taxes}</td>
        <td>${newData[i].ads}</td>
        <td>${newData[i].discount}</td>
        <td>${newData[i].total}</td>
        <td>${newData[i].category}</td>
        <td><button onclick="update(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    } else {
      if (newData[i].category.includes(value.toLowerCase())) {
        rows += `
        <tr>
        <td>${i + 1}</td>
        <td>${newData[i].title}</td>
        <td>${newData[i].price}</td>
        <td>${newData[i].taxes}</td>
        <td>${newData[i].ads}</td>
        <td>${newData[i].discount}</td>
        <td>${newData[i].total}</td>
        <td>${newData[i].category}</td>
        <td><button onclick="update(${i})" id="update">Update</button></td>
        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>`;
      }
    }
  }
  tbody.innerHTML = rows;
}
////////////////////////////////////////////////////////////////////////////////
//clean data
