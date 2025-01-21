import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import LoadingPage from "../pages/LoadingPage";
import { Session } from "@supabase/supabase-js";

// Define the user type that matches your expected structure
interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

const UserContext = createContext<{
  user: User | null;
}>({
  user: null,
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        if (session?.user) {
          const { id, email, user_metadata } = session.user;
          setUser({
            id,
            email: email!,
            user_metadata
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Get initial session
    const initializeUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { id, email, user_metadata } = session.user;
        setUser({
          id,
          email: email!,
          user_metadata
        });
      }
      setIsLoading(false);
    };

    initializeUser();

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {isLoading ? <LoadingPage /> : children}
    </UserContext.Provider>
  );
};