import React, { useEffect, useRef } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz;ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const textEffectOnMouseOver = (refEl, interval) => {
  let iteration = 0;

  clearInterval(interval);

  let ref = refEl.current;

  interval = setInterval(() => {
    ref.innerText = ref.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return ref.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= ref.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 2;
  }, 30);
};

function HackedTextEffect({ text }) {
  let interval = null;
  const textRef = useRef();

  function handleMouseOver() {
    return textEffectOnMouseOver(textRef, interval);
  }

  useEffect(() => {
    textRef.current.onmouseover = handleMouseOver;
    setTimeout(handleMouseOver, 1000);
  }, []);

  return (
    <h1 ref={textRef} data-value={text} style={{width: text.length * 38}}>
      {text}
    </h1>
  );
}

export default HackedTextEffect;
