import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ProjectImage } from "../lib/types/database";

export function useProjectImages(projectId?: string) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchImages = useCallback(async () => {
    if (!supabase || !projectId) return;
    setLoading(true);
    const { data } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });
    setImages((data as ProjectImage[]) ?? []);
    setLoading(false);
  }, [projectId]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const uploadImage = async (file: File, projectId: string, isCover = false) => {
    if (!supabase) throw new Error("Supabase not configured");
    setUploading(true);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${projectId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setUploading(false);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("project-images")
      .getPublicUrl(path);

    if (isCover) {
      await supabase
        .from("project_images")
        .update({ is_cover: false })
        .eq("project_id", projectId);
    }

    const { data, error } = await supabase
      .from("project_images")
      .insert({
        project_id: projectId,
        url: publicUrl,
        is_cover: isCover,
        sort_order: images.length,
      })
      .select()
      .single();

    setUploading(false);
    if (error) throw error;
    await fetchImages();
    return data as ProjectImage;
  };

  const deleteImage = async (id: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.from("project_images").delete().eq("id", id);
    if (error) throw error;
    await fetchImages();
  };

  const setCover = async (id: string, projectId: string) => {
    if (!supabase) throw new Error("Supabase not configured");
    await supabase.from("project_images").update({ is_cover: false }).eq("project_id", projectId);
    await supabase.from("project_images").update({ is_cover: true }).eq("id", id);
    await fetchImages();
  };

  return { images, loading, uploading, uploadImage, deleteImage, setCover, refetch: fetchImages };
}
