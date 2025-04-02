import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "E-post krävs" }, { status: 400 });
    }

    const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
    const LIST_ID = process.env.NEXT_PUBLIC_BREVO_LIST_ID;

    if (!API_KEY || !LIST_ID) {
      return NextResponse.json({ error: "Miljövariabler saknas" }, { status: 500 });
    }

    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      {
        email,
        listIds: [parseInt(LIST_ID, 10)],
        updateEnabled: true, // Uppdatera befintlig kontakt om den redan finns
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );

    return NextResponse.json({ message: "Prenumeration lyckades!" }, { status: 200 });
  } catch (error: any) {
    console.error("Fel vid prenumeration:", error.response?.data || error.message);
    return NextResponse.json({ error: "Misslyckades med att prenumerera" }, { status: 500 });
  }
}
