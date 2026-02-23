import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { AuthProvider } from "./src/contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/services/queryClient";
import { routes } from "./routes";
import { Toaster } from "sonner";

const Routing: React.FC = () => useRoutes(routes);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routing />
          <Toaster richColors  position="bottom-center"/>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;