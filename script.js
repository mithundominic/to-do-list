let addList = document.getElementById("add-list");
let displayCard = document.getElementById("display-card");
let onEmptyWhenReload = document.getElementById("on-empty-when-reload");
let searchInput = document.getElementById("search-input");
let titleRequired = document.getElementById("title-Required");
let itemsJsonArray = [];

getAndUpdateReload();
// To keep the todo's after reload;
function getAndUpdateReload() {
  if (localStorage.getItem("itemsJson") === null) {
    onEmptyWhenReload.innerHTML = "Nothing to show! Add a list";
  } else {
    itemsJsonArrayString = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemsJsonArrayString);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  }
  update();
}

//function to store the title and description to local storage.
function getAndUpdate() {
  let titled = document.getElementById("id-title");
  let descript = document.getElementById("description");
  if (localStorage.getItem("itemsJson") === null) {
    itemsJsonArray.push([titled.value, descript.value]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  } else {
    itemsJsonArrayString = localStorage.getItem("itemsJson");
    itemsJsonArray = JSON.parse(itemsJsonArrayString);
    itemsJsonArray.push([titled.value, descript.value]);
    localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  }
  titled.value = "";
  descript.value = "";
  update();
  displayAlert();
  setTimeout(function () {
    ackNow.innerHTML = ``;
  }, 1000);
}

//function to set the title and description as entered by user to the card.
function update() {
  onEmptyWhenReload.innerHTML = "";
  let str = "";
  itemsJsonArray.forEach((element, index) => {
    str += `<div class="card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element[0]}</h5>
                    <p class="card-text">${element[1]}</p>
                    <button class="visib btn btn-primary positionOfTextandIcon mar" onclick="deleteCard(${index})">
                        <i class="material-icons icon positionOfTextandIcon">delete</i></button>
                </div>
            </div>`;
  });
  if (itemsJsonArray.length !== 0) {
    displayCard.innerHTML = str;
  } else {
    onEmptyWhenReload.innerHTML = "Nothing to show! Add a list";
  }
}

// function to display the alert to user after adding the card.
let ackNow = document.getElementById("acknow");
function displayAlert() {
  ackNowStr = "";
  itemsJsonArray.forEach(() => {
    ackNowStr = `<div class="alert alert-success alert-dismissible fade show mx-5 my-5" role="alert">
                <strong>hooray!!</strong> The TODO has been added.
            </div>`;
  });
  ackNow.innerHTML = ackNowStr;
}

function alertDelete() {
  let ackNow = document.getElementById("acknow");
  ackNowStr = "";
  itemsJsonArray.forEach(() => {
    ackNowStr = `<div id="cards" class="alert alert-danger alert-dismissible fade show mx-5 my-5" role="alert">
                <strong>OOPS!!</strong> The TODO has been deleted.
            </div>`;
  });
  ackNow.innerHTML = ackNowStr;
  setTimeout(function () {
    ackNow.innerHTML = ``;
  }, 1000);
}

// function to deleteCard
function deleteCard(itemIndex) {
  itemsJsonArrayString = localStorage.getItem("itemsJson");
  itemsJsonArray = JSON.parse(itemsJsonArrayString);
  let Card = document.querySelectorAll(".card");
  for (element of Card) {
    element.remove();
  }
  itemsJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemsJsonArray));
  update();
  alertDelete();
}

addList.addEventListener("click", getAndUpdate);
update();

// function to search within the cards
searchInput.addEventListener("input", function () {
  let inputValue = searchInput.value.toLowerCase();
  let displayCardsSearch = document.getElementsByClassName("card");
  Array.from(displayCardsSearch).forEach(function (element) {
    let cardTitle = element.getElementsByTagName("h5")[0].innerText;
    if (cardTitle.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

//function to clear all the cards present
function clearFullList() {
  if (
    confirm(
      "This action will clear all the lists that has been created.\nDo you wish to continue?"
    )
  ) {
    localStorage.setItem("itemsJson", JSON.stringify([]));
  }
  let Card = document.querySelectorAll(".card");
  for (element of Card) {
    element.remove();
  }
  onEmptyWhenReload.innerHTML = "Cleared everything! Add a new To Do";
}
