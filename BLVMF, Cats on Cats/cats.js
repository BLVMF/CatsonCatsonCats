/* 
  Author : BLV MF
  Javascript for my kitty cat page  
*/

//Variables and constants
const catUrl =
  "https://api.thecatapi.com/v1/breeds?api_key=a7741e96-8dd2-439f-8f94-c22fe7353d65";

const categoryUrl = "https://api.thecatapi.com/v1/categories";

// ---------- Upon window load ------------

// When the page loads, this calls the function updateCatList
window.addEventListener("load", updateCatList);
window.addEventListener("load", updateCatCategories);

// Returns a list of cat breed objects
async function getCatList() {
  return await fetch(catUrl).then((response) => response.json());
}

// Returns a list Categories
async function catCategories() {
  return await fetch(categoryUrl).then((response) => response.json());
}

// ----------- Drop  Down Menus ------------------

// Add breed list to dropdown menu
async function updateCatList() {
  await getCatList().then(function (data) {
    // Get breed name
    for (element of data) {
      // Append to the select list

      let option = createOption(element);

      //Appends to HTML (over and over again)

      document.getElementById("catBreeds").appendChild(option);
    }
  });
}

// Add 'Cat' - egories to dropdown menu
async function updateCatCategories() {
  await catCategories().then(function (data) {
    // Get 'Cat'-egories
    for (element of data) {
      // Append 'Cat' - egories to select list
      let option = createOption(element);
      // Appends to HTML
      document.getElementById("cat-egory").appendChild(option);
    }
  });
}

// Create option function

function createOption(text) {
  let option = document.createElement("option");

  // Building option tags to see full name and gather ID

  option.textContent = text.name;
  option.value = text.id;

  // Returns the full name of each cat

  return option;
}

// ---------- Buttons -------

// Generates cat pic URL

async function showKitty(url) {
  return await fetch(url).then((response) => response.json());
}

// Breed Button
document
  .querySelector(".hereKitty")
  .addEventListener("click", async function () {
    // Meows when button is clicked
    const meow = new Audio("Meow/meow.mp3");
    meow.play();

    // Gets the value from user selected breed
    const cat = document.getElementById("catBreeds").value;
    // Generates a URL with breed selected
    const reqCat = `https://api.thecatapi.com/v1/images/search?breed_ids=${cat}`;

    // Displays requested cat

    await showKitty(reqCat).then(function (data) {
      document.querySelector(".catImage").src = data[0].url;
    });
  });

// Category Button

document
  .querySelector(".category")
  .addEventListener("click", async function () {
    // Meows when button is clicked
    const meow = new Audio("Meow/Angry-cat-sound-effect.mp3");
    meow.play();

    // Gets the value of user selected category
    const catCat = document.getElementById("cat-egory").value;
    // Generates a URL with category selected
    const reqCatCat = `https://api.thecatapi.com/v1/images/search?category_ids=${catCat}`;

    // Displays selected cat
    await showKitty(reqCatCat).then(function (data) {
      document.querySelector(".catImage").src = data[0].url;
    });
  });

// Random Cat Image

document
  .querySelector(".randomiser")
  .addEventListener("click", async function () {
    // Makes the cat meow

    const meow = new Audio("Meow/Meow-cat-sound-effect.mp3");
    meow.play();

    

    await getCatList().then(function (data) {
      // Generates a random ID # using the length of the array 
      let x = Math.floor(Math.random() * (data.length - 1));
      // Uses number generated to go to a random image
      document.querySelector(".catImage").src = data[x].image.url;
    });
  });
