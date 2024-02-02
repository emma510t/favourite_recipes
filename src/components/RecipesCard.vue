<script setup>
import Button from './Button.vue';
defineProps({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  rat: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  diff: {
    type: String,
    required: true
  },
})
</script>

<template>
    <article class="bg-white rounded-xl">
        <div class="rounded-t-xl aspect-[4/2] w-full bg-sky-600 truncate">
            
            <img :src="img" alt="dish">
        </div>
        <div class="p-5 flex flex-col justify-between">
<h2 class="text-lg font-bold text-slate-900">{{ name }}</h2>
<div class="flex justify-between">
    <div>
      <div class="flex gap-2 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>
        <p class="text-slate-600"> {{ rat }}</p>
      </div>
      <div class="flex gap-2 items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
</svg>
        <p class="text-slate-600">{{ time }} minutes</p>
      </div>
        <p class="text-slate-600">{{ diff }}</p>
    </div>
    <Button text="See recipe"></Button>

    </div>
</div>

    </article>
</template>
<style>
img {
display: block;
object-fit: cover;
}
</style>