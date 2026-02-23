import React from "react";
import { apiService } from "../src/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const [cooldown, setCooldown] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  React.useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const messageMutation = useMutation({
    mutationFn: (data: typeof formData) => apiService.createMessage(data),

    onSuccess: (response) => {
      if (response.success) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setCooldown(30);
        toast.success(response.message || "Message sent successfully!");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    messageMutation.mutate(formData);
  };

  return (
    <main className="flex flex-col justify-center py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em] text-white">
                Let's build <span className="text-primary">something</span>{" "}
                together.
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-md">
                I'm currently open to new opportunities. Whether you have a
                question or just want to say hi, I'll try my best to get back to
                you!
              </p>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <a
                className="flex items-center gap-3 text-white hover:text-primary transition-colors group"
                href="mailto:hello@example.com"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-surface-dark group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-xl">
                    mail
                  </span>
                </div>
                <span className="text-base font-medium">hello@example.com</span>
              </a>
              <div className="flex items-center gap-3 text-white">
                <div className="flex items-center justify-center size-10 rounded-full bg-surface-dark">
                  <span className="material-symbols-outlined text-xl">
                    location_on
                  </span>
                </div>
                <span className="text-base font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-7">
            <div className="rounded-xl bg-surface-dark border border-border-dark p-6 sm:p-10 shadow-sm">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send a message
              </h2>

              {messageMutation.isSuccess && (
                <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>
                    <span className="font-medium">
                      Message sent successfully!
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-green-300">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
              )}

              {messageMutation.isError && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      error
                    </span>
                    <span className="font-medium">Failed to send message</span>
                  </div>
                  <p className="text-sm mt-1">
                    {(messageMutation.error as any)?.message ||
                      "Something went wrong"}
                  </p>
                </div>
              )}

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-dark bg-background-dark text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-colors"
                    placeholder="Jane Doe"
                    required
                    type="text"
                    disabled={messageMutation.isPending}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">
                    Email
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-dark bg-background-dark text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-colors"
                    placeholder="jane@example.com"
                    required
                    type="email"
                    disabled={messageMutation.isPending}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-dark bg-background-dark text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-colors"
                    placeholder="Project inquiry, collaboration, etc."
                    required
                    type="text"
                    disabled={messageMutation.isPending}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-border-dark bg-background-dark text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary p-4 resize-none transition-colors"
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    disabled={messageMutation.isPending}
                  />
                </div>
                <div className="pt-2">
                  <button
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-background-dark shadow-sm hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={messageMutation.isPending || cooldown > 0}
                  >
                    {messageMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : cooldown > 0 ? (
                      <>Try again in {cooldown}s</>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined ml-2 text-lg">
                          send
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
