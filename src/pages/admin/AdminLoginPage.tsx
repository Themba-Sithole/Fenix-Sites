import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Flame, Lock } from "lucide-react";
import { useAuth, isSupabaseConfigured } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card } from "../../components/ui/card";

export function AdminLoginPage() {
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    }
  }, [user, authLoading, from, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    setLoading(false);

    if (signInError) {
      setError(signInError);
      return;
    }

    navigate(from, { replace: true });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#db7d30] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/80 border-white/10 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#cd3f2c] to-[#db7d30] mb-4">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white text-xl font-semibold mb-1">FenixSites Admin</h1>
          <p className="text-gray-400 text-sm">Sign in with your team account</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed">
            <strong className="block text-amber-100 mb-1">Supabase not configured</strong>
            Add <code className="text-amber-100">VITE_SUPABASE_URL</code> and{" "}
            <code className="text-amber-100">VITE_SUPABASE_ANON_KEY</code> in{" "}
            <strong>Vercel → Settings → Environment Variables</strong>, then redeploy.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-1.5 bg-white/5 border-white/10 text-white"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm leading-relaxed">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full bg-gradient-to-r from-[#cd3f2c] to-[#db7d30] hover:from-[#b33624] hover:to-[#c56d28]"
          >
            <Lock className="w-4 h-4 mr-2" />
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
