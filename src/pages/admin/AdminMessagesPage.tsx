import { useState } from "react";
import { MessageSquare, Send, Plus, Phone, X } from "lucide-react";
import { useMessages } from "../../hooks/useMessages";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";

export function AdminMessagesPage() {
  const {
    conversations,
    messages,
    activeId,
    setActiveId,
    loading,
    createConversation,
    sendMessage,
    closeConversation,
  } = useMessages();

  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newConvo, setNewConvo] = useState({
    participant_name: "",
    participant_phone: "",
    subject: "",
  });

  const active = conversations.find((c) => c.id === activeId);

  const handleSend = async () => {
    if (!activeId || !newMsg.trim()) return;
    setSending(true);
    try {
      await sendMessage(activeId, newMsg.trim());
      setNewMsg("");
    } finally {
      setSending(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createConversation({
      participant_name: newConvo.participant_name,
      participant_phone: newConvo.participant_phone || undefined,
      subject: newConvo.subject || undefined,
    });
    setNewConvo({ participant_name: "", participant_phone: "", subject: "" });
    setDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold mb-1">Messages</h1>
          <p className="text-gray-500 text-sm">Text clients and track conversations</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              <Plus className="w-4 h-4 mr-2" />
              New Conversation
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Start Conversation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label className="text-gray-300">Contact Name *</Label>
                <Input
                  value={newConvo.participant_name}
                  onChange={(e) =>
                    setNewConvo({ ...newConvo, participant_name: e.target.value })
                  }
                  required
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone Number</Label>
                <Input
                  value={newConvo.participant_phone}
                  onChange={(e) =>
                    setNewConvo({ ...newConvo, participant_phone: e.target.value })
                  }
                  placeholder="+27 …"
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Subject</Label>
                <Input
                  value={newConvo.subject}
                  onChange={(e) => setNewConvo({ ...newConvo, subject: e.target.value })}
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
                Start Chat
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        <Card className="bg-white/[0.03] border-white/10 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              {conversations.length} conversations
            </p>
          </div>
          <ScrollArea className="flex-1">
            {conversations.length === 0 ? (
              <p className="text-gray-500 text-sm p-4 text-center">No conversations yet</p>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                    activeId === c.id ? "bg-[#cd3f2c]/10 border-l-2 border-l-[#db7d30]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-sm font-medium truncate">{c.participant_name}</p>
                    <Badge
                      className={`border-0 text-[10px] ${
                        c.status === "open"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {c.status}
                    </Badge>
                  </div>
                  {c.subject && (
                    <p className="text-gray-500 text-xs truncate">{c.subject}</p>
                  )}
                  {c.participant_phone && (
                    <p className="text-gray-600 text-xs flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3" />
                      {c.participant_phone}
                    </p>
                  )}
                </button>
              ))
            )}
          </ScrollArea>
        </Card>

        <Card className="bg-white/[0.03] border-white/10 flex flex-col overflow-hidden">
          {!active ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
              <p>Select a conversation or start a new one</p>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{active.participant_name}</p>
                  {active.participant_phone && (
                    <p className="text-gray-500 text-xs">{active.participant_phone}</p>
                  )}
                </div>
                {active.status === "open" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                    onClick={() => closeConversation(active.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Close
                  </Button>
                )}
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.is_outbound ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                          m.is_outbound
                            ? "bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] text-white rounded-br-sm"
                            : "bg-white/10 text-gray-200 rounded-bl-sm"
                        }`}
                      >
                        <p>{m.body}</p>
                        <p className="text-[10px] opacity-60 mt-1">
                          {new Date(m.created_at).toLocaleTimeString("en-ZA", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {active.status === "open" && (
                <div className="p-4 border-t border-white/10 flex gap-2">
                  <Textarea
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Type a message…"
                    rows={2}
                    className="bg-white/5 border-white/10 text-white resize-none flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={sending || !newMsg.trim()}
                    className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
