<script setup>
import Button from './Button.vue';

import { ref } from 'vue';

const props = defineProps([
  'name',
  'img',
  'rat',
  'time',
  'diff',
  'serv'
]);

const serv = ref(props.serv);
const serving = serv.value === 1 ? "serving" : "servings";

</script>

<template>
    <article class="bg-white rounded-xl flex flex-col">
        <div class="rounded-t-xl aspect-[4/2] w-full bg-sky-600 truncate">
            <img :src="img" alt="dish">
        </div>
        <div class="p-5 flex flex-col flex-grow justify-between">
          <div class="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fbbf24" class="bi bi-star-fill" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            <p class="text-slate-600 text-sm"> {{ rat }}</p>
          </div>
          <h2 class="text-xl font-bold text-slate-900 flex-grow">{{ name }}</h2>
          <div class="text-slate-600 text-sm my-3">
           <div class="flex gap-3 flex-wrap">
            <div class="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    </svg>
                  <p >{{ time }} min</p>
            </div>
            <div class="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    <p >{{ serv }} {{ serving }}</p>
            </div>
            <div class="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
                        <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
                    </svg>
                    <p >{{ diff }}</p>
            </div>
            
           </div>
    
          </div>
          <Button text="See recipe"></Button>
        </div>

    </article>
</template>
<style>
img {
display: block;
object-fit: cover;
}
</style>