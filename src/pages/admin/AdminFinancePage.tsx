import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { useFinance } from "../../hooks/useFinance";
import { useClients } from "../../hooks/useClients";
import type { FinanceRecordInsert, FinanceType, FinanceStatus } from "../../lib/types/database";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const statusColors: Record<FinanceStatus, string> = {
  pending: "bg-amber-500/20 text-amber-300",
  paid: "bg-emerald-500/20 text-emerald-300",
  overdue: "bg-red-500/20 text-red-300",
  cancelled: "bg-gray-500/20 text-gray-400",
};

const typeColors: Record<FinanceType, string> = {
  invoice: "bg-blue-500/20 text-blue-300",
  expense: "bg-red-500/20 text-red-300",
  payment: "bg-emerald-500/20 text-emerald-300",
};

const emptyForm: FinanceRecordInsert = {
  title: "",
  type: "invoice",
  amount: 0,
  currency: "ZAR",
  status: "pending",
  client_id: null,
  project_id: null,
  due_date: null,
  notes: null,
};

function formatZAR(amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function AdminFinancePage() {
  const { records, loading, stats, createRecord, updateRecord, deleteRecord } = useFinance();
  const { clients } = useClients();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FinanceRecordInsert>(emptyForm);
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createRecord({
        ...form,
        amount: Number(form.amount),
        client_id: form.client_id || null,
        notes: form.notes || null,
        due_date: form.due_date || null,
      });
      setForm(emptyForm);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const netRevenue = stats.totalInvoiced - stats.totalExpenses;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-white text-2xl font-semibold mb-1">Finance Manager</h1>
          <p className="text-gray-500 text-sm">Track invoices, payments, and expenses</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              <Plus className="w-4 h-4 mr-2" />
              New Record
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add Finance Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label className="text-gray-300">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-gray-300">Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => setForm({ ...form, type: v as FinanceType })}
                  >
                    <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      {(["invoice", "payment", "expense"] as FinanceType[]).map((t) => (
                        <SelectItem key={t} value={t} className="text-white capitalize">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Amount (ZAR) *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount || ""}
                    onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) || 0 })}
                    required
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Client</Label>
                <Select
                  value={form.client_id ?? "none"}
                  onValueChange={(v) =>
                    setForm({ ...form, client_id: v === "none" ? null : v })
                  }
                >
                  <SelectTrigger className="mt-1 bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/10">
                    <SelectItem value="none" className="text-white">None</SelectItem>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id} className="text-white">
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">Due Date</Label>
                <Input
                  type="date"
                  value={form.due_date ?? ""}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value || null })}
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300">Notes</Label>
                <Textarea
                  value={form.notes ?? ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
              >
                {saving ? "Saving…" : "Add Record"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Invoiced", value: formatZAR(stats.totalInvoiced), icon: DollarSign, accent: "from-blue-500/20 to-blue-600/10" },
          { label: "Collected", value: formatZAR(stats.totalPaid), icon: TrendingUp, accent: "from-emerald-500/20 to-emerald-600/10" },
          { label: "Expenses", value: formatZAR(stats.totalExpenses), icon: TrendingDown, accent: "from-red-500/20 to-red-600/10" },
          { label: "Net Revenue", value: formatZAR(netRevenue), icon: Clock, accent: "from-[#cd3f2c]/20 to-[#db7d30]/10" },
        ].map((s) => (
          <Card
            key={s.label}
            className={`bg-gradient-to-br ${s.accent} border-white/10 p-5`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-xs uppercase tracking-wider">{s.label}</p>
              <s.icon className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-white text-xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-white/[0.03] border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Type</TableHead>
              <TableHead className="text-gray-400">Amount</TableHead>
              <TableHead className="text-gray-400">Client</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Due</TableHead>
              <TableHead className="text-gray-400 w-20" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-12">
                  No finance records yet. Add your first invoice or expense.
                </TableCell>
              </TableRow>
            ) : (
              records.map((r) => (
                <TableRow key={r.id} className="border-white/10">
                  <TableCell className="text-white font-medium">{r.title}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 capitalize ${typeColors[r.type]}`}>
                      {r.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">{formatZAR(Number(r.amount))}</TableCell>
                  <TableCell className="text-gray-400">
                    {r.clients?.name ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={r.status}
                      onValueChange={(v) => updateRecord(r.id, { status: v as FinanceStatus })}
                    >
                      <SelectTrigger className="w-28 h-7 bg-white/5 border-white/10 text-white text-xs">
                        <Badge className={`border-0 capitalize ${statusColors[r.status]}`}>
                          {r.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        {(["pending", "paid", "overdue", "cancelled"] as FinanceStatus[]).map((s) => (
                          <SelectItem key={s} value={s} className="text-white capitalize text-xs">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {r.due_date ? new Date(r.due_date).toLocaleDateString("en-ZA") : "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-400 h-8 w-8 p-0"
                      onClick={() => deleteRecord(r.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
