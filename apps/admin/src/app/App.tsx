import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AdminLayout } from "@/app/layout/AdminLayout";
import { ProtectedRoute } from "@/app/layout/ProtectedRoute";
import { RootRedirect } from "@/app/layout/RootRedirect";
import { LoginPage } from "@/app/login/LoginPage";
import { UsersPage } from "@/app/users/UsersPage";
import { WithdrawnUsersPage } from "@/app/users/WithdrawnUsersPage";
import { SubmissionsPage } from "@/app/submissions/SubmissionsPage";
import { ShopReportsPage } from "@/app/shop-reports/ShopReportsPage";
import { ReviewReportsPage } from "@/app/review-reports/ReviewReportsPage";
import { FeedbackPage } from "@/app/feedback/FeedbackPage";

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
      <BrowserRouter>
        <Routes>
          {/* Root - Auto redirect based on auth state */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public Routes */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
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
