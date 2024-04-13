let Theinpuit = document.querySelector("#search");
let btn = document.querySelector(".search-btn");
let resultArea = document.querySelector(".result-area");
let dataArea = document.querySelector(".data-area");

btn.addEventListener("click", GetRecipe);

function GetRecipe() {
  let inputValue = Theinpuit.value.trim();
  let UrlApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${inputValue}`;

  fetch(UrlApi)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((repo) => {
      displayRecipes(repo);
    });
}

function displayRecipes(data) {
  resultArea.innerHTML = "";
  if (data.meals == null) {
    resultArea.innerHTML = "No Data ";
    return;
  }

  data.meals.forEach((meal) => {
    resultArea.innerHTML += `
      <div class="card">
        <div class="card-img">
          <img src="${meal.strMealThumb}" alt="" />
        </div>
        <h2>${meal.strMeal}</h2>
        <button class="get-recipe-btn" data-meal-id="${meal.idMeal}">Get Recipes</button>
      </div>`;
  });

  // Add event listeners to dynamically created buttons
  let getRecipeBtns = document.querySelectorAll(".get-recipe-btn");
  getRecipeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let mealId = btn.dataset.mealId;
      showDataArea(mealId);
    });
  });
}

function showDataArea(mealId) {
  // Fetch recipe details using mealId
  let recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetch(recipeUrl)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      // Display recipe details in dataArea
      dataArea.innerHTML = `
        <button class="close">close</button>
        <h2>${data.meals[0].strMeal}</h2>
        <p>Instructions:</p>
        <p>${data.meals[0].strInstructions}</p>
        <a href="#">Watch Video</a>
      `;
      dataArea.classList.remove("Showdetails");
    });
}

let closeBtns = document.querySelectorAll(".close");
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    dataArea.classList.remove("Showdetails");
  });
});
