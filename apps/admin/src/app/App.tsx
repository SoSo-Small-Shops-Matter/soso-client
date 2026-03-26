import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AdminLayout } from "@/widgets/layout/AdminLayout";
import { ProtectedRoute } from "@/widgets/layout/ProtectedRoute";
import { RootRedirect } from "@/widgets/layout/RootRedirect";
import { LoginPage } from "@/pages/login/LoginPage";
import { UsersPage } from "@/pages/users/UsersPage";
import { WithdrawnUsersPage } from "@/pages/users/WithdrawnUsersPage";
import { SubmissionsPage } from "@/pages/submissions/SubmissionsPage";
import { ShopReportsPage } from "@/pages/shop-reports/ShopReportsPage";
import { ReviewReportsPage } from "@/pages/review-reports/ReviewReportsPage";
import { FeedbackPage } from "@/pages/feedback/FeedbackPage";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Query Error:", error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Root - Auto redirect based on auth state */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users-withdrawn" element={<WithdrawnUsersPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="shop-reports" element={<ShopReportsPage />} />
            <Route path="review-reports" element={<ReviewReportsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
          </Route>

          {/* Catch all - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
