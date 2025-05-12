import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { hostUserId } = await req.json();
  const inviteCode = uuidv4().slice(0, 6);

  const { data, error } = await supabase
    .from('rooms')
    .insert([
      {
        host_user_id: hostUserId,
        invite_code: inviteCode,
      },
    ])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('room_id');

  const { data, error } = await supabase
    .from('rooms')
    .select('id, is_full, invite_code')
    .eq('id', roomId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data, { status: 200 });
}

