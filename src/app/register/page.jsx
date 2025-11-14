import Link from "next/link";
import { simpanUser } from "../../../lib/action";

export default function RegisterPage() {
    return( 
    <form action={simpanUser} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h1>Register</h1>
        <input className="border p-2" type="text" name="username" placeholder="Username" />
        <input className="border p-2" type="email" name="email" placeholder="Email" />
        <input className="border p-2" type="password" name="password" placeholder="Password" />
        <input className="border p-2" type="hidden" name="role" value="user" />
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Register</button>
        <Link href="/login">Already have an account? Login</Link>
    </form>

    )
}