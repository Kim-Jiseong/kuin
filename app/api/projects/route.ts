import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// GET 메서드
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "created_at";
  const order = searchParams.get("order") === "asc" ? true : false;

  let query = supabase.from("project").select("*");

  if (filter) {
    query = query.eq("title", filter).or(`introduction.eq.${filter}`);
  }

  // 검색: search 파라미터는 부분 일치 검색 (ilike)
  if (search) {
    query = query.or(
      `title.ilike.%${filter}%,introduction.ilike.%${filter}%,detail.ilike.%${filter}%`
    );
  }

  query = query.order(sort, { ascending: order });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST 메서드
export async function POST(req: NextRequest) {
  const { title, introduction, detail, files, owner, contact, metadata } =
    await req.json();

  const { data, error } = await supabase
    .from("project")
    .insert([{ title, introduction, detail, files, owner, contact, metadata }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data && data[0], { status: 201 });
}
