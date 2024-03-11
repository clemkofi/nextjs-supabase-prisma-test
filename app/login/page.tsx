import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonsClient from "../AuthButtonsClient";

const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // get the user's session and redirect
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <AuthButtonsClient session={session} />;
  //   return <div>Here</div>;
};

export default page;
