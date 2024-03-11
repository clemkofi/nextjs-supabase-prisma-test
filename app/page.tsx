import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonsServer from "./AuthButtonsServer";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTweets } from "@/server/data-layer/tweets";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  console.log("tweets here => ", await getTweets());

  // get the user's session and redirect
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: tweets } = await supabase
    .from("tweets")
    .select("*, profiles(*)");

  return (
    <>
      <AuthButtonsServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  );
}
