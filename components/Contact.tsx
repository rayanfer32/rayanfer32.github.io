import React, { useState } from "react";
import userData from "@constants/data";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";
import { BsEnvelopeFill, BsPhone, BsPinMapFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false);

  function handleOnSubmit(e) {
    e.preventDefault();

    const formValues: {
      name?: string;
      email?: string;
      message?: string;
    } = {};
    const form = e.target;
    for (var i = 0; i < form.elements.length; i++) {
      const e = form.elements[i];
      formValues[e.name] = e.value;
    }
    let message = `
${formValues.name} wants to contact you, 

Message:
${formValues.message}

Reply to this email:
${formValues.email}`;

    fetch("/api/contact", {
      method: "POST",
      body: message,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.reply);
        setIsMessageSent(true);
      })
      .catch((err) => {
        alert("Oops your message was not sent. Please Retry again.");
      });
  }

  return (
    <>
      <section className="w-full bg-white dark:bg-gray-800 p-2">
        <div className="max-w-6xl mx-auto h-48 ">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left"
          >
            Contact
          </motion.h1>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-md shadow-md bg-blue-100 text-black dark:bg-slate-900 dark:text-white p-4 md:p-10 lg:p-20 max-w-6xl mx-auto mb-20 mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {isMessageSent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-2 rounded-lg bg-white dark:bg-blue-900 justify-center items-center p-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <BsEnvelopeFill className="" color="#40e3ca" size={"4rem"} />
                  </motion.div>
                  <p className="p-2 text-xl font-semibold">Your message was delivered!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 rounded-md px-6 mt-8 py-2 text-gray-50 text-sm font-bold"
                    onClick={() => setIsMessageSent(false)}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`hidden form rounded-lg bg-white text-gray-600 dark:bg-slate-800/75 dark:text-white  p-4 flex-col`}
                  onSubmit={handleOnSubmit}
                >
                  <label htmlFor="name" className="text-sm mx-4">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="font-light rounded-md focus:outline-hidden py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                    name="name"
                  />
                  <label htmlFor="email" className="text-sm mx-4 mt-4">
                    Email
                  </label>
                  <input
                    type="email"
                    className="font-light rounded-md focus:outline-hidden py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                    name="email"
                  />
                  <label htmlFor="message" className="text-sm mx-4 mt-4">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="font-light rounded-md focus:outline-hidden py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                    name="message"
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-blue-500 rounded-md w-1/2 mx-4 mt-8 py-2 text-gray-50 text-xs font-bold"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
            <div className="md:ml-4">
              <header className="">
                <h1 className="font-semibold text-2xl">
                  Get in touch, let's talk.
                </h1>
                <p className="font-light text-base mt-2">
                  Fill in the details and I'll get back to you as soon as I can.
                </p>
              </header>
              <div className="icons-container inline-flex flex-col my-20 space-y-4">
                {[
                  { icon: <BsPhone />, text: userData.phone },
                  { icon: <BsEnvelopeFill />, text: userData.email },
                  { icon: <BsPinMapFill />, text: userData.address },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="flex flex-row items-center space-x-6 rounded-md hover:bg-white/10 p-4 transition-colors"
                  >
                    {item.icon}
                    <p className="font-light text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white social-icons flex flex-row justify-around dark:bg-slate-800 shadow-md rounded-full space-x-8 p-2">
                {[
                  { icon: <FiFacebook />, link: userData.socialLinks.facebook },
                  { icon: <FiTwitter />, link: userData.socialLinks.twitter },
                  { icon: <FiInstagram />, link: userData.socialLinks.instagram },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.link}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.8 }}
                    className="h-10 w-10 rounded-full hover:bg-blue-400 flex items-center justify-center cursor-pointer text-gray-700 dark:text-gray-200 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
