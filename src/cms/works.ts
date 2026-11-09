"use client";

import { JsonCollection, registerCollectionUtils, slugUtils } from "@/deframer";

import records from "./works.json";

const schema = {
  id: { type: "string" },
  title: { type: "string" },
  subtitle: { type: "string" },
  worksSlug: { type: "string" },
  sortingNumber: { type: "number" },
  thumbnailPortrait: { type: "responsiveimage" },
  thumbnailVideoPortrait: { type: "file" },
  thumbnailVideoPortaitPoster: { type: "responsiveimage" },
  thumbnailWide: { type: "responsiveimage" },
  thumbnailVideoWide: { type: "file" },
  thumbnailVideoWidePoster: { type: "responsiveimage" },
  thumbnailSquare: { type: "responsiveimage" },
  thumbnailVideoSquare: { type: "file" },
  thumbnailVideoSquarePoster: { type: "responsiveimage" },
  client: { type: "string" },
  year: { type: "string" },
  sector: { type: "string" },
  category: { type: "string" },
  description: { type: "richtext" },
  projectsLiveSite: { type: "link" },
  imageHeader: { type: "responsiveimage" },
  image1: { type: "responsiveimage" },
  image2: { type: "responsiveimage" },
  video1: { type: "file" },
  video1Poster: { type: "responsiveimage" },
  image3: { type: "responsiveimage" },
  image4: { type: "responsiveimage" },
  video2: { type: "file" },
  video2Poster: { type: "responsiveimage" },
  image5: { type: "responsiveimage" },
  nextProject1: { type: "number" },
  nextProject2: { type: "number" },
  nextProject3: { type: "number" },
  testimonial: { type: "string" },
  author: { type: "string" },
  createdAt: { type: "date" },
  updatedAt: { type: "date" },
  previousItemId: { type: "string" },
  nextItemId: { type: "string" },
};
const chunkUrl = new URL(
  "./ZPxiZ9t6y-indexes-default-0.framercms",
  "https://framerusercontent.com/modules/3QLpAMet133j1eeo6bD0/NNNanwEuPjBVSKIKEIHs/ZPxiZ9t6y.js",
).href.replace("/modules/", "/cms/");

// Records live in ./works.json; edit them there.
const Works = {
  collectionByLocaleId: { default: new JsonCollection({ schema, records }) },
  displayName: "Works",
  id: "works",
};
export default Works;
/** Number of projects in the Works CMS collection — keeps "All Projects (N)" in sync. */
export const worksCount = records.length;
const utils = slugUtils(Works, "worksSlug");
registerCollectionUtils("works", utils);
