import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useClients } from "../../hooks/useClients";
import type { ClientStatus } from "../../lib/types/database";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
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

const statusColors: Record<ClientStatus, string> = {
  lead: "bg-blue-500/20 text-blue-300",
  active: "bg-emerald-500/20 text-emerald-300",
  completed: "bg-purple-500/20 text-purple-300",
  inactive: "bg-gray-500/20 text-gray-400",
};

export function AdminClientsPage() {
  const { clients, loading, deleteClient } = useClients();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteClient(deleteId);
    } finally {
      setDeleting(false);
      setDeleteId(null);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-semibold mb-1">Clients</h1>
          <p className="text-gray-400 text-sm">Track leads and active client relationships</p>
        </div>
        <Link to="/admin/clients/new">
          <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </Link>
      </div>

      {clients.length === 0 ? (
        <Card className="bg-white/5 border-white/10 p-12 text-center">
          <p className="text-gray-400 mb-4">No clients yet. Add your first client or lead.</p>
          <Link to="/admin/clients/new">
            <Button className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]">Add Client</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-3">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="bg-white/5 border-white/10 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-white font-medium">{client.name}</p>
                  <Badge className={`border-0 text-xs capitalize ${statusColors[client.status]}`}>
                    {client.status}
                  </Badge>
                </div>
                <p className="text-gray-500 text-sm">
                  {[client.company, client.email, client.phone].filter(Boolean).join(" · ") || "—"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 text-gray-300"
                  onClick={() => navigate(`/admin/clients/${client.id}`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  onClick={() => setDeleteId(client.id)}
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
            <AlertDialogTitle>Delete client?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This cannot be undone. Linked projects will keep their data but lose the client link.
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
