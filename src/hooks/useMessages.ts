import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Conversation, Message } from "../lib/types/database";

export function useMessages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("conversations")
      .select("*")
      .order("updated_at", { ascending: false });

    setConversations((data as Conversation[]) ?? []);
    setLoading(false);
  }, []);

  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!supabase) return;

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    setMessages((data as Message[]) ?? []);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (activeId) fetchMessages(activeId);
    else setMessages([]);
  }, [activeId, fetchMessages]);

  const createConversation = async (payload: {
    participant_name: string;
    participant_phone?: string;
    subject?: string;
    client_id?: string;
    inquiry_id?: string;
  }) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data, error } = await supabase
      .from("conversations")
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    await fetchConversations();
    setActiveId(data.id);
    return data as Conversation;
  };

  const sendMessage = async (conversationId: string, body: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user?.id ?? null,
      body,
      is_outbound: true,
    });
    if (error) throw error;
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);
    await fetchMessages(conversationId);
    await fetchConversations();
  };

  const closeConversation = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    await supabase.from("conversations").update({ status: "closed" }).eq("id", id);
    await fetchConversations();
  };

  return {
    conversations,
    messages,
    activeId,
    setActiveId,
    loading,
    createConversation,
    sendMessage,
    closeConversation,
    refetch: fetchConversations,
  };
}
