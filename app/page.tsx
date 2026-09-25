"use client";

import { useState } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [vin, setVin] = useState("");
  const [lot, setLot] = useState("");
  const [auction, setAuction] = useState("Copart");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitVehicle(e: React.FormEvent) {
    e.preventDefault();

    if (!vin.trim() && !lot.trim()) {
      setMessage("Įveskite VIN arba LOT numerį.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("vehicles").insert([
      {
        vin: vin.trim() || null,
        lot: lot.trim() || null,
        auction: auction,
      },
    ]);

    if (error) {
      setMessage("Klaida: " + error.message);
    } else {
      setMessage("Automobilis sėkmingai pateiktas analizei.");
      setVin("");
      setLot("");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Automobilio analizė
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "35px",
            lineHeight: "1.5",
          }}
        >
          Įveskite aukciono automobilio VIN arba LOT numerį.
        </p>

        <form onSubmit={submitVehicle}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            Aukcionas
          </label>

          <select
            value={auction}
            onChange={(e) => setAuction(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "24px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="Copart">Copart</option>
            <option value="IAA">IAA</option>
          </select>

          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            VIN
          </label>

          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="Pvz. 1HGBH41JXMN109186"
            maxLength={17}
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "24px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            LOT numeris
          </label>

          <input
            type="text"
            value={lot}
            onChange={(e) => setLot(e.target.value)}
            placeholder="Pvz. 65728356"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "30px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "8px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              background: "#111",
              color: "white",
            }}
          >
            {loading ? "Siunčiama..." : "Pradėti analizę"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "25px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}