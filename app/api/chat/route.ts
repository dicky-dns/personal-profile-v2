import { Wheat } from "lucide-react";
import { NextResponse } from "next/server";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const profile = {
  name: "Dicky",
  role: "Web Developer",
  location: "Surakarta, Indonesia",
  summary: "Web developer yang fokus pada pengembangan web yang maintenable, functional, dan scallable.",
  experience_years: 3,
  focus: ["Frontend", "Backend", "UI", "Logic", "Maintainable code", "Scalable code", "Performance", "Accessibility", "Data-driven", "User-friendly", "database design"],
  contact: {
    email: "dickydns1@gmail.com",
    github: "https://github.com/dickydns",
    linkedin: "https://www.linkedin.com/in/dickydns/",
    Whatsapp: "https://wa.me/62895325927272"
  }
};

function buildPrompt(message: string): string {
  return [
    "Kamu adalah Aira, asisten AI untuk Dicky.",
    "Batasan: jawab seputar profil yang disediakan. Jangan mengarang di luar data.",
    "Sapaan atau small talk singkat (halo, hai, hello, apa kabar) diperbolehkan.",
    "Gaya: singkat, santai, dan relevan.",
    "",
    "Profil:",
    `Nama: ${profile.name}`,
    `Role: ${profile.role}`,
    `Lokasi: ${profile.location}`,
    `Ringkas: ${profile.summary}`,
    `Pengalaman: ${profile.experience_years}+ tahun`,
    `Fokus: ${profile.focus.join(", ")}`,
    `Kontak: ${profile.contact.email}`,
    "",
    `Pertanyaan: ${message}`
  ].join("\n");
}

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || !message.trim()) {
    return NextResponse.json({
      reply: "Tulis pertanyaan dulu ya, biar saya bisa jawab."
    });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json({
      reply:
        "API key Gemini belum diset. Tambahin GEMINI_API_KEY ke .env dulu ya."
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: buildPrompt(message) }] }]
        })
      }
    );

    if (!response.ok) {
      let detail = "";
      try {
        const errorData = await response.json();
        detail = errorData?.error?.message
          ? ` Detail: ${errorData.error.message}`
          : "";
      } catch {
        detail = "";
      }

      return NextResponse.json({
        reply: `Maaf, AI sedang maintenance. Coba beberapa saat lagi ya.`
      });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Maaf, jawabannya kosong. Coba tanya lagi ya.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "Maaf, AI sedang gangguan. Coba beberapa saat lagi ya."
    });
  }
}
