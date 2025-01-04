import React, { useEffect } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";
import HackedTextEffect from "./containers/HackedTextEffect";
import Rythm from "rythm.js";

export default function Hero() {
  let rythm;

  useEffect(() => {
    rythm = new Rythm();
    rythm.setMusic("/EPO_Assasin.mp3");
    rythm.setGain(0.2);
    rythm.addRythm('rythm-high', 'shake', 500, 100, { direction:'left', min: 20, max: 300 })
    return () => {
      rythm = null;
    };
  }, []);

  return (
    <>
      <button
        className="hidden flex justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => rythm.start()}
      >
        Make it Dance!
      </button>
      <div className="flex flex-row justify-around overflow-hidden lg:p-20">
        {/* Text container */}
        <div className="grid grid-cols-2 gap-4">
          <RoughNotationGroup show={true}>
            {userData.traits.map(([trait, color], index) => (
              <RainbowHighlight key={trait} color={color}>
                <h1 className="rythm-medium p-2 text-2xl md:text-7xl font-bold text-gray-700 dark:text-gray-200 my-2">
                  <HackedTextEffect text={trait} />
                </h1>
              </RainbowHighlight>
            ))}
          </RoughNotationGroup>
        </div>
        <img
          src={userData.avatarUrl}
          alt="avatar"
          className="rythm-medium lg:h-60 h-32 rounded-full transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        />
      </div>
    </>
  );
}
