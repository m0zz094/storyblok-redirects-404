import { useStoryblokApi, useStoryblokBridge } from "@storyblok/vue";
import type {
  ISbStoriesParams,
  StoryblokBridgeConfigV2,
  ISbStoryData,
  ISbError,
  ISbResult,
} from "@storyblok/vue";
import { useAsyncData, useState, onMounted, createError } from "#imports";

export const useAsyncStoryblok2 = async (
  url: string,
  apiOptions: ISbStoriesParams = {},
  bridgeOptions: StoryblokBridgeConfigV2 = {}
) => {
  const uniqueKey = `${JSON.stringify(apiOptions)}${url}`;
  const story = useState<ISbStoryData>(
    `${uniqueKey}-state`,
    () => ({} as ISbStoryData)
  );
  const storyblokApiInstance = useStoryblokApi();

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { data, error } = await useAsyncData<ISbResult, ISbError>(
    `${uniqueKey}-asyncdata`,
    () => storyblokApiInstance.get(`cdn/stories/${url}`, apiOptions)
  );

  if (
    error.value?.response &&
    error.value?.response.status >= 400 &&
    error.value?.response.status < 600
  ) {
    throw createError({
      statusCode: error.value?.response.status,
      statusMessage:
        error.value?.message?.message ||
        "Something went wrong when fetching from storyblok.",
      fatal: true,
    });
  } else if (!data.value?.data.story) {
    throw createError({
      statusCode: 404,
      statusMessage: "Something went wrong when fetching from storyblok.",
      fatal: true,
    });
  }

  story.value = data.value?.data.story;

  return story;
};
