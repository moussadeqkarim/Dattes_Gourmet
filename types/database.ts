export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      boxes: {
        Row: {
          id: string;
          slug: string;
          name: string;
          pieces: number;
          price_mad: number;
          description: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          pieces: number;
          price_mad: number;
          description?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["boxes"]["Insert"]>;
        Relationships: [];
      };
      flavors: {
        Row: {
          id: string;
          name: string;
          category: "classic" | "exotic";
          image_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: "classic" | "exotic";
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["flavors"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          whatsapp: string;
          instagram_handle: string | null;
          delivery_address: string;
          box_id: string | null;
          box_name: string;
          box_price_mad: number;
          classic_flavors: string[];
          exotic_flavors: string[];
          payment_method: "bank_transfer" | "cash_on_delivery";
          special_instructions: string | null;
          total_mad: number;
          currency: string;
          status: "new" | "pending" | "confirmed" | "cancelled";
          order_reference: string;
          whatsapp_message: string;
          is_paid: boolean;
          is_fulfilled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          whatsapp: string;
          instagram_handle?: string | null;
          delivery_address: string;
          box_id?: string | null;
          box_name: string;
          box_price_mad: number;
          classic_flavors?: string[];
          exotic_flavors?: string[];
          payment_method: "bank_transfer" | "cash_on_delivery";
          special_instructions?: string | null;
          total_mad: number;
          currency?: string;
          status?: "new" | "pending" | "confirmed" | "cancelled";
          order_reference: string;
          whatsapp_message?: string;
          is_paid?: boolean;
          is_fulfilled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      flavor_category: "classic" | "exotic";
      payment_method: "bank_transfer" | "cash_on_delivery";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
