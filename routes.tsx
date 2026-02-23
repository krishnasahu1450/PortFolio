import React from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "./src/components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/Projects/AdminProjects";

import AdminSkills from "./pages/AdminSkills";
import AdminExperience from "./pages/AdminExperience";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminMessages from "./pages/AdminMessages";
import AdminSettings from "./pages/AdminSettings";

// Layouts
import PublicLayout from "./src/components/Layouts/PublicLayout";
import AdminLayout from "./src/components/Layouts/AdminLayout";
import AdminBlog from "./pages/Blogs/AdminBlog";
import AddProject from "./pages/Projects/AddProject";
import EditProject from "./pages/Projects/EditProject";
import AdminBlogForm from "./src/components/AdminBlogForm";
import ScrollToTop from "./src/components/Layouts/ScrollToTop";

// Routes configuration
export const routes: RouteObject[] = [
  // Public routes with layout
  {
    element: (
      <>
        <ScrollToTop />
        <PublicLayout />
      </>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:slug", element: <ProjectDetails /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  // Admin Login (no layout)
  {
    path: "admin",
    element: <AdminLogin />,
  },

  // Protected Admin routes with layout
  {
    path: "admin",
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "projects/add", element: <AddProject /> },
      { path: "projects/:id", element: <EditProject /> },
      { path: "blog", element: <AdminBlog /> },
      { path: "blog/create", element: <AdminBlogForm /> },
      { path: "blog/:id", element: <AdminBlogForm /> },
      { path: "skills", element: <AdminSkills /> },
      { path: "experience", element: <AdminExperience /> },
      { path: "testimonials", element: <AdminTestimonials /> },
      { path: "messages", element: <AdminMessages /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },

  // 404 Fallback
  {
    path: "*",
    element: (
      <h1 className="text-center mt-20 text-white">404 - Page Not Found</h1>
    ),
  },
];
