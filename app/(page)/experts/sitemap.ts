import { createClient } from '@/utils/supabase/server';
import type { MetadataRoute } from 'next'

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }]
// }
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient();
    const { data: profileList, error: profileError } = await supabase
      .from("profile")
      .select("*")      
      .not("status", "is", "private")
      .not("expert_profile", "is", null)
      .order("created_at", { ascending: false })
  // const start = id * 50000
  // const end = start + 50000
  
    return profileList ? profileList.map((profile) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/experts/${profile.id}`,
      lastModified: new Date(),
    }))
  :[]
 
}