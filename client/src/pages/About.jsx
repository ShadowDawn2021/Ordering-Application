import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Serving authentic sushi and sashimi with a modern twist, made with
            love and the freshest ingredients.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="https://media.istockphoto.com/id/1555947107/photo/set-of-sushi-and-maki.jpg?s=612x612&w=0&k=20&c=Tdt7UyRfO-JERN_SXIdf-l8uhD_dVDyH-xzXYh2Q5-Y="
            alt="Sushi Story"
            className="rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a passion for Japanese cuisine, our restaurant was
              built on the idea of sharing fresh, high-quality sushi that
              everyone can enjoy. We carefully select the best ingredients and
              prepare each dish with care to bring the taste of Japan closer to
              you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Fresh Ingredients",
              desc: "We source only the finest, freshest seafood and produce.",
            },
            {
              title: "Authenticity",
              desc: "Respecting Japanese tradition while adding a modern touch.",
            },
            {
              title: "Customer Experience",
              desc: "Every meal should be memorable, warm, and satisfying.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              name: "Chef Hiroshi",
              role: "Head Sushi Chef",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Aiko Tanaka",
              role: "Sous Chef",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Kenji Sato",
              role: "Restaurant Manager",
              img: "https://randomuser.me/api/portraits/men/46.jpg",
            },
          ].map((member, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
