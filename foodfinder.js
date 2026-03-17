document.getElementById("searchBtn").addEventListener("click,fetchMeal");

async function fetchMeal() {
  const mealName = document.getElementById("mealInput").value.trim();
  const mealContainer = document.getElementById("mealContainer");
  const loader = document.getElementById("loader");

  // Clear previous results
  mealContainer.innerHTML = "";

  if (!mealName) {
    mealContainer.innerHTML = "<p>Please enter a meal name!</p>";
    return;
  }

  // Show loader
  loader.style.display = "block";

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    const data = await response.json();

    loader.style.display = "none";

    if (!data.meals) {
      mealContainer.innerHTML = "<p>No meals found!</p>";
      return;
    }

    // Limit to first 3 meals (bonus feature)
    const meals = data.meals.slice(0, 3);

    meals.forEach(meal => {
      const mealCard = document.createElement("div");
      mealCard.className = "meal-card";

      mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p>${meal.strInstructions.substring(0, 300)}...</p>
      `;

      mealContainer.appendChild(mealCard);
    });
  } catch (error) {
    loader.style.display = "none";
    mealContainer.innerHTML = "<p>Error fetching data. Please try again.</p>";
    console.error(error);
  }
}
