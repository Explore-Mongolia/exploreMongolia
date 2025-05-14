import { motion } from "framer-motion";
import {
    RocketIcon,
    MapPinnedIcon,
    StarIcon,
    UsersIcon,
  } from "lucide-react";

const Features = ( ) => {

    const features = [
        {
          icon: RocketIcon,
          title: "AI Trip Generator",
          description:
            "Instantly create custom travel plans based on your interests.",
        },
        {
          icon: MapPinnedIcon,
          title: "Local Destination Guide",
          description: "Explore authentic Mongolian places curated by locals.",
        },
        {
          icon: StarIcon,
          title: "Community Reviews",
          description: "Read honest reviews and ratings from fellow travelers.",
        },
        {
          icon: UsersIcon,
          title: "Share Experiences",
          description: "Post your adventures and inspire the travel community.",
        },
      ];

    return(
        <div>
            <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Your Complete Mongolia Travel Companion
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Everything you need to plan, experience, and share your Mongolian
            adventure
          </p>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="text-center bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

        </div>
    )
}

export default Features;