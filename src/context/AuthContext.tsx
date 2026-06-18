import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import type { Profile, UserRole } from "../lib/types/database";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole | null;
  loading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  hasRole: (...roles: UserRole[]) => boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const profileRef = useRef<Profile | null>(null);
  const fetchGenerationRef = useRef(0);
  const activeRef = useRef(true);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return;

    const generation = ++fetchGenerationRef.current;
    const hasCachedProfile = profileRef.current?.id === userId;
    if (!hasCachedProfile) setProfileLoading(true);

    for (let attempt = 0; attempt < 3; attempt++) {
      if (generation !== fetchGenerationRef.current) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (generation !== fetchGenerationRef.current) return;

      if (data) {
        setProfile(data as Profile);
        setProfileLoading(false);
        return;
      }

      if (error?.code === "PGRST116") {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 300 * (attempt + 1)));
      }
    }

    if (generation !== fetchGenerationRef.current) return;

    // Transient failure — keep the cached profile instead of signing the user out visually.
    if (profileRef.current?.id === userId) {
      setProfileLoading(false);
      return;
    }

    setProfile(null);
    setProfileLoading(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  const applySession = useCallback(
    async (nextSession: Session | null, event?: AuthChangeEvent) => {
      if (!activeRef.current) return;

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        fetchGenerationRef.current++;
        setProfile(null);
        setProfileLoading(false);
        setLoading(false);
        return;
      }

      if (
        event === "TOKEN_REFRESHED" &&
        profileRef.current?.id === nextSession.user.id
      ) {
        setLoading(false);
        return;
      }

      await fetchProfile(nextSession.user.id);
      if (activeRef.current) setLoading(false);
    },
    [fetchProfile]
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    activeRef.current = true;

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      void applySession(initialSession, "INITIAL_SESSION");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      // Defer async work — Supabase auth can deadlock if awaited inside this callback.
      setTimeout(() => {
        void applySession(nextSession, event);
      }, 0);
    });

    return () => {
      activeRef.current = false;
      fetchGenerationRef.current++;
      subscription.unsubscribe();
    };
  }, [applySession]);

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return {
        error:
          "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.",
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        return {
          error:
            "Email not confirmed. Disable email confirmation in Supabase Auth settings, or confirm your email.",
        };
      }
      return { error: error.message };
    }

    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
      await fetchProfile(data.session.user.id);
    }

    return { error: null };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    fetchGenerationRef.current++;
    setSession(null);
    setUser(null);
    setProfile(null);
    setProfileLoading(false);
  };

  const role = profile?.role ?? null;

  const hasRole = useCallback((...roles: UserRole[]) => {
    if (!role) return false;
    if (role === "super_admin") return true;
    return roles.includes(role);
  }, [role]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        loading,
        profileLoading,
        signIn,
        signOut,
        hasRole,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { isSupabaseConfigured };
