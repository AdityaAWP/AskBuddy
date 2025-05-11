// app/api/join-room/route.ts
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { guest_id, room_id } = body

  if (!guest_id || !room_id) {
    return NextResponse.json({ error: 'Missing guest_id or room_id' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('room_users')
    .insert([{ guest_id, room_id, is_guest: true }])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Guest joined room', data }, { status: 200 })
}
