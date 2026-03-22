'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
  // 1. LOGIN
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
    return
  }

  // 2. AMBIL USER
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user

  // 3. SIMPAN KE DATABASE (profiles)
  await supabase.from('profiles').upsert({
    id: user.id,
    role: 'free'
  })

  alert('Login berhasil')
}

  return (
    <div className="p-10">
      <h1>Login</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  )
}