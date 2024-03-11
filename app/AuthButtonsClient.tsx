"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

const AuthButtonsClient = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  // const [session, setSession] = useState<any>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // // using useEffect to get the current session
  // useEffect(() => {
  //   const getSession = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     setSession(data.session);
  //   };
  //   getSession();
  // }, []);

  // ---> this can be done in a server component to prevent the use of useEffect

  return session ? (
    <button onClick={handleSignOut}>LogOut</button>
  ) : (
    <button onClick={handleSignIn}>Login</button>
  );
};

export default AuthButtonsClient;
