import { trpc } from "@/lib/trpc";

export function useAuth() {
  const { data: user, isLoading: loading, error } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.reload();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return {
    user: user ?? null,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  };
}
