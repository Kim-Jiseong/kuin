// pages/api/projects/index.ts
import { supabase } from "@/lib/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { filter, sort, order } = req.query;

    // 기본 쿼리
    let query = supabase.from("project").select("*");

    // 필터링 추가 (title, introduction, detail에 대해 검색)
    if (filter) {
      query = query.or(
        `title.ilike.%${filter}%,introduction.ilike.%${filter}%,detail.ilike.%${filter}%`
      );
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
    const { title, introduction, detail, files, owner, contact, metadata } =
      req.body;
    const { data, error } = await supabase
      .from("project")
      .insert([
        { title, introduction, detail, files, owner, contact, metadata },
      ]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// /api/projects?filter=awesome : 제목, 소개, 또는 상세 설명에 "awesome"이 포함된 프로젝트 검색.
// /api/projects?sort=title&order=asc : 제목을 기준으로 오름차순 정렬.
// /api/projects?filter=tech&sort=owner&order=desc : 제목, 소개, 또는 상세 설명에 "tech"가 포함된 프로젝트를 소유자 기준으로 내림차순 정렬.
