// pages/api/users/index.ts
import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { filter, sort, order } = req.query;

    // 기본 쿼리
    let query = supabase.from("user").select("*");

    // 필터링 추가 (예: email 또는 name 기준)
    if (filter) {
      query = query.ilike("email", `%${filter}%`).or(`name.ilike.%${filter}%`);
    }

    // 정렬 추가 (사용자가 sort를 지정하지 않으면 created_at 기준 최신순으로 정렬)
    if (sort) {
      const sortOrder = order === "asc" ? true : false;
      query = query.order(sort as string, { ascending: sortOrder });
    } else {
      query = query.order("created_at", { ascending: false }); // 기본적으로 created_at을 내림차순으로 정렬
    }
    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === "POST") {
    const { email, name, image, provider, profile } = req.body;
    const { data, error } = await supabase
      .from("user")
      .insert([{ email, name, image, provider, profile }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// /api/users?filter=john : 이메일 또는 이름에 "john"이 포함된 사용자 검색.
// /api/users?sort=name&order=asc : 이름을 오름차순으로 정렬.
// /api/users?filter=test&sort=email&order=desc : 이메일에 "test"가 포함된 사용자를 이메일 기준 내림차순으로 정렬.
