import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 px-4 md:px-20 py-12">

      {/* Title*/}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Contact Us
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">

        {/* Contact Form */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Get in Touch</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>

            <button
              type="submit"
              className="mt-4 bg-orange-700 text-white font-bold py-3 rounded-lg hover:bg-orange-800 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex-1 bg-white p-6 md:p-10 rounded-xl shadow-lg flex flex-col gap-6 justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Info</h2>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-orange-700 text-xl" />
            <span className="text-gray-700">+1 234 567 890</span>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-orange-700 text-xl" />
            <span className="text-gray-700">info@example.com</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-orange-700 text-xl" />
            <span className="text-gray-700">123 Street, City, Country</span>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 text-sm">
              We respond to all inquiries within 24 hours. Feel free to reach out!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
