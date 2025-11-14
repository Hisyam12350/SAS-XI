'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
         <button onClick={signOut} className="text-cyan-300 bg-red-500 p-5 rounded-xl">Log out</button>
    )
}   