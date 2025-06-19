import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export function useBackendUser() {
  const { user } = useUser();

  const fetchUserData = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }
    const response = await fetch(`/api/users/${user.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data.data; // Assuming your API returns { data: {...} }
  };

  const {
    data: backendUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["backendUser", user?.id], // Unique key for the query
    queryFn: fetchUserData, // Function to fetch the data
    enabled: !!user, // Only run the query if the user is authenticated
    retry: 3, // Retry up to 3 times on failure
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // Exponential backoff: 1s, 2s, 4s, up to 30s
  });

  return { backendUser, loading: isLoading, error };
}

// import { useBackendUser } from "@/hooks/useBackendUser";

// export default function Dashboard() {
//   const { backendUser, loading, error } = useBackendUser();

//   if (loading) {
//     return <div>Loading user data...</div>;
//   }
//   if (error) {
//     return <div>Error: {error}. Please try refreshing the page.</div>;
//   }
//   return (
//     <div>
//       Hello, {backendUser.name}! Your role is {backendUser.role}.
//     </div>
//   );
// }

// // app/dashboard-wrapper.tsx (client component)
// 'use client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

// export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
//   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
// }
// app/dashboard/page.tsx (server component)
// import DashboardWrapper from '../dashboard-wrapper';

// export default async function DashboardPage() {
//   return (
//     <DashboardWrapper>
//       <div>Dashboard Content</div>
//     </DashboardWrapper>
//   );
// }
