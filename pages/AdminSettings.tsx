// import React from "react";

// const AdminSettings: React.FC = () => {
//   return (
//     <div className="max-w-full mx-auto flex flex-col gap-8 pb-20">
//       <div className="flex flex-wrap justify-between items-center gap-4">
//         <h1 className="text-white text-3xl font-bold tracking-tight">
//           Settings
//         </h1>
//       </div>

//       <section className="rounded-xl bg-surface-dark border border-border-dark p-6 shadow-sm">
//         <div className="flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-between">
//           <div className="flex gap-5 items-center">
//             <div className="relative group cursor-pointer">
//               <img
//                 src="https://picsum.photos/100/100?random=10"
//                 className="rounded-full h-24 w-24 border-2 border-border-dark object-cover"
//                 alt="Profile"
//               />
//               <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                 <span className="material-symbols-outlined text-white">
//                   photo_camera
//                 </span>
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <h2 className="text-white text-xl font-bold leading-tight">
//                 Profile Photo
//               </h2>
//               <p className="text-text-secondary text-sm mt-1 max-w-xs">
//                 This will be displayed on your portfolio homepage and
//                 navigation.
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-3 w-full md:w-auto">
//             <button className="flex-1 md:flex-none h-10 px-4 rounded-lg border border-border-dark text-white text-sm font-semibold hover:bg-background-dark">
//               Remove
//             </button>
//             <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-border-dark text-primary text-sm font-semibold hover:bg-background-dark border border-transparent hover:border-primary/20">
//               Upload New
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="rounded-xl bg-surface-dark border border-border-dark overflow-hidden shadow-sm">
//         <div className="border-b border-border-dark px-6 py-4">
//           <h3 className="text-white text-lg font-bold">Personal Information</h3>
//         </div>
//         <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
//           <div className="md:col-span-6 flex flex-col gap-2">
//             <label className="text-text-secondary text-sm font-medium">
//               First Name
//             </label>
//             <input
//               className="w-full bg-background-dark border-border-dark rounded-lg h-10 px-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
//               type="text"
//               defaultValue="Alex"
//             />
//           </div>
//           <div className="md:col-span-6 flex flex-col gap-2">
//             <label className="text-text-secondary text-sm font-medium">
//               Last Name
//             </label>
//             <input
//               className="w-full bg-background-dark border-border-dark rounded-lg h-10 px-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
//               type="text"
//               defaultValue="Morgan"
//             />
//           </div>
//           <div className="md:col-span-12 flex flex-col gap-2">
//             <label className="text-text-secondary text-sm font-medium">
//               Job Title
//             </label>
//             <div className="relative">
//               <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-secondary text-[20px]">
//                 work
//               </span>
//               <input
//                 className="w-full bg-background-dark border-border-dark rounded-lg h-10 pl-10 pr-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none"
//                 type="text"
//                 defaultValue="Senior Full Stack Developer"
//               />
//             </div>
//           </div>
//           <div className="md:col-span-12 flex flex-col gap-2">
//             <label className="text-text-secondary text-sm font-medium">
//               Bio
//             </label>
//             <textarea
//               className="w-full bg-background-dark border-border-dark rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none h-32 resize-none"
//               defaultValue="Product developer with over 6 years of experience building digital products for startups and enterprise clients. Passionate about clean code and scalable architecture."
//             />
//             <p className="text-text-secondary/50 text-xs text-right">
//               184/500 characters
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="rounded-xl bg-surface-dark border border-border-dark overflow-hidden shadow-sm">
//         <div className="border-b border-border-dark px-6 py-4 flex justify-between items-center">
//           <h3 className="text-white text-lg font-bold">Documents</h3>
//         </div>
//         <div className="p-6">
//           <div className="border border-dashed border-border-dark bg-background-dark/30 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:bg-background-dark transition-colors cursor-pointer group">
//             <div className="h-12 w-12 rounded-full bg-surface-dark flex items-center justify-center group-hover:scale-110 transition-transform">
//               <span className="material-symbols-outlined text-primary">
//                 upload_file
//               </span>
//             </div>
//             <div>
//               <p className="text-white font-medium">Upload Resume</p>
//               <p className="text-text-secondary text-sm">
//                 PDF, DOCX up to 10MB
//               </p>
//               <input type="file" className="hidden" id="resume-upload" />
//             </div>
//           </div>
//           <div className="mt-4 flex items-center justify-between p-3 bg-background-dark rounded-lg border border-border-dark">
//             <div className="flex items-center gap-3">
//               <div className="bg-red-500/20 text-red-400 p-2 rounded-lg">
//                 <span className="material-symbols-outlined text-[20px]">
//                   picture_as_pdf
//                 </span>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-white text-sm font-medium">
//                   Alex_Morgan_Resume_2024.pdf
//                 </p>
//                 <p className="text-text-secondary text-xs">
//                   2.4 MB • Uploaded 2 days ago
//                 </p>
//               </div>
//             </div>
//             <button className="text-text-secondary hover:text-white p-2">
//               <span className="material-symbols-outlined">close</span>
//             </button>
//           </div>
//         </div>
//         <button className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:brightness-110 transition-colors text-background-dark font-bold shadow-lg shadow-primary/20">
//           Save Changes
//         </button>
//       </section>
//     </div>
//   );
// };

// export default AdminSettings;

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiService } from "@/src/services/api";

