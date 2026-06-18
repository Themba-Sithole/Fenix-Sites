import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { useProjects } from "../../hooks/useProjects";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { AdminPageHeader, adminFieldClass } from "../../components/admin/AdminFormField";
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

export function AdminProjectsPage() {
  const { projects, loading, deleteProject, updateProject } = useProjects({ admin: true });
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    await updateProject(id, { published: !published });
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    await updateProject(id, { featured: !featured });
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
      <AdminPageHeader
        title="Projects"
        description="Manage portfolio projects shown on your site"
        actions={
          <Link to="/admin/projects/new">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </Link>
        }
      />

      <Input
        placeholder="Search projects…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`${adminFieldClass} max-w-sm mb-6`}
      />

      {filtered.length === 0 ? (
        <Card className="bg-white/5 border-white/10 p-12 text-center">
          <p className="text-gray-400 mb-4">No projects yet. Add your first portfolio piece.</p>
          <Link to="/admin/projects/new">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">Add Project</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <Card
              key={project.id}
              className="bg-white/5 border-white/10 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              {project.image_url && (
                <img
                  src={project.image_url}
                  alt=""
                  className="w-full sm:w-20 h-14 object-cover rounded-lg shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-white font-medium truncate">{project.title}</p>
                  {project.published ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-xs">Portfolio</Badge>
                  ) : (
                    <Badge className="bg-gray-500/20 text-gray-400 border-0 text-xs">Internal</Badge>
                  )}
                  {project.featured && (
                    <Badge className="bg-[#db7d30]/20 text-[#edcca5] border-0 text-xs">Featured</Badge>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">
                  {project.category}
                  {project.clients?.name ? ` · ${project.clients.name}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-gray-300"
                  onClick={() => togglePublished(project.id, project.published)}
                  title={project.published ? "Remove from portfolio" : "Add to portfolio"}
                >
                  {project.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-gray-300"
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  title={project.featured ? "Unfeature" : "Feature"}
                >
                  <Star className={`w-4 h-4 ${project.featured ? "fill-[#db7d30] text-[#db7d30]" : ""}`} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-gray-300"
                  onClick={() => navigate(`/admin/projects/${project.id}`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => setDeleteId(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-gray-900 border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This cannot be undone. The project will be removed from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 text-gray-300 bg-transparent">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
