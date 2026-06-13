import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useClients } from "../../hooks/useClients";
import type { ClientInsert, ClientStatus } from "../../lib/types/database";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const emptyForm: ClientInsert = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "lead",
  notes: "",
};

export function AdminClientFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createClient, updateClient } = useClients();

  const [form, setForm] = useState<ClientInsert>(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id || !supabase) return;

    supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (fetchError || !data) {
          setError("Client not found");
        } else {
          setForm({
            name: data.name,
            email: data.email ?? "",
            phone: data.phone ?? "",
            company: data.company ?? "",
            status: data.status,
            notes: data.notes ?? "",
          });
        }
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: ClientInsert = {
      ...form,
      email: form.email || null,
      phone: form.phone || null,
      company: form.company || null,
      notes: form.notes || null,
    };

    try {
      if (isEdit && id) {
        await updateClient(id, payload);
      } else {
        await createClient(payload);
      }
      navigate("/admin/clients");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save client");
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

  return (
    <div>
      <Link
        to="/admin/clients"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to clients
      </Link>

      <h1 className="text-white text-2xl font-semibold mb-6">
        {isEdit ? "Edit Client" : "New Client"}
      </h1>

      <Card className="bg-white/5 border-white/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Phone</Label>
              <Input
                value={form.phone ?? ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Company</Label>
              <Input
                value={form.company ?? ""}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as ClientStatus })}
              >
                <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {(["lead", "active", "completed", "inactive"] as const).map((s) => (
                    <SelectItem key={s} value={s} className="capitalize text-white">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Notes</Label>
              <Textarea
                value={form.notes ?? ""}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={4}
                placeholder="Project details, follow-ups, preferences…"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
            >
              {saving ? "Saving…" : isEdit ? "Update Client" : "Create Client"}
            </Button>
            <Link to="/admin/clients">
              <Button type="button" variant="outline" className="border-white/10 text-gray-300">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
