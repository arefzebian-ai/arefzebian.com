"use client";

import { JsonCollection, registerCollectionUtils, slugUtils } from "@/deframer";

import records from "./blog.json";

const schema = {
  id: { type: "string" },
  title: { type: "string" },
  blogSlug: { type: "string" },
  subtitleQuote: { type: "string" },
  aspectRatio: { type: "enum", options: ["sCQeHbqPX", "SPTmDaq0c"], optionTitles: ["1x1", "Wide"] },
  sortOrder: { type: "number" },
  category: { type: "string" },
  thumbnail: { type: "responsiveimage" },
  date: { type: "string" },
  photography: { type: "string" },
  content: { type: "richtext" },
  nextArticle1: { type: "number" },
  nextArticle2: { type: "number" },
  nextArticle3: { type: "number" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
  previousItemId: { type: "string" },
  nextItemId: { type: "string" },
};
const chunkUrl = new URL(
  "./ajpW3RDtm-indexes-default-0.framercms",
  "https://framerusercontent.com/modules/qxQ5DC3ZkMmvadzFbDwy/DDFOb8RvdRXfm2m28fr9/ajpW3RDtm.js",
).href.replace("/modules/", "/cms/");

// Records live in ./blog.json; edit them there.
const Blog = {
  collectionByLocaleId: { default: new JsonCollection({ schema, records }) },
  displayName: "Blog",
  id: "blog",
};
export default Blog;
const utils = slugUtils(Blog, "blogSlug");
registerCollectionUtils("blog", utils);
