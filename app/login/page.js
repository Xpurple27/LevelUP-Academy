'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Email atau password salah')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <Image src="/logolevelup.jpeg" alt="Level Up Academy Logo" width={48} height={48} className="mx-auto mb-4"/>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Masuk Akun
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Masuk untuk melanjutkan belajar
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LUPA PASSWORD */}
        <p className="text-right text-sm text-red-500 mb-4 cursor-pointer">
          Lupa Password?
        </p>

        {/* BUTTON LOGIN */}
        <button
          onClick={handleLogin}
          className="w-full bg-red-500 text-white py-3 rounded font-semibold hover:bg-red-600 transition"
        >
          Masuk
        </button>

        {/* DIVIDER */}
        <div className="my-6 text-center text-gray-400">
          — atau —
        </div>

        {/* GOOGLE LOGIN (UI DULU) */}
        <button className="w-full border py-3 rounded">
          Login dengan Google
        </button>

        {/* REGISTER */}
        <p className="text-center text-sm mt-4">
          Belum punya akun?{' '}
          <span className="text-red-500 cursor-pointer">
            Daftar
          </span>
        </p>

      </div>

    </div>
  )
}