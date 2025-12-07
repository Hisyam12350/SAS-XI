import { getServerSession } from "next-auth/next";
import { authOptions } from "../src/app/api/auth/[...nextauth]/route";
import { getUserByEmail } from "./action";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.email) {
    return null;
  }
  
  const user = await getUserByEmail(session.user.email);
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized - Please login first");
  }
  
  return user;
}
