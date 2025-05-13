// app/api/rooms/[roomId]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
  const roomId = params.roomId // This is the invite_code for guests

  // Fetch the room using invite_code
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('invite_code', roomId)  // Use invite_code, not id
    .single()

  if (roomError || !room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 })
  }

  // Fetch guests who are associated with the room
  const { data: guests, error: guestsError } = await supabase
    .from('room_users')
    .select('id, guest_id, is_host, created_at')
    .eq('room_id', room.id)

  if (guestsError) {
    return NextResponse.json({ error: guestsError.message }, { status: 500 })
  }

  return NextResponse.json({ room, guests }, { status: 200 })
}
