import {
  FiMapPin,
  FiLink,
  FiCalendar,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

interface MainContentProps {
  user: {
   bio: String,
   location?: string,
   interests?: string[],
   website?: string,
   birthday?: string,
   socialLinks?: {
     twitter?: string;
     instagram?: string;
     linkedin?: string;
   },
   
    
  };
}

const SideBar: React.FC<MainContentProps>  = ({user}) => {
    return (
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
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
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {user.birthday && (
                <div className="flex items-center space-x-2 text-gray-700">
                  <FiCalendar />
                  <span>
                    Born{" "}
                    {new Date(user.birthday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            {(user.interests ?? []).length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {(user.interests ?? []).map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(user.socialLinks?.twitter ||
              user.socialLinks?.instagram ||
              user.socialLinks?.linkedin) && (
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
          </div>
        </div>
    )
}

export default SideBar;