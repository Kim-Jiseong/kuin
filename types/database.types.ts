export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

  interface ExpertProfile {
    name?: string;
    introduction?: string;
    detail?: string;
    profileImage?: string;
    contact?: string;
    major?: "dev" | "design" | "client" | null;
    portfolio?: string[]; 
  }

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string
          email: string | null
          expert_profile: ExpertProfile | null
          id: string
          image: string | null
          name: string | null
          provider: string | null
          user_id: string | null
          view: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          expert_profile?: ExpertProfile | null
          id?: string
          image?: string | null
          name?: string | null
          provider?: string | null
          user_id?: string | null
          view?: number
        }
        Update: {
          created_at?: string
          email?: string | null
          expert_profile?: ExpertProfile | null
          id?: string
          image?: string | null
          name?: string | null
          provider?: string | null
          user_id?: string | null
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          files: string | null
          id: number
          introduction: string | null
          metadata: Json | null
          owner_profile: string | null
          status: string | null
          title: string | null
          view: number
        }
        Insert: {
          contact?: string | null
          created_at?: string
          detail?: string | null
          files?: string | null
          id?: number
          introduction?: string | null
          metadata?: Json | null
          owner_profile?: string | null
          status?: string | null
          title?: string | null
          view?: number
        }
        Update: {
          contact?: string | null
          created_at?: string
          detail?: string | null
          files?: string | null
          id?: number
          introduction?: string | null
          metadata?: Json | null
          owner_profile?: string | null
          status?: string | null
          title?: string | null
          view?: number
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
