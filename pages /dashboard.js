import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUser(data.user);
      setIsOnline(true);
      setLoading(false);
    };

    checkUser();
  }, []);

  const toggleSession = async () => {
    if (isOnline) {
      await supabase.auth.signOut();
      setIsOnline(false);
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard 🚀</h1>

      <p>Email : {user?.email}</p>

      {/* TOGGLE BUTTON */}
      <button
        onClick={toggleSession}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: isOnline ? "green" : "red",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {isOnline ? "🟢 ON (Connecté)" : "🔴 OFF (Déconnecté)"}
      </button>
    </div>
  );
}
