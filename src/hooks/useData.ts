import { useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";

export const useProjects = (params?: any) => {
  const query = useQuery({
    queryKey: ["projects", params],
    queryFn: ({signal}) => apiService.getProjects({params, signal}),
    select: (res) => (res.success ? res.data : []),
  });

  return {
    projects: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useBlogPosts = (params?: {
  status?: string;
  category?: string;
  featured?: boolean;
}) => {
  const query = useQuery({
    queryKey: ["blogPosts", params],
    queryFn: () => apiService.getBlogPosts(params),
    select: (res) => (res.success ? res.data : []),
    staleTime: 1000 * 60 * 5,
  });

  return {
    posts: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useSkills = (params?: {
  category?: string;
  status?: string;
}) => {
  const query = useQuery({
    queryKey: ["skills", params],
    queryFn: () => apiService.getSkills(params),
    select: (res) => (res.success ? res.data : []),
    staleTime: 1000 * 60 * 10,
  });

  return {
    skills: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
export const useMessages = (params?: {
  isRead?: boolean;
  isFlagged?: boolean;
}) => {
  const query = useQuery({
    queryKey: ["messages", params],
    queryFn: () => apiService.getMessages(params),
    select: (res) => (res.success ? res.data : []),
    staleTime: 1000 * 30,
  });

  return {
    messages: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useExperiences = () => {
  const query = useQuery({
    queryKey: ["experiences"],
    queryFn: () => apiService.getExperiences(),
    select: (res) => (res.success ? res.data : []),
    staleTime: 1000 * 60 * 60,
  });

  return {
    experiences: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useTestimonials = () => {
  const query = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => apiService.getTestimonials(),
    select: (res) => (res.success ? res.data : []),
    staleTime: 1000 * 60 * 60,
  });

  return {
    testimonials: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
export const useBlogPost = (idOrSlug: string) => {
  const query = useQuery({
    queryKey: ["blogPost", idOrSlug],
    queryFn: () => apiService.getBlogPosts(idOrSlug),
    select: (res) => (res.success ? res.data : null),
    staleTime: 1000 * 60 * 5,
    enabled: !!idOrSlug,
  });

  return {
    post: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useUserProfile = () => {
  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => apiService.getMyProfile(),
    select: (res) => (res.success ? res.data : null),
    staleTime: 1000 * 60 * 60,
  });

  return {
    profile: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

export const usePublicProfile = () => {
  const query = useQuery({
    queryKey: ["publicProfile"],
    queryFn: () => apiService.getPublicProfile(),
    select: (res) => (res.success ? res.data : null),
  });

  return {
    profile: query.data ?? null,
    loading: query.isLoading,
    error: query.error,
  };
};


// const { projects, loading } = useProjects();
// const { skills, loading: skillsLoading } = useSkills();
// const { posts } = useBlogPosts();
// const { experiences } = useExperiences();