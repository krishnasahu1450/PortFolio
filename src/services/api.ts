import { apiInstance } from "./apiInstance";

// ApiService class
class ApiService {
  // Auth
  async login(email: string, password: string) {
    const res = await apiInstance.post("/auth/login", { email, password });
    if (res.data?.success) {
      localStorage.setItem("authToken", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
    }
    return res.data;
  }

  async logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  // Projects
  async getProjects({ params, signal }: { params?: any, signal?: AbortSignal }) {
    const res = await apiInstance.get("/projects", { params });
    return res.data;
  }

  async getProjectById(id: string) {
    const res = await apiInstance.get(`/projects/${id}`);
    return res.data;
  }

  async createProject(project: any) {
    const res = await apiInstance.post("/projects", project);
    return res.data;
  }

  async updateProject(id: string, project: any) {
    const res = await apiInstance.put(`/projects/${id}`, project);
    return res.data;
  }

  async deleteProject(id: string) {
    const res = await apiInstance.delete(`/projects/${id}`);
    return res.data;
  }

  // Blog
  async getBlogPosts(params?: any) {
    const res = await apiInstance.get("/blog", { params });
    return res.data;
  }

  async getBlogPostById(id: string) {
    const res = await apiInstance.get(`/blog/${id}`);
    return res.data;
  }

  async createBlogPost(post: any) {
    const res = await apiInstance.post("/blog", post);
    return res.data;
  }

  async updateBlogPost(id: string, post: any) {
    const res = await apiInstance.put(`/blog/${id}`, post);
    return res.data;
  }

  async deleteBlogPost(id: string) {
    const res = await apiInstance.delete(`/blog/${id}`);
    return res.data;
  }

  // Skills
  async getSkills(params?: any) {
    const res = await apiInstance.get("/skills", { params });
    return res.data;
  }

  async createSkill(skill: any) {
    const res = await apiInstance.post("/skills", skill);
    return res.data;
  }

  async updateSkill(id: string, skill: any) {
    const res = await apiInstance.put(`/skills/${id}`, skill);
    return res.data;
  }

  async deleteSkill(id: string) {
    const res = await apiInstance.delete(`/skills/${id}`);
    return res.data;
  }

  // Messages
  async getMessages(params?: any) {
    const res = await apiInstance.get("/messages", { params });
    return res.data;
  }

  async createMessage(message: any) {
    const res = await apiInstance.post("/messages", message);
    return res.data;
  }

  async updateMessage(id: string, message: any) {
    const res = await apiInstance.put(`/messages/${id}`, message);
    return res.data;
  }

  async deleteMessage(id: string) {
    const res = await apiInstance.delete(`/messages/${id}`);
    return res.data;
  }


  // Experice and Timeline
  async getExperiences() {
    const res = await apiInstance.get("/experiences");
    return res.data;
  }

  async createExperience(experience: any) {
    const res = await apiInstance.post("/experiences", experience);
    return res.data;
  }

  async updateExperience(id: string, experience: any) {
    const res = await apiInstance.put(`/experiences/${id}`, experience);
    return res.data;
  }

  async deleteExperience(id: string) {
    const res = await apiInstance.delete(`/experiences/${id}`);
    return res.data;
  }

  async getTimeline() {
    const res = await apiInstance.get("/timeline");
    return res.data;
  }

  async getTestimonials() {
    const res = await apiInstance.get("/testimonials/live");
    return res.data;
  }

  async createTestimonial(payload: FormData) {
    const res = await apiInstance.post("/testimonials", payload);
    return res.data;
  }

  async updateTestimonial({ id, payload }: { id: string, payload: FormData }) {
    const res = await apiInstance.put(`/testimonials/${id}`, payload);
    return res.data;
  }

  async toggleVisibility(id: string) {
    const res = await apiInstance.patch(`/testimonials/${id}/visibility`);
    return res.data;
  }
  async deleteTestimonial(id: string) {
    const res = await apiInstance.delete(`/testimonials/${id}`);
    return res.data;
  }

  // Admin Settings
  async getMyProfile() {
    const res = await apiInstance.get("/profile/me");
    return res.data;
  }
  async updateMyProfile(payload: any) {
    const res = await apiInstance.post("/profile", payload);
    return res.data;
  }
  async deleteMyProfile() {
    const res = await apiInstance.delete("/profile");
    return res.data;
  }

  async getPublicProfile() {
    const res = await apiInstance.get("/profile/public");
    return res.data;
  }

}

export const apiService = new ApiService();
export default apiInstance;
