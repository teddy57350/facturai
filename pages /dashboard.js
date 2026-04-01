import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("free");
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setOnline(true);

      // récupérer plan user
      const { data: dbUser } = await supabase
        .from("users")
        .select("plan")
        .eq("email", data.user.email)
        .single();

      if (dbUser?.plan) setPlan(dbUser.plan);

      setLoading(false);
    };

    init();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const goToStripe = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur Stripe");
        console.log(data);
      }
    } catch (err) {
      alert("Erreur API Stripe");
      console.log(err);
    }
  };

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Dashboard 🚀</h1>

      {/* USER */}
      <p>👤 {user?.email}</p>

      {/* PLAN */}
      <div
        style={{
          marginTop: 10,
          display: "inline-block",
          padding: "8px 14px",
          borderRadius: 10,
          background: plan === "pro" ? "#4f46e5" : "#e5e7eb",
          color: plan === "pro" ? "white" : "black",
          fontWeight: "bold",
        }}
      >
        {plan === "pro"
          ? "💎 PLAN PRO"
          : "🆓 PLAN FREE (10 factures / mois)"}
      </div>

      {/* ON / OFF */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: online ? "green" : "red",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {online ? "🟢 CONNECTÉ (LOGOUT)" : "🔴 OFFLINE"}
        </button>
      </div>

      {/* STRIPE BUTTON */}
      {plan === "free" && (
        <button
          onClick={goToStripe}
          style={{
            marginTop: 25,
            padding: "12px 24px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#7c3aed",
            color: "white",
            fontWeight: "bold",
          }}
        >
          💎 Passer Pro - 19€/mois
        </button>
      )}
    </div>
  );
