'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
         <button onClick={signOut} className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:scale-105 transition">Log out</button>
    )
}   