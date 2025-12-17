export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string
          email: string | null
          expert_profile: Json | null
          id: string
          image: string | null
          name: string | null
          provider: string | null
          status: string | null
          user_id: string | null
          view: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          expert_profile?: Json | null
          id?: string
          image?: string | null
          name?: string | null
          provider?: string | null
          status?: string | null
          user_id?: string | null
          view: number
        }
        Update: {
          created_at?: string
          email?: string | null
          expert_profile?: Json | null
          id?: string
          image?: string | null
          name?: string | null
          provider?: string | null
          status?: string | null
          user_id?: string | null
          view?: number
        }
        Relationships: []
      }
      "profile(legacy)": {
        Row: {
          created_at: string
          detail: string | null
          id: string
          introduction: string | null
          portfolio: string | null
        }
        Insert: {
          created_at?: string
          detail?: string | null
          id?: string
          introduction?: string | null
          portfolio?: string | null
        }
        Update: {
          created_at?: string
          detail?: string | null
          id?: string
          introduction?: string | null
          portfolio?: string | null
        }
        Relationships: []
      }
      project: {
        Row: {
          contact: string | null
          created_at: string
          detail: string | null
          files: Json[] | null
          id: string
          introduction: string | null
          major: string | null
          metadata: Json | null
          owner_profile: string | null
          status: string | null
          title: string | null
          view: number | null
        }
        Insert: {
          contact?: string | null
          created_at?: string
          detail?: string | null
          files?: Json[] | null
          id?: string
          introduction?: string | null
          major?: string | null
          metadata?: Json | null
          owner_profile?: string | null
          status?: string | null
          title?: string | null
          view?: number | null
        }
        Update: {
          contact?: string | null
          created_at?: string
          detail?: string | null
          files?: Json[] | null
          id?: string
          introduction?: string | null
          major?: string | null
          metadata?: Json | null
          owner_profile?: string | null
          status?: string | null
          title?: string | null
          view?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_owner_profile_fkey"
            columns: ["owner_profile"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_expert_profiles_new_sort: {
        Args: { major_filter: string; search_text: string }
        Returns: {
          created_at: string
          email: string | null
          expert_profile: Json | null
          id: string
          image: string | null
          name: string | null
          provider: string | null
          status: string | null
          user_id: string | null
          view: number
        }[]
        SetofOptions: {
          from: "*"
          to: "profile"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      search_expert_profiles_view_sort: {
        Args: { major_filter: string; search_text: string }
        Returns: {
          created_at: string
          email: string | null
          expert_profile: Json | null
          id: string
          image: string | null
          name: string | null
          provider: string | null
          status: string | null
          user_id: string | null
          view: number
        }[]
        SetofOptions: {
          from: "*"
          to: "profile"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      search_projects_new_sort: {
        Args: { major_filter: string; search_text: string }
        Returns: {
          contact: string
          created_at: string
          detail: string
          files: string
          id: string
          introduction: string
          metadata: Json
          owner: Json
          owner_profile: string
          status: string
          title: string
        }[]
      }
      search_projects_view_sort: {
        Args: { major_filter: string; search_text: string }
        Returns: {
          contact: string
          created_at: string
          detail: string
          files: string
          id: string
          introduction: string
          metadata: Json
          owner: Json
          owner_profile: string
          status: string
          title: string
        }[]
      }
      search_projects_with_owner_profile: {
        Args: { major_filter: string; search_text: string }
        Returns: {
          contact: string
          created_at: string
          detail: string
          files: string
          id: string
          introduction: string
          metadata: Json
          owner: Json
          owner_profile: string
          status: string
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof Database
}
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
