import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
    {
      quote:
        "Planning my Gobi trip used to be overwhelming. The AI planner gave me a full itinerary in minutes. It was actually fun!",
      name: "Alex M.",
      designation: "Adventure Seeker from Canada",
      src: "https://images.unsplash.com/photo-1632812452083-72d3c8abe533?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbGVyfGVufDB8fDB8fHww",
    },
    {
      quote:
        "Seeing reviews and real experiences from other travelers helped me choose the right places and avoid tourist traps.",
      name: "Alex Kim",
      designation: "Traveler & Photographer, Seoul",
      src: "https://plus.unsplash.com/premium_photo-1677442691772-99df9fdc076e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhdmVsZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      quote:
        "There's finally a modern travel tool for Mongolia. It helped me find a local company I'd never have discovered on Google.",
      name: "David Stern",
      designation: "Nomadic Spirit, Germany",
      src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww",
    },
  ];
 
 const Testimonials = () => {
    return(
        <div>
                {/* Testimonials */}
                <section className="py-24 px-6 max-w-6xl mx-auto bg-gray-50 rounded-3xl">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full mb-4">
                    Traveler Stories
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Loved by Adventurers Worldwide
                  </h2>
                </motion.div>
                <AnimatedTestimonials testimonials={testimonials} autoplay />
              </section>
        </div>
      
    )
 }

 export default Testimonials;