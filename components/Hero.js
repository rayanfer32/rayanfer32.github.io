import React from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { RainbowHighlight } from "./RainbowHighlight";
import userData from "@constants/data";
import HackedTextEffect from "./molecules/HackedTextEffect";

export default function Hero() {
  return (
    <div className="flex flex-row justify-around overflow-hidden lg:p-20">
      {/* Text container */}
      <div className="grid grid-cols-2 gap-4">
        <RoughNotationGroup show={true}>
          {userData.traits.map(([trait, color], index) => (
            <RainbowHighlight key={trait} color={color}>
              <h1 className="p-2 text-2xl md:text-8xl font-bold text-gray-700 dark:text-gray-200 my-2">
                <HackedTextEffect text={trait} />
              </h1>
            </RainbowHighlight>
          ))}
        </RoughNotationGroup>
      </div>
      <img src={userData.avatarUrl} alt="avatar" className="lg:h-60 h-32" />
    </div>
  );
}
