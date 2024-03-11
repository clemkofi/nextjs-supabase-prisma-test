"use client";

import { addTweet, getTweets } from "@/server/data-layer/tweets";
import { useMutation, useQuery } from "@tanstack/react-query";

function useTweetsData() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getTweets(),
  });

  const { mutate } = useMutation({
    mutationFn: () => addTweet(),
    onSuccess: () => refetch(),
  });

  return { data, mutate, isLoading };
}

const page = () => {
  const { data, mutate, isLoading } = useTweetsData();

  if (!data || isLoading) return <div>Loading .... </div>;

  return (
    <div>
      {data.map((tweet) => (
        <div key={tweet.id}>{tweet.title}</div>
      ))}

      <button
        onClick={() => {
          mutate();
        }}
      >
        Add new Tweet
      </button>
    </div>
  );
};

export default page;
