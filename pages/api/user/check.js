import { createClient } from "@supabase/supabase-js";
 
const FREE_LIMIT = 10;
 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
 
  const { email } = req.body;
 
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email invalide" });
  }
 
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 
  if (!url || !key) {
    return res.status(500).json({ error: "Variables Supabase manquantes" });
  }
 
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("users")
      .select("email, count, is_pro")
      .eq("email", email)
      .single();
 
    if (error && error.code !== "PGRST116") {
      return res.status(500).json({ error: error.message });
    }
 
    if (!data) {
      await supabase.from("users").insert({ email, count: 0, is_pro: false });
      return res.status(200).json({ count: 0, allowed: true, is_pro: false });
    }
 
    if (data.is_pro) {
      return res.status(200).json({ count: data.count, allowed: true, is_pro: true });
    }
 
    return res.status(200).json({
      count: data.count,
      allowed: data.count < FREE_LIMIT,
      is_pro: false
    });
 
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
 
