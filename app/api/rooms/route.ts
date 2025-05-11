// app/api/rooms/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 10);  // Contoh kode undangan acak
}

export async function POST(req: Request) {
  const body = await req.json()
  const { host_id } = body
  const invite_code = generateInviteCode()

  // Insert room with invite_code
  const { data, error } = await supabase.from('rooms').insert({
    host_id,
    invite_code,
  }).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}
