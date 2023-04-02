// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: "OurklwV5XsDJTIE1NJaD2wtt",
        bridge: true,
        apiOptions: {
          timeout: 60,
        },
        useApiClient: true,
      },
    ],
  ],
});
