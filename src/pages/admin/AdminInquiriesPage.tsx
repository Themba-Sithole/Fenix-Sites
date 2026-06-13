import { useState } from "react";
import { Mail, Phone, Trash2, UserPlus, Check, Archive, Eye } from "lucide-react";
import { useInquiries } from "../../hooks/useInquiries";
import { useClients } from "../../hooks/useClients";
import type { Inquiry, InquiryStatus } from "../../lib/types/database";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const statusColors: Record<InquiryStatus, string> = {
  new: "bg-[#cd3f2c]/20 text-[#edcca5]",
  read: "bg-blue-500/20 text-blue-300",
  replied: "bg-emerald-500/20 text-emerald-300",
  archived: "bg-gray-500/20 text-gray-400",
};

export function AdminInquiriesPage() {
  const { inquiries, loading, updateInquiry, deleteInquiry } = useInquiries();
  const { createClient } = useClients();
  const [filter, setFilter] = useState<InquiryStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchStatus = filter === "all" || inq.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.service?.toLowerCase().includes(q) ?? false);
    return matchStatus && matchSearch;
  });

  const handleConvertToClient = async (inq: Inquiry) => {
    await createClient({
      name: inq.name,
      email: inq.email,
      phone: inq.phone,
      company: null,
      status: "lead",
      notes: `From inquiry: ${inq.message}\nService: ${inq.service ?? "—"}\nBudget: ${inq.budget ?? "—"}`,
    });
    await updateInquiry(inq.id, "replied");
    setSelected(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-semibold mb-1">Inquiries</h1>
        <p className="text-gray-500 text-sm">Contact form submissions from your website</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Search by name, email, service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border-white/10 text-white max-w-sm"
        />
        <Select value={filter} onValueChange={(v) => setFilter(v as InquiryStatus | "all")}>
          <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-white/10">
            {["all", "new", "read", "replied", "archived"].map((s) => (
              <SelectItem key={s} value={s} className="capitalize text-white">
                {s === "all" ? "All status" : s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-white/[0.03] border-white/10 p-12 text-center">
          <p className="text-gray-500">No inquiries match your filters.</p>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {filtered.map((inq) => (
            <Card
              key={inq.id}
              className={`bg-white/[0.03] border-white/10 p-5 cursor-pointer hover:border-[#db7d30]/30 transition-colors ${
                selected?.id === inq.id ? "border-[#db7d30]/50" : ""
              }`}
              onClick={() => {
                setSelected(inq);
                if (inq.status === "new") updateInquiry(inq.id, "read");
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-white font-medium">{inq.name}</p>
                  <p className="text-gray-500 text-sm">{inq.email}</p>
                </div>
                <Badge className={`border-0 text-xs capitalize ${statusColors[inq.status]}`}>
                  {inq.status}
                </Badge>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{inq.message}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {inq.service && <span className="px-2 py-0.5 bg-white/5 rounded">{inq.service}</span>}
                {inq.budget && <span className="px-2 py-0.5 bg-white/5 rounded">{inq.budget}</span>}
                <span>{new Date(inq.created_at).toLocaleDateString()}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-lg bg-gray-900 border-white/10 p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-white text-lg font-semibold">{selected.name}</h2>
                <p className="text-gray-500 text-sm">{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400" onClick={() => setSelected(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-[#db7d30]" />
                <a href={`mailto:${selected.email}`} className="hover:text-white">{selected.email}</a>
              </div>
              {selected.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-[#db7d30]" />
                  {selected.phone}
                </div>
              )}
              {selected.service && <p><span className="text-gray-500">Service:</span> {selected.service}</p>}
              {selected.budget && <p><span className="text-gray-500">Budget:</span> {selected.budget}</p>}
              <p className="text-gray-300 leading-relaxed pt-2 border-t border-white/10">{selected.message}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]" onClick={() => handleConvertToClient(selected)}>
                <UserPlus className="w-4 h-4 mr-1" />
                Convert to Client
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 text-gray-300" onClick={() => updateInquiry(selected.id, "replied")}>
                <Check className="w-4 h-4 mr-1" />
                Mark Replied
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 text-gray-300" onClick={() => updateInquiry(selected.id, "archived")}>
                <Archive className="w-4 h-4 mr-1" />
                Archive
              </Button>
              <a href={`mailto:${selected.email}`}>
                <Button size="sm" variant="outline" className="border-white/10 text-gray-300">
                  <Eye className="w-4 h-4 mr-1" />
                  Reply via Email
                </Button>
              </a>
              <Button size="sm" variant="outline" className="border-red-500/30 text-red-400" onClick={() => setDeleteId(selected.id)}>
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete inquiry?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-gray-300 bg-transparent">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (deleteId) {
                  await deleteInquiry(deleteId);
                  setSelected(null);
                  setDeleteId(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
