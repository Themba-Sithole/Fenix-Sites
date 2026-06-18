import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, X, Star } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useProjects } from "../../hooks/useProjects";
import { useClients } from "../../hooks/useClients";
import { useProjectImages } from "../../hooks/useProjectImages";
import type { ProjectFilter, ProjectInsert } from "../../lib/types/database";
import { CategoryCombobox } from "../../components/admin/CategoryCombobox";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import {
  AdminFormField,
  AdminPageHeader,
  adminCardClass,
  adminFieldClass,
  adminSwitchClass,
  adminTextareaClass,
} from "../../components/admin/AdminFormField";
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
  const { images, uploading, uploadImage, deleteImage, setCover } = useProjectImages(id);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProjectInsert>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

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

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setPendingFiles((prev) => [...prev, ...files]);
    setPreviewUrls((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const removePending = (index: number) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

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
      let projectId = id;

      if (isEdit && id) {
        await updateProject(id, payload);
      } else {
        const created = await createProject(payload);
        projectId = created.id;
      }

      if (projectId && pendingFiles.length > 0) {
        for (let i = 0; i < pendingFiles.length; i++) {
          const img = await uploadImage(pendingFiles[i], projectId, i === 0 && !form.image_url);
          if (i === 0 && !form.image_url) {
            await updateProject(projectId, { image_url: img.url });
          }
        }
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

      <AdminPageHeader
        title={isEdit ? "Edit Project" : "New Project"}
        description="Add portfolio details, photos, and visibility settings."
      />

      <Card className={`${adminCardClass} p-6 md:p-8`}>
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
          <div className="space-y-6">
            <AdminFormField label="Title" required>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className={adminFieldClass}
              />
            </AdminFormField>

            <div className="grid sm:grid-cols-2 gap-6">
              <AdminFormField label="Category" required>
                <CategoryCombobox
                  value={form.category}
                  onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                />
              </AdminFormField>

              <AdminFormField label="Filter">
                <Select
                  value={form.filter_category}
                  onValueChange={(v) =>
                    setForm({ ...form, filter_category: v as ProjectFilter })
                  }
                >
                  <SelectTrigger className={adminFieldClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[200] bg-gray-900 border-white/10">
                    {["ecommerce", "webapp", "mobile", "design"].map((f) => (
                      <SelectItem key={f} value={f} className="capitalize text-white">
                        {f === "webapp" ? "Web App" : f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AdminFormField>
            </div>

            <AdminFormField label="Description">
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className={adminTextareaClass}
              />
            </AdminFormField>

            {/* Photo upload */}
            <AdminFormField label="Project Photos" hint="JPG, PNG, or WebP up to 5MB each.">
              <div className="space-y-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-white/10 rounded-xl p-6 hover:border-[#db7d30]/40 hover:bg-white/[0.02] transition-colors flex flex-col items-center gap-2 text-gray-400 hover:text-gray-300"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">
                    {uploading ? "Uploading…" : "Click to upload photos"}
                  </span>
                </button>

                {(previewUrls.length > 0 || images.length > 0) && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {images.map((img) => (
                      <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                        {img.is_cover && (
                          <span className="absolute top-1 left-1 bg-[#db7d30] text-white text-[9px] px-1.5 py-0.5 rounded">
                            Cover
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          {!img.is_cover && (
                            <button
                              type="button"
                              onClick={() => setCover(img.id, id!)}
                              className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30"
                            >
                              <Star className="w-3 h-3 text-white" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteImage(img.id)}
                            className="p-1.5 bg-red-500/40 rounded-lg hover:bg-red-500/60"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {previewUrls.map((url, i) => (
                      <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-blue-500/80 text-white text-[9px] px-1.5 py-0.5 rounded">
                          New
                        </span>
                        <button
                          type="button"
                          onClick={() => removePending(i)}
                          className="absolute top-1 right-1 p-1 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AdminFormField>

            <AdminFormField label="Or paste Image URL">
              <Input
                value={form.image_url ?? ""}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://…"
                className={adminFieldClass}
              />
            </AdminFormField>

            <div className="grid sm:grid-cols-2 gap-6">
              <AdminFormField label="Client">
                <Select
                  value={form.client_id ?? "none"}
                  onValueChange={(v) =>
                    setForm({ ...form, client_id: v === "none" ? null : v })
                  }
                >
                  <SelectTrigger className={adminFieldClass}>
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
              </AdminFormField>

              <AdminFormField label="Duration">
                <Input
                  value={form.duration ?? ""}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="2 months"
                  className={adminFieldClass}
                />
              </AdminFormField>

              <AdminFormField label="Result / Metric">
                <Input
                  value={form.result ?? ""}
                  onChange={(e) => setForm({ ...form, result: e.target.value })}
                  placeholder="+250% Sales"
                  className={adminFieldClass}
                />
              </AdminFormField>

              <AdminFormField label="Live URL">
                <Input
                  value={form.live_url ?? ""}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder="https://client-site.com"
                  className={adminFieldClass}
                />
              </AdminFormField>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <AdminFormField label="Tags" hint="Comma-separated" className="sm:col-span-2">
                <Input
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="React, Tailwind, SEO"
                  className={adminFieldClass}
                />
              </AdminFormField>

              <AdminFormField label="Sort Order">
                <Input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                  }
                  className={adminFieldClass}
                />
              </AdminFormField>
            </div>
          </div>

          <div className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-5 space-y-5">
            <p className="text-gray-500 text-xs uppercase tracking-wider">Visibility</p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-medium">Show in Portfolio</p>
                <p className="text-gray-500 text-xs mt-1">
                  Display this project on the public portfolio page
                </p>
              </div>
              <Switch
                checked={form.published}
                onCheckedChange={(v) => setForm({ ...form, published: v })}
                className={adminSwitchClass}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-white text-sm font-medium">Featured on Homepage</p>
                <p className="text-gray-500 text-xs mt-1">
                  Highlight on the homepage work section
                </p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
                className={adminSwitchClass}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={saving || uploading}
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
