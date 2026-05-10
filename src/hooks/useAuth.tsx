import { useState, useEffect, createContext, useContext, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null; isAdmin: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const formatAuthError = (message?: string | null) => {
  if (!message) return null;
  if (/user already registered/i.test(message)) return "This email is already registered";
  if (/email not confirmed/i.test(message)) return "Please verify your email before logging in.";
  return message;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const activeUserIdRef = useRef<string | null>(null);

  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Admin role check error:", error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error("Admin role check exception:", error);
      return false;
    }
  }, []);

  const syncSessionState = useCallback((nextSession: Session | null) => {
    const nextUser = nextSession?.user ?? null;
    const nextUserId = nextUser?.id ?? null;

    activeUserIdRef.current = nextUserId;
    setSession(nextSession);
    setUser(nextUser);
    setIsAdmin(false);

    if (!nextUserId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    window.setTimeout(() => {
      void checkAdminRole(nextUserId)
        .then((admin) => {
          if (activeUserIdRef.current === nextUserId) {
            setIsAdmin(admin);
          }
        })
        .finally(() => {
          if (activeUserIdRef.current === nextUserId) {
            setLoading(false);
          }
        });
    }, 0);
  }, [checkAdminRole]);

  useEffect(() => {
    let isMounted = true;

    void supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (isMounted) {
          syncSessionState(session);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        syncSessionState(nextSession);
      }
    });

    return () => {
      isMounted = false;
      activeUserIdRef.current = null;
      subscription.unsubscribe();
    };
  }, [syncSessionState]);

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
          phone: phone?.trim() || null,
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    return { error: formatAuthError(error?.message) };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return { error: formatAuthError(error.message), isAdmin: false };
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    const admin = data.user ? await checkAdminRole(data.user.id) : false;
    setIsAdmin(admin);

    return { error: null, isAdmin: admin };
  };

  const signOut = async () => {
    activeUserIdRef.current = null;
    setIsAdmin(false);
    setUser(null);
    setSession(null);
    await supabase.auth.signOut({ scope: "local" });
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    return { error: formatAuthError(error?.message) };
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};