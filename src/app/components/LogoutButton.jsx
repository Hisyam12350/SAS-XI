'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
         <button onClick={signOut} className="bg-red-500 p-3 rounded-xl">Log out</button>
    )
}   