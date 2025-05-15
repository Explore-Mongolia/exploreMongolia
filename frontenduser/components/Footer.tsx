import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiGlobe,
  FiYoutube,
  FiInstagram,
} from "react-icons/fi";

const socialLinks = [
  {
    id: 1,
    icon: <FiGlobe />,
    url: "https://exploremongoliafront.vercel.app/",
  },
  {
    id: 2,
    icon: <FiGithub />,
    url: "https://github.com/Explore-Mongolia/exploreMongolia",
  },
  {
    id: 3,
    icon: <FiTwitter />,
    url: "https://twitter.com/",
  },
  {
    id: 4,
    icon: <FiInstagram />,
    url: "https://www.instagram.com",
  },
  {
    id: 5,
    icon: <FiYoutube />,
    url: "https://www.youtube.com",
  },
  
];

const Footer = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
        {/* Footer social links */}
        <div className="font-general-regular flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-0 mb-12 sm:mb-28 text-center sm:text-left">
          <p className="text-sm sm:text-xl text-[#71717A] dark:text-primary-light">
            Copyright 2025 © pinecone2c.teamfour
          </p>
          <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8">
            {socialLinks.map((link) => (
              <a
                href={link.url}
                target="__blank"
                key={link.id}
                className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-3 sm:p-4 duration-300"
              >
                <i className="text-xl sm:text-2xl md:text-3xl">{link.icon}</i>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
