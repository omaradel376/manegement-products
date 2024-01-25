// Add Style To Tr
function trStyling() {
  let tr = document.querySelectorAll("tr");
  let array = Array.from(tr).slice(1);
  for (let i = 0; i < array.length; i++) {
    // select one one  add style on it
    if (array.indexOf(array[i]) % 2 != 1) {
      array[i].style.backgroundColor = "#009688";
    }
  }
}
// Select Elements From HTML File
let title = document.getElementById("title");
let price = document.getElementById("price");
let taksas = document.getElementById("taksas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.querySelector(".total span");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tbody = document.querySelector("tbody");
let deleteAll = document.getElementById("deleteAll");
let searchByTitleInput = document.getElementById("search-by-title");
let searchByCategoryInput = document.getElementById("search-by-category");

// Create Option Of Projuct
let submitMood = "create";
let tmp;
let objb;

// Create Array Which Save The Data On It
let array = [];
if (localStorage.product != null) {
  array = JSON.parse(localStorage.product);
} else {
  array = [];
}

// Handle Total Ruselt OF price and discount....
function handleTotal() {
  value = +price.value + +taksas.value + +ads.value - +discount.value;
  total.innerHTML = `${value}`;
}

// Click On Button
submit.onclick = function () {
  title.focus();
  // Create OBJ And Save Data On It
  let obj = {
    title: title.value,
    price: price.value,
    taksas: taksas.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    category: category.value,
    count: count.value,
  };

  // IF button is Create Add obj to the array
  if (submitMood == "create") {
    array.push(obj);
    submit.innerHTML = "Create";

    // IF button is update , update the project
  } else {
    array[tmp] = obj;
    submitMood = "create";
    submit.innerHTML = "Create";
  }

  localStorage.setItem("product", JSON.stringify(array));

  // Function Show Data
  showData();

  // Function Apply Styling On TR
  trStyling();
  deleteInputFiled();
};

// Function Show Data
function showData() {
  let table = "";
  for (let i = 0; i < array.length; i++) {
    // tmp = i;

    // create tr html element
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taksas}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td>${array[i].count}</td>
        <td><button onclick= deleteOne(${i}) id="delete">delete</button></td>
        <td><button onclick= update(${i}) id="update">update</button></td>
    </tr>
    `;
  }
  // add table to tbody to show it for user
  tbody.innerHTML = table;
}
showData();

// delete one select elemets
function deleteOne(i) {
  array.splice(i, 1);
  localStorage.product = JSON.stringify(array);
  showData();
  trStyling();
}

// function for update data
function update(i) {
  submitMood = "update";
  tmp = i; // to use (i) in globle scope
  submit.innerHTML = "Update";

  // when clcik on update key show data on inputs to update it
  title.value = array[i].title;
  price.value = array[i].price;
  taksas.value = array[i].taksas;
  ads.value = array[i].ads;
  discount.value = array[i].discount;
  total.innerHTML = array[i].total;
  category.value = array[i].category;
  count.value = array[i].count;
  scroll({
    behavior: "smooth",
    top: "0",
  });
}

// Function Apply Styling On TR
trStyling();

window.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    submit.click();
  }
});

// function delete all products when click on button delete all
function deleteAllProducts() {
  array.splice(0);
  localStorage.clear();
  showData();
}
// clicking delete all button
deleteAll.onclick = function () {
  deleteAllProducts();
  deleteInputFiled();
};

function deleteInputFiled() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

function searchByTitle() {
  let table = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].title.includes(searchByTitleInput.value)) {
      table += `
    <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taksas}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td>${array[i].count}</td>
        <td><button onclick= deleteOne(${i}) id="delete">delete</button></td>
        <td><button onclick= update(${i}) id="update">update</button></td>
    </tr>
    `;
    }
    // add table to tbody to show it for user
    tbody.innerHTML = table;
  }
  trStyling();
}

searchByTitleInput.oninput = function () {
  searchByTitle();
};

function searchByCategory() {
  let table = "";
  for (let i = 0; i < array.length; i++) {
    if (array[i].category.includes(searchByCategoryInput.value)) {
      table += `
    <tr>
        <td>${i + 1}</td>
        <td>${array[i].title}</td>
        <td>${array[i].price}</td>
        <td>${array[i].taksas}</td>
        <td>${array[i].ads}</td>
        <td>${array[i].discount}</td>
        <td>${array[i].total}</td>
        <td>${array[i].category}</td>
        <td>${array[i].count}</td>
        <td><button onclick= deleteOne(${i}) id="delete">delete</button></td>
        <td><button onclick= update(${i}) id="update">update</button></td>
    </tr>
    `;
    }
    // add table to tbody to show it for user
    tbody.innerHTML = table;
  }
  trStyling();
}

searchByCategoryInput.oninput = function () {
  searchByCategory();
};
