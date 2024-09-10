create or replace function search_expert_profiles(major_filter text, search_text text)
returns setof profile as $$
  select p.*
  from profile p
  where expert_profile is not null
  and expert_profile->>'major' = major_filter -- major 기준 필터링
  and (
    search_text = '' -- 검색어가 빈 문자열일 경우 필터링을 무시
    or (
      expert_profile->>'name' ILIKE '%' || search_text || '%' -- 이름에서 부분 일치 검색
      or expert_profile->>'introduction' ILIKE '%' || search_text || '%' -- 소개에서 부분 일치 검색
      or expert_profile->>'detail' ILIKE '%' || search_text || '%' -- 세부 정보에서 부분 일치 검색
    )
  )
  -- relevance_score 계산 (반환하지 않고 정렬에만 사용)
  order by
    (
      (case when expert_profile->>'name' ILIKE '%' || search_text || '%' then 1 else 0 end) +
      (case when expert_profile->>'introduction' ILIKE '%' || search_text || '%' then 1 else 0 end) +
      (case when expert_profile->>'detail' ILIKE '%' || search_text || '%' then 1 else 0 end)
    ) desc,
    p.view desc, -- view 순으로 정렬
    p.created_at desc; -- created_at 순으로 정렬
$$ language sql;
