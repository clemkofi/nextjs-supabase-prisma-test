import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthButtonsClient from "./AuthButtonsClient";
import { cookies } from "next/headers";

const AuthButtonsServer = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthButtonsClient session={session} />;
};

export default AuthButtonsServer;
