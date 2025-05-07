"use client";

import { useParams, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { sendRequest } from "@/lib/SendRequest";
import { Tab } from "@headlessui/react";
import { FiEdit2, FiLink, FiCalendar, FiMapPin, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { ProfileSkeleton } from "./_components/Skeleton";

export default function ProfilePage() {
  const { userId } = useParams();
  const [validUserId, setValidUserId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const { data: user, error, isLoading} = useUser(validUserId as string);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
    location: "",
    website: "",
    birthday: "",
    interests: [] as string[],
    socialLinks: {
      twitter: "",
      instagram: "",
      linkedin: ""
    },
    experiencePrivacy: "public"
  });

  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    if (typeof userId === "string" && /^[0-9a-fA-F]{24}$/.test(userId)) {
      setValidUserId(userId);
    } else {
      console.error("Invalid userId format:", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
        profileImage: user.profileImage || "",
        location: user.location || "",
        website: user.website || "",
        birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : "",
        interests: user.interests || [],
        socialLinks: {
          twitter: user.socialLinks?.twitter || "",
          instagram: user.socialLinks?.instagram || "",
          linkedin: user.socialLinks?.linkedin || ""
        },
        experiencePrivacy: user.experiencePrivacy || "public"
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await sendRequest.put(`/user/${validUserId}`, {
        ...formData,
        birthday: formData.birthday ? new Date(formData.birthday) : null
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        // mutate();
        setIsEditing(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (!validUserId) {
    return <div className="text-center text-red-500 mt-10">Invalid user ID.</div>;
  }

  if (isLoading) return <ProfileSkeleton />;

  if (error || !user) {
    return <div className="text-center text-red-500 mt-10">Failed to load user data.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          {/* Cover photo placeholder */}
        </div>
        
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
            <div className="flex items-end space-x-4">
              <div className="relative">
                <img
                  src={formData.profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {isEditing && (
                  <button 
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                    onClick={() => document.getElementById('profileImageInput')?.click()}
                  >
                    <FiEdit2 size={16} />
                    <input
                      id="profileImageInput"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          // Handle image upload here
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setFormData(prev => ({
                              ...prev,
                              profileImage: event.target?.result as string
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </button>
                )}
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-2xl font-bold bg-gray-100 rounded px-2 py-1 mb-1"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                )}
                <p className="text-gray-600">
                  Member since {new Date(user.accountCreated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-3">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                  >
                    <FiEdit2 size={16} />
                    <span>Edit Profile</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            {isEditing ? (
              <>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="border rounded-md p-2 w-full h-24"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiMapPin />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="border-b border-gray-300 px-1 py-1 w-full"
                      placeholder="Add your location"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiLink />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="border-b border-gray-300 px-1 py-1 w-full"
                      placeholder="Add your website"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiCalendar />
                    <input
                      type="date"
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleChange}
                      className="border-b border-gray-300 px-1 py-1 w-full"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-700 mb-2 font-medium">Interests</label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      className="border rounded-l-md p-2 flex-grow"
                      placeholder="Add interest"
                      onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <button 
                      onClick={addInterest}
                      className="bg-blue-500 text-white px-3 rounded-r-md hover:bg-blue-600 transition"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, index) => (
                      <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                        {interest}
                        <button 
                          onClick={() => removeInterest(interest)}
                          className="ml-2 text-blue-800 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-700 mb-2 font-medium">Social Links</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <FiTwitter className="text-blue-400" />
                      <input
                        type="text"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        className="border rounded-md p-2 w-full"
                        placeholder="Twitter username"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiInstagram className="text-pink-500" />
                      <input
                        type="text"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        className="border rounded-md p-2 w-full"
                        placeholder="Instagram username"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiLinkedin className="text-blue-600" />
                      <input
                        type="text"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        className="border rounded-md p-2 w-full"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {user.bio && <p className="text-gray-700 mb-6">{user.bio}</p>}

                <div className="space-y-4 mb-6">
                  {user.location && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiMapPin />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <FiLink />
                      <a href={user.website.startsWith('http') ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer">
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  {user.birthday && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <FiCalendar />
                      <span>Born {new Date(user.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                </div>

                {user.interests?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {interest}
                        </span>
                        ))}
                    </div>
                  </div>
                )}

                {(user.socialLinks?.twitter || user.socialLinks?.instagram || user.socialLinks?.linkedin) && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Connect</h3>
                    <div className="flex space-x-4">
                      {user.socialLinks?.twitter && (
                        <a 
                          href={`https://twitter.com/${user.socialLinks.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-500 transition"
                        >
                          <FiTwitter size={20} />
                        </a>
                      )}
                      {user.socialLinks?.instagram && (
                        <a 
                          href={`https://instagram.com/${user.socialLinks.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:text-pink-600 transition"
                        >
                          <FiInstagram size={20} />
                        </a>
                      )}
                      {user.socialLinks?.linkedin && (
                        <a 
                          href={user.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 transition"
                        >
                          <FiLinkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
              {['Profile', 'Experiences', 'Trip Plans', 'Reviews'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                    ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                    ${selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">About Me</h2>
                  <p className="text-gray-700 mb-6">{user.about || "No information provided yet."}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-3">Experience Privacy</h3>
                      <p className="text-gray-600">
                        {user.experiencePrivacy === 'public' ? 'Public' : 'Private'}
                      </p>
                      {isEditing && (
                        <select
                          name="experiencePrivacy"
                          value={formData.experiencePrivacy}
                          onChange={(e) => handleChange(e)}
                          className="mt-2 border rounded-md p-2 w-full"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-3">Member Stats</h3>
                      <div className="space-y-2">
                        <p className="text-gray-600">Experiences: {user.totalExperiences || 0}</p>
                        <p className="text-gray-600">Followers: {user.followers?.length || 0}</p>
                        <p className="text-gray-600">Following: {user.following?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>Experiences content</Tab.Panel>
              <Tab.Panel>Trip Plans content</Tab.Panel>
              <Tab.Panel>Reviews content</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

