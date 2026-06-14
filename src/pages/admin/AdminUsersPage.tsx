import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import type { Profile, UserRole } from "../../lib/types/database";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { UserPlus, Shield } from "lucide-react";

const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  finance: "Finance",
  viewer: "Viewer",
};

const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: "bg-[#cd3f2c]/20 text-[#edcca5]",
  admin: "bg-orange-500/20 text-orange-300",
  editor: "bg-blue-500/20 text-blue-300",
  finance: "bg-emerald-500/20 text-emerald-300",
  viewer: "bg-gray-500/20 text-gray-400",
};

export function AdminUsersPage() {
  const { session, hasRole } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "editor" as UserRole,
  });

  const fetchUsers = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: true });
    setUsers((data as Profile[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create user");

      setSuccess(`Account created for ${data.email}`);
      setForm({ email: "", password: "", full_name: "", role: "editor" });
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  const updateRole = async (id: string, role: UserRole) => {
    if (!supabase) return;
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (!error) await fetchUsers();
  };

  if (!hasRole("super_admin")) {
    return (
      <div className="text-center py-20">
        <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">Only super admins can manage team accounts.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-white text-2xl font-semibold mb-1">Team Accounts</h1>
        <p className="text-gray-500 text-sm">
          Create admin accounts with roles. Credentials are stored securely in Supabase Auth.
        </p>
      </div>

      <Card className="bg-white/[0.03] border-white/10 p-6">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-[#db7d30]" />
          Create New Account
        </h2>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <Label className="text-gray-300">Full Name</Label>
            <Input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Email *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Password *</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v as UserRole })}
            >
              <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10">
                {(Object.keys(ROLE_LABELS) as UserRole[])
                  .filter((r) => r !== "super_admin")
                  .map((r) => (
                    <SelectItem key={r} value={r} className="text-white">
                      {ROLE_LABELS[r]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <Button
              type="submit"
              disabled={creating}
              className="bg-gradient-to-r from-[#cd3f2c] to-[#db7d30]"
            >
              {creating ? "Creating…" : "Create Account"}
            </Button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-emerald-400 text-sm">{success}</p>}
          </div>
        </form>
      </Card>

      <Card className="bg-white/[0.03] border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id} className="border-white/10">
                <TableCell className="text-white">{u.full_name ?? "—"}</TableCell>
                <TableCell className="text-gray-300">{u.email}</TableCell>
                <TableCell>
                  {u.role === "super_admin" ? (
                    <Badge className={`border-0 ${ROLE_COLORS[u.role]}`}>
                      {ROLE_LABELS[u.role]}
                    </Badge>
                  ) : (
                    <Select value={u.role} onValueChange={(v) => updateRole(u.id, v as UserRole)}>
                      <SelectTrigger className="w-36 h-8 bg-white/5 border-white/10 text-white text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10">
                        {(Object.keys(ROLE_LABELS) as UserRole[])
                          .filter((r) => r !== "super_admin")
                          .map((r) => (
                            <SelectItem key={r} value={r} className="text-white text-xs">
                              {ROLE_LABELS[r]}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="text-gray-500 text-sm">
                  {new Date(u.created_at).toLocaleDateString("en-ZA")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
