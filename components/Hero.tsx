import React, { useEffect, useState } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";
import HackedTextEffect from "./containers/HackedTextEffect";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNotation, setShowNotation] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Delay notation until entrance animations settle
    const timeout = setTimeout(() => {
      setShowNotation(true);
      setInitialLoad(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-around overflow-hidden lg:p-20 px-4 py-20 gap-10 w-full">
      {/* Text container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-sm:hidden">
        <RoughNotationGroup show={showNotation}>
          {userData.traits.map((traitData, index) => {
            const [trait, color] = traitData;
            return (
              <motion.div
                key={trait}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + (initialLoad ? 1.6 : 0) }}
              >
                <RainbowHighlight color={color}>
                  <div className="p-3 text-3xl md:text-5xl lg:text-5xl font-bold text-gray-700 dark:text-gray-200 my-2">
                    <HackedTextEffect text={trait} />
                  </div>
                </RainbowHighlight>
              </motion.div>
            )
          })}
        </RoughNotationGroup>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1.2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative inline-block self-center"
      >
        <img
          src={userData.avatarUrl}
          alt="avatar"
          className="lg:h-72 lg:w-72 h-52 w-52 aspect-square object-cover rounded-full shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95"
        />
        <AnimatePresence>
          {mounted && theme === "light" && (
            <motion.img
              src="/swag-shades.png"
              alt="swag shades"
              initial={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                delay: initialLoad ? 2.0 : 0
              }}
              className="absolute w-24 md:w-32 top-[18%] left-[49%] rotate-[6deg] -translate-x-1/2 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

