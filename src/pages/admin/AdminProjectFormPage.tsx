import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import type { ProjectFilter, ProjectInsert } from "../../lib/types/database";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const emptyForm: ProjectInsert = {
  title: "",
  category: "",
  description: "",
  image_url: "",
  tags: [],
  client_id: null,
  duration: "",
  result: "",
  filter_category: "webapp",
  featured: false,
  published: false,
  live_url: "",
  sort_order: 0,
};

export function AdminProjectFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createProject, updateProject } = useProjects({ admin: true });
  const { clients } = useClients();

  const [form, setForm] = useState<ProjectInsert>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !id || !supabase) return;

    supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (fetchError || !data) {
          setError("Project not found");
        } else {
          setForm({
            title: data.title,
            category: data.category,
            description: data.description ?? "",
            image_url: data.image_url ?? "",
            tags: data.tags ?? [],
            client_id: data.client_id,
            duration: data.duration ?? "",
            result: data.result ?? "",
            filter_category: data.filter_category,
            featured: data.featured,
            published: data.published,
            live_url: data.live_url ?? "",
            sort_order: data.sort_order,
          });
          setTagsInput((data.tags ?? []).join(", "));
        }
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: ProjectInsert = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      client_id: form.client_id || null,
      description: form.description || null,
      image_url: form.image_url || null,
      duration: form.duration || null,
      result: form.result || null,
      live_url: form.live_url || null,
    };

    try {
      if (isEdit && id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save project");
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
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <h1 className="text-white text-2xl font-semibold mb-6">
        {isEdit ? "Edit Project" : "New Project"}
      </h1>

      <Card className="bg-white/5 border-white/10 p-6">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Title *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Category *</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                placeholder="E-Commerce, Landing Page…"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Filter</Label>
              <Select
                value={form.filter_category}
                onValueChange={(v) =>
                  setForm({ ...form, filter_category: v as ProjectFilter })
                }
              >
                <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  {["ecommerce", "webapp", "mobile", "design"].map((f) => (
                    <SelectItem key={f} value={f} className="capitalize text-white">
                      {f === "webapp" ? "Web App" : f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Image URL</Label>
              <Input
                value={form.image_url ?? ""}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://…"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Client</Label>
              <Select
                value={form.client_id ?? "none"}
                onValueChange={(v) =>
                  setForm({ ...form, client_id: v === "none" ? null : v })
                }
              >
                <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
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
              <Label className="text-gray-300">Duration</Label>
              <Input
                value={form.duration ?? ""}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="2 months"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Result / Metric</Label>
              <Input
                value={form.result ?? ""}
                onChange={(e) => setForm({ ...form, result: e.target.value })}
                placeholder="+250% Sales"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Live URL</Label>
              <Input
                value={form.live_url ?? ""}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                placeholder="https://client-site.com"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-gray-300">Tags (comma-separated)</Label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, Tailwind, SEO"
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Sort Order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
                className="mt-1.5 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-3">
              <Switch
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
              />
              <Label className="text-gray-300">Published on site</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
              />
              <Label className="text-gray-300">Featured on homepage</Label>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
            >
              {saving ? "Saving…" : isEdit ? "Update Project" : "Create Project"}
            </Button>
            <Link to="/admin/projects">
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
