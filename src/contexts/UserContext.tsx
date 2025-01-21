import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { UserService } from "../services/user.service";
import LoadingPage from "../pages/LoadingPage";
import { Session } from "@supabase/supabase-js";
import { User } from "../types/supabase";

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

  const handleAuthChange = async (event: string, session: Session | null) => {
    console.log('Auth state changed:', { 
      event, 
      userId: session?.user?.id,
      currentUserId: user?.id 
    });

    try {
      // Handle sign out
      if (event === 'SIGNED_OUT') {
        setUser(null);
        return;
      }

      // No session case
      if (!session?.user) {
        setUser(null);
        return;
      }

      // Check if we already have the correct user loaded
      if (user?.id === session.user.id) {
        console.log('User already loaded correctly, skipping refresh');
        return;
      }

      // Get user data
      let userData = await UserService.getCurrentUser();
      
      if (!userData) {
        console.log('User not found in database, creating...');
        userData = await UserService.createOrUpdateUser(session.user);
        
        if (!userData) {
          throw new Error('Failed to create user record');
        }
      }

      setUser(userData);
    } catch (error) {
      console.error('Error handling auth change:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Initialize
    const initialize = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (mounted) {
          setIsLoading(true);
          await handleAuthChange('INITIAL', session);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error in initialization:', error);
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          // Only show loading for initial sign in or sign out
          const shouldShowLoading = event === 'INITIAL' || 
                                  event === 'SIGNED_OUT' || 
                                  (event === 'SIGNED_IN' && !user);

          if (shouldShowLoading) {
            setIsLoading(true);
          }

          await handleAuthChange(event, session);

          if (shouldShowLoading) {
            setIsLoading(false);
          }
        }
      }
    );

    initialize();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [user]); // Added user to dependency array to track changes

  // Debug logging
  useEffect(() => {
    console.log('Provider State:', {
      hasUser: !!user,
      isLoading,
      userId: user?.id,
      event: 'state-update'
    });
  }, [user, isLoading]);

  return (
    <UserContext.Provider value={{ user }}>
      {isLoading ? <LoadingPage /> : children}
    </UserContext.Provider>
  );
};