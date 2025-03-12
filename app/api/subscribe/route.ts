import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
    const LIST_ID = process.env.NEXT_PUBLIC_BREVO_LIST_ID;

    const response = await axios.post(
      "https://api.brevo.com/v3/contacts",
      { email, listIds: [parseInt(LIST_ID as string, 10)] },
      { headers: { "Content-Type": "application/json", "api-key": API_KEY } }
    );

    return NextResponse.json({ message: "Subscription successful!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error subscribing:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
