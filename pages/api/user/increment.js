import { createClient } from "@supabase/supabase-js";
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { email } = req.body;
 
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }
 
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
 
  try {
    const { data: user } = await supabase
      .from("users")
      .select("count")
      .eq("email", email)
      .single();
 
    const newCount = (user?.count || 0) + 1;
 
    await supabase
      .from("users")
      .upsert({ email, count: newCount });
 
    return res.status(200).json({ count: newCount });
 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
