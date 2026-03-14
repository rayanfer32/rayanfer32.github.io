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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-around overflow-hidden lg:p-20">
        {/* Text container */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          <RoughNotationGroup show={true}>
            {userData.traits.map(([trait, color], index) => (
              <RainbowHighlight key={trait} color={color}>
                <div className="p-2 text-2xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 my-2">
                  <HackedTextEffect text={trait} />
                </div>
              </RainbowHighlight>
            ))}
          </RoughNotationGroup>
        </div>
        <div className="relative inline-block">
          <img
            src={userData.avatarUrl}
            alt="avatar"
            className="lg:h-72 h-72 aspect-square object-cover rounded-full transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-95"
          />
          <AnimatePresence>
            {mounted && theme === "light" && (
              <motion.img
                src="/swag-shades.png"
                alt="swag shades"
                initial={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                exit={{ x: 100, y: -20, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="absolute w-32 top-[18%] left-[49%] rotate-[6deg] -translate-x-1/2 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

