"use server";

import { db } from "../db";

export async function getTweets() {
  return await db.tweets.findMany();
}

export async function addTweet() {
  return await db.tweets.create({
    data: { title: "Testing", user_id: "39453664-27b0-473a-aa84-295e9530d5e6" },
  });
}
