<script setup>
import Navigation from "./components/Navigation.vue";
import RecipesCard from "./components/RecipesCard.vue";
import Title from "./components/Title.vue";

import { ref, onMounted } from "vue";

// Define your variables using ref
const recipes = ref([]);
const easyRecipes = ref(recipes);
const mediumRecipes = ref(recipes);

const currentSortCriteria = ref("name");
const currentDifficultyFilter = ref("all");

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes?limit=50");
    const data = await response.json();
    console.log("Fetched Data:", data.recipes);
    console.log(
      "Fetched filterede?:",
      sortRecipes(
        data.recipes,
        currentSortCriteria.value,
        currentDifficultyFilter.value
      )
    );
    recipes.value = sortRecipes(
      data.recipes,
      currentSortCriteria.value,
      currentDifficultyFilter.value
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function sortRecipes(data, criteria, difficultyFilter) {
  console.log("Sort Input yay:", data, criteria, difficultyFilter);
  return data
    .filter(
      (recipe) =>
        difficultyFilter === "all" || recipe.difficulty === difficultyFilter
    )
    .slice()
    .sort((a, b) => {
      if (criteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (criteria === "zname") {
        return b.name.localeCompare(a.name);
      } else if (criteria === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
}

function changeSortCriteria(newCriteria) {
  currentSortCriteria.value = newCriteria;
  recipes.value = sortRecipes(
    recipes.value,
    newCriteria,
    currentDifficultyFilter.value
  );
  console.log(
    "changeSortCriteria:",
    recipes.value,
    currentSortCriteria.value,
    currentDifficultyFilter.value
  );
}

function changeDifficultyFilter(newDifficultyFilter) {
  currentDifficultyFilter.value = newDifficultyFilter;
  console.log(
    "Before filtering:",
    recipes.value,
    currentSortCriteria.value,
    currentDifficultyFilter.value
  );

  recipes.value = sortRecipes(
    recipes.value,
    currentSortCriteria.value,
    currentDifficultyFilter.value
  );

  console.log(
    "After filtering:",
    recipes.value,
    currentSortCriteria.value,
    currentDifficultyFilter.value
  );
}
</script>

<template>
  <header>
    <Navigation></Navigation>
  </header>

  <main class="bg-lime-100">
    <div class="max-w-screen-xl m-auto">
      <Title title="My Recipes" />

      <form class="bg-white rounded-lg py-3 px-5">
        <h3 class="text-lg font-semibold">Filters</h3>

        <div class="flex gap-3 flex-wrap">
          <div class="flex gap-2 items-baseline text-lime-900">
            <label for="dif">Choose difficulty</label>
            <select
              name="difficulty"
              id="dif"
              class="bg-white p-1 rounded border-solid border-2 border-lime-900 text-lime-900"
              @change="changeDifficultyFilter($event.target.value)"
            >
              <option value="all">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
            </select>
          </div>
          <div class="flex gap-2 items-baseline text-lime-900">
            <label for="sort">Sort by</label>
            <select
              name="sortby"
              id="sort"
              class="bg-white p-1 rounded border-solid border-2 border-lime-900 text-lime-900"
              @change="changeSortCriteria($event.target.value)"
            >
              <option value="name">Name a-z</option>
              <option value="zname">Name z-a</option>
              <option value="rating">Stars</option>
            </select>
          </div>
        </div>
      </form>
      <!--      <div class="flex gap-3 m-auto p">
         <Button @click="changeSortCriteria('name')" text="Name a-z"/>
         <Button @click="changeSortCriteria('zname')" text="Name z-a"/>
         <Button @click="changeSortCriteria('rating')" text="Stars"/>
         <Button @click="changeSortCriteria('easy')" text="Easy"/>
         <Button @click="changeSortCriteria('medium')" text="Medium"/>
       
       </div> -->

      <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        <RecipesCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :name="recipe.name"
          :rat="recipe.rating"
          :time="recipe.prepTimeMinutes + recipe.cookTimeMinutes"
          :diff="recipe.difficulty"
          :img="recipe.image"
          :serv="recipe.servings"
        />
      </section>
    </div>
  </main>
  <footer>
    <p>recipes.com</p>
  </footer>
</template>

<!-- <style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

else if (criteria === 'easy') {
     
        return a.difficulty.localeCompare(b.difficulty);
      } else if (criteria === 'medium') {
        return b.difficulty.localeCompare(a.difficulty);
      }
 -->
