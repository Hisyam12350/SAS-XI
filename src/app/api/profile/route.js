import { NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/action";

export async function PUT(req) {
  try {
    const { name, email, bio, password } = await req.json();
    const success = await updateUserProfile({ name, email, bio, password });
    if (!success) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
