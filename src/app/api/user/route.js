import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/action";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email diperlukan" }, { status: 400 });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
