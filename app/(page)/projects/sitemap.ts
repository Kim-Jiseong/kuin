import { createClient } from '@/utils/supabase/server';
import type { MetadataRoute } from 'next'

 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient();
    const { data: projectList, error: projectError } = await supabase
      .from("project")
      .select("*")
//   const start = id * 50000
//   const end = start + 50000
  
    return projectList ? projectList.map((project) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects/${project.id}`,
      lastModified: new Date(),
    }))
  :[]
 
}