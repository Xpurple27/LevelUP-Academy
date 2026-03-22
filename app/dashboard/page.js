'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

export default function Dashboard() {
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (data) {
        setRole(data.role)
      }
    }

    fetchProfile()
  }, [])

  return (
  <div className="p-10 bg-gray-50 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">
      Dashboard
    </h1>

    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <p className="mb-2">
        Role: <span className="font-semibold">{role}</span>
      </p>

      {role === 'premium' ? (
        <p className="text-green-600">
          🔥 Premium User
        </p>
      ) : (
        <p className="text-red-500">
          🔒 Free User
        </p>
      )}
    </div>

    <a
      href="/materials"
      className="inline-block mt-6 bg-red-600 text-white px-4 py-2 rounded"
    >
      Mulai Belajar
    </a>
  </div>
)
}
