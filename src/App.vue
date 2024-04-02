<script setup>
import Navigation from './components/Navigation.vue';
import RecipesCard from './components/RecipesCard.vue';
import Title from './components/Title.vue';

import { ref, onMounted } from 'vue';

const originalRecipes = ref([]); // Store original data
const recipes = ref([]);

const currentSortCriteria = ref('name');
const currentDifficultyFilter = ref('all');

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=50');
    const data = await response.json();
    originalRecipes.value = data.recipes; // Store original data
    recipes.value = [...data.recipes]; // Copy original data to recipes
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function sortRecipes(data, criteria) {
  return data.slice().sort((a, b) => {
    if (criteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (criteria === 'zname') {
      return b.name.localeCompare(a.name);
    } else if (criteria === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
}

function changeSortCriteria(newCriteria) {
  currentSortCriteria.value = newCriteria;
  recipes.value = sortRecipes(recipes.value, newCriteria);
}

function changeDifficultyFilter(newDifficultyFilter) {
  currentDifficultyFilter.value = newDifficultyFilter;

  if (newDifficultyFilter === 'all') {
    recipes.value = [...originalRecipes.value]; // Reset to original data
  } else {
    recipes.value = originalRecipes.value.filter(
      (recipe) => recipe.difficulty === newDifficultyFilter
    );
  }

  changeSortCriteria(currentSortCriteria.value); // Apply current sorting criteria
}
</script>

<template>
  <header>
    <Navigation />
  </header>

  <main class="bg-lime-100 pb-7">
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
  <footer class="p-5 text-center">
    <p>recipes.com</p>
  </footer>
</template>
