import redirects from "../redirects/redirects";

export default defineNuxtRouteMiddleware((to, from) => {
  const { query, hash } = to;
  let path: String = to.path;
  path = path.toLowerCase();
  path = path.replace(/\/$/, "");

  if (redirects[path]) {
    const nextRoute = { path: redirects[path].dst, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  } else if (to.path !== "/" && to.path.endsWith("/")) {
    const nextRoute = { path: path, query, hash };
    return navigateTo(nextRoute, { redirectCode: 301 });
  }
});
