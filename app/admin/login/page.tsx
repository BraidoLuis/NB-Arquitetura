import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export default async function AdminLogin() {
  const supabase = await createClient();
  if (!supabase) return <LoginForm configurationMissing />;

  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/admin");

  return <LoginForm />;
}
