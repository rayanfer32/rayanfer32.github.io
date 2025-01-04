import React, { useState } from "react";
import userData from "@constants/data";
import { FiInstagram, FiTwitter, FiFacebook, FiPhone, FiX } from "react-icons/fi";
import { BsEnvelopeFill, BsPhone, BsPinMapFill } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Contact() {
  const [isMessageSent, setIsMessageSent] = useState(false);

  function handleOnSubmit(e) {
    e.preventDefault();

    const formValues = {};
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
        // alert(data.message);
      })
      .catch((err) => {
        alert("Oops your message was not sent. Please Retry again.");
      });
  }

  return (
    <>
      <section className="w-full bg-white dark:bg-gray-800 p-2">
        <div className="max-w-6xl mx-auto h-48 ">
          <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
            Contact
          </h1>
        </div>
        <div className="relative rounded-md shadow-md bg-blue-100 text-black dark:bg-slate-900 dark:text-white p-4 md:p-10 lg:p-20 max-w-6xl mx-auto mb-20 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isMessageSent ? (
              <div className="flex flex-col gap-2 rounded-lg bg-white dark:bg-blue-900 justify-center items-center">
                <BsEnvelopeFill className="" color="#40e3ca" size={"2rem"} />
                <p className="p-2 rounded">Your message was delivered!</p>
                <button
                  className="bg-blue-500 rounded-md w-1/2 mx-4 mt-8 py-2 text-gray-50 text-xs font-bold"
                  onClick={() => setIsMessageSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className={`form rounded-lg bg-white text-gray-600 dark:bg-slate-800/75 dark:text-white  p-4 flex flex-col`}
                onSubmit={handleOnSubmit}
              >
                <label htmlFor="name" className="text-sm mx-4">
                  Your Name
                </label>
                <input
                  type="text"
                  className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                  name="name"
                />
                <label htmlFor="email" className="text-sm mx-4 mt-4">
                  Email
                </label>
                <input
                  type="email"
                  className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                  name="email"
                />
                <label htmlFor="message" className="text-sm mx-4 mt-4">
                  Message
                </label>
                <textarea
                  rows="4"
                  type="text"
                  className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                  name="message"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 rounded-md w-1/2 mx-4 mt-8 py-2 text-gray-50 text-xs font-bold"
                >
                  Send Message
                </button>
              </form>
            )}
            <div className="md:ml-4">
              <header className="">
                <h1 className="font-semibold text-2xl">
                  Get in touch, let's talk.
                </h1>
                <p className="font-light text-base mt-2">
                  Fill in the details and I'll get back to you as soon as I can.
                </p>
              </header>
              <div className="icons-container inline-flex flex-col my-20">
                <div className="flex flex-row items-center space-x-6 rounded-md hover:border hover:border-blue-500 p-4">
                  <BsPhone />
                  <p className="font-light text-sm">{userData.phone}</p>
                </div>
                <div className="flex flex-row items-center space-x-6 rounded-md hover:border hover:border-blue-500 p-4">
                  <BsEnvelopeFill />
                  <p className="font-light text-sm">{userData.email}</p>
                </div>
                <div className="flex flex-row items-center space-x-6 rounded-md hover:border hover:border-blue-500 p-4">
                  <BsPinMapFill />
                  <p className="font-light text-sm">{userData.address}</p>
                </div>
              </div>
              <div className="bg-white social-icons flex flex-row justify-around dark:bg-slate-800 shadow-md rounded-full space-x-8">
                <a
                  href={userData.socialLinks.facebook}
                  className="h-10 w-10 rounded-full hover:bg-blue-400  flex items-center justify-center cursor-pointer"
                >
                  <FiFacebook />
                </a>
                <a
                  href={userData.socialLinks.twitter}
                  className="h-10 w-10 hover:bg-blue-400 rounded-full  flex items-center justify-center cursor-pointer"
                >
                  <FiTwitter />
                </a>
                <a
                  href={userData.socialLinks.instagram}
                  className="h-10 w-10 hover:bg-blue-400 rounded-full  flex items-center justify-center cursor-pointer"
                >
                  <FiInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
