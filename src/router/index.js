const routes = [
  { path: "/:id", component: () => import("@components/Recipe.vue") },
];

const router = createRouter({
  routes,
});

export default router;
