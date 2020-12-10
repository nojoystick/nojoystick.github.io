import { useState, useEffect } from 'react';

/**
 * Simulates a typewriter effect by adding a new letter every n ms.
 * With random fluctuations between 80 - 100% of the maximum.
 *
 * @param {*} text - the text to type
 * @param {*} speed - the max speed for a letter in ms
 */

const useTypewriter = (text, speed) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (text) {
      let prev = 0;
      [...text].forEach((char, index) => {
        let rFactor = Math.floor(Math.random() * 0.2) + 0.8;
        let next = prev + speed * index * rFactor;
        setTimeout(() => {
          setName((prev) => prev + char);
        }, next);
        prev = next;
      });
    }
  }, [text, speed]);

  return name;
};

export default useTypewriter;
