create or replace function search_projects_with_owner_profile(major_filter text, search_text text)
returns table (
  id uuid,
  contact text,
  created_at timestamp,
  detail text,
  files text,
  introduction text,
  metadata json,
  owner_profile text,
  status text,
  title text,
  owner json
) as $$
  select 
    p.id,
    p.contact,
    p.created_at,
    p.detail,
    p.files,
    p.introduction,
    p.metadata,
    p.owner_profile,
    p.status,
    p.title,
    json_build_object(
      'id', pr.id,
      'name', pr.name,
      'email', pr.email,
      'image', pr.image,
      'provider', pr.provider,
      'user_id', pr.user_id,
      'view', pr.view
    ) as owner
  from project p
  left join profile pr on pr.id = p.owner_profile
  where p.status is not null
  and p.major = major_filter -- project 테이블의 major 기준 필터링
  and (
    search_text = '' -- 검색어가 빈 문자열일 경우 필터링을 무시
    or (
      p.title ILIKE '%' || search_text || '%' -- 프로젝트 제목에서 부분 일치 검색
      or p.introduction ILIKE '%' || search_text || '%' -- 프로젝트 소개에서 부분 일치 검색
      or p.detail ILIKE '%' || search_text || '%' -- 프로젝트 세부 정보에서 부분 일치 검색
    )
  )
  order by
    (
      (case when p.title ILIKE '%' || search_text || '%' then 1 else 0 end) +
      (case when p.introduction ILIKE '%' || search_text || '%' then 1 else 0 end) +
      (case when p.detail ILIKE '%' || search_text || '%' then 1 else 0 end)
    ) desc,
    p.view desc, -- 조회수 순으로 정렬
    p.created_at desc -- 생성일 순으로 정렬
$$ language sql;