const AdminSettings: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => apiService.getMyProfile(),
    select: (res) => (res.success ? res.data : null),
  });
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_API_BASE || "";

  const [formData, setFormData] = useState<any>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const upsertMutation = useMutation({
    mutationFn: (data: FormData) => apiService.updateMyProfile(data),
    onSuccess: () => {
      toast.success("Profile saved successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => apiService.deleteMyProfile(),
    onSuccess: () => {
      toast.success("Profile deleted");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        if (key === "avatar" || key === "resume") {
          // skip files in formData, we'll append them separately
          return;
        }
        data.append(key, formData[key]);
      }
    });

    if (avatarFile) data.append("avatar", avatarFile);
    if (resumeFile as File) data.append("resume", resumeFile);

    upsertMutation.mutate(data);
  };

  return (
    <div className="max-w-full mx-auto flex flex-col gap-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Settings
        </h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="h-10 px-4 rounded-lg bg-primary text-black font-semibold"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                // setFormData(profile); // reset changes
              }}
              className="h-10 px-4 rounded-lg border border-border-dark text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={upsertMutation.isPending}
              className="h-10 px-6 bg-primary text-black font-bold rounded-lg"
            >
              {upsertMutation.isPending ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* ================= PROFILE PHOTO ================= */}
      <section className="rounded-xl bg-surface-dark border border-border-dark p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start md:justify-between">
          {/* Left */}
          <div className="flex gap-5 items-center">
            <label className="relative group cursor-pointer">
              <img
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : IMAGE_BASE_URL + profile?.avatar
                }
                className="rounded-full h-24 w-24 border-2 border-border-dark object-cover"
                alt="Profile"
              />
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white">
                  photo_camera
                </span>
              </div>
            </label>

            <div>
              <h2 className="text-white text-xl font-bold">Profile Photo</h2>
              <p className="text-text-secondary text-sm mt-1 max-w-xs">
                This will be displayed on your portfolio homepage and
                navigation.
              </p>
            </div>
          </div>

          {/* Right */}
          {isEditing && (
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setAvatarFile(null)}
                className="h-10 px-4 rounded-lg border border-border-dark text-white"
              >
                Remove
              </button>

              <button
                onClick={() => deleteMutation.mutate()}
                className="h-10 px-4 rounded-lg bg-red-600 text-white"
              >
                Delete Profile
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= PERSONAL INFO ================= */}
      <section className="rounded-xl bg-surface-dark border border-border-dark overflow-hidden shadow-sm">
        <div className="border-b border-border-dark px-6 py-4">
          <h3 className="text-white text-lg font-bold">Personal Information</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
          <Input
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle || ""}
            onChange={handleChange}
            className="md:col-span-12"
            disabled={!isEditing}
          />
          <Input
            label="Location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="md:col-span-12"
            disabled={!isEditing}
          />

          <div className="md:col-span-12">
            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <Input
            label="Website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
          <Input
            label="GitHub"
            name="github"
            value={formData.github || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
          <Input
            label="LinkedIn"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
          <Input
            label="Twitter"
            name="twitter"
            value={formData.twitter || ""}
            onChange={handleChange}
            className="md:col-span-6"
            disabled={!isEditing}
          />
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="rounded-xl bg-surface-dark border border-border-dark overflow-hidden shadow-sm">
        <div className="border-b border-border-dark px-6 py-4">
          <h3 className="text-white text-lg font-bold">Documents</h3>
        </div>

        <div className="p-6">
          {/* If Editing Mode */}
          {isEditing && (
            <>
              {/* If No File Selected */}
              {!resumeFile ? (
                <label className="border border-dashed border-border-dark bg-background-dark/30 rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center hover:bg-background-dark transition-colors cursor-pointer group">
                  <div className="h-12 w-12 rounded-full bg-surface-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary">
                      upload_file
                    </span>
                  </div>

                  <div>
                    <p className="text-white font-medium">Upload Resume</p>
                    <p className="text-text-secondary text-sm">
                      PDF, DOCX up to 10MB
                    </p>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                </label>
              ) : (
                /* If File Selected */
                <div className="flex items-center justify-between p-4 bg-background-dark rounded-lg border border-border-dark">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400">
                      description
                    </span>

                    <div>
                      <p className="text-white text-sm font-medium">
                        {resumeFile.name}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-red-400 hover:text-red-500 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}
            </>
          )}

          {/* Existing Resume */}
          {!resumeFile && profile?.resume && (
            <div className="mt-4 flex items-center justify-between p-3 bg-background-dark rounded-lg border border-border-dark">
              <p className="text-white text-sm font-medium">Current Resume</p>

              <a
                href={`${IMAGE_BASE_URL}${profile.resume}`}
                target="_blank"
                className="text-primary text-sm"
              >
                View
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminSettings;

const Input = ({ label, className = "", disabled, ...props }: any) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <label className="text-text-secondary text-sm font-medium">{label}</label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full rounded-lg h-10 px-3 outline-none border
      ${
        disabled
          ? "bg-background-dark/50 border-border-dark text-text-secondary cursor-not-allowed"
          : "bg-background-dark border-border-dark text-white focus:border-primary focus:ring-1 focus:ring-primary"
      }`}
    />
  </div>
);

const Textarea = ({ label, disabled, ...props }: any) => (
  <div className="flex flex-col gap-2">
    <label className="text-text-secondary text-sm font-medium">{label}</label>
    <textarea
      {...props}
      disabled={disabled}
      className={`rounded-lg p-3 outline-none border h-32 resize-none
      ${
        disabled
          ? "bg-background-dark/50 border-border-dark text-text-secondary cursor-not-allowed"
          : "bg-background-dark border-border-dark text-white focus:border-primary focus:ring-1 focus:ring-primary"
      }`}
    />
  </div>
);
