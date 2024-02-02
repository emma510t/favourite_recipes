<script setup>
import Navigation from './components/Navigation.vue'
import RecipesCard from './components/RecipesCard.vue'
import Title from './components/Title.vue';
import Button from './components/Button.vue';

import { ref, onMounted } from 'vue';

// Define your variables using ref
const recipes = ref([]);

const currentSortCriteria = ref('name');

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/recipes?limit=50');
    const data = await response.json();
    console.log('Fetched Data:', data.recipes);
    recipes.value = sortRecipes(data.recipes, currentSortCriteria.value);
  }  catch (error) {
    console.error('Error fetching data:', error);
  }
});

function sortRecipes(data, criteria) {
  return data.slice().sort((a, b) => {
    if (criteria === 'name') {
      return a.name.localeCompare(b.name);
    }   else if (criteria === 'zname') {
      return b.name.localeCompare(a.name);
    }
    else if (criteria === 'easy') {
return a.difficulty.localeCompare(b.difficulty);
    } else if (criteria === 'medium') {
return b.difficulty.localeCompare(a.difficulty);
    }else if (criteria === 'rating') {
      return b.rating - a.rating; // Sort in descending order based on rating
    } 
    // Add more criteria as needed
    return 0;
  });
}

function changeSortCriteria(newCriteria) {
  currentSortCriteria.value = newCriteria;
  recipes.value = sortRecipes(recipes.value, newCriteria);
}


</script>

<template>
  <header>
   <Navigation></Navigation>
  </header>

  <main class="bg-lime-100">
    <div class=" max-w-screen-xl m-auto">

      <Title title="My Recipes"/>
      
      <h3>Sort your recipies</h3>
      <div class="flex gap-3 m-auto p">
         <Button @click="changeSortCriteria('name')" text="Name a-z"/>
         <Button @click="changeSortCriteria('zname')" text="Name z-a"/>
         <Button @click="changeSortCriteria('rating')" text="Stars"/>
         <Button @click="changeSortCriteria('easy')" text="Easy"/>
         <Button @click="changeSortCriteria('medium')" text="Medium"/>
         <!-- Add more buttons for additional criteria if needed -->
       </div>
   
      <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
   <RecipesCard v-for="recipe in recipes" :key="recipe.id" :name="recipe.name" :rat="recipe.rating" :time="recipe.prepTimeMinutes+recipe.cookTimeMinutes" :diff="recipe.difficulty" :img="recipe.image" :serv="recipe.servings"/>
   
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
 -->