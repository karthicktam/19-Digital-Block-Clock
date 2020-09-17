import React, { useEffect, useState } from "react";
import "./styles.css";

let piecesObj = {
  hours: {
    num1: new Array(13).fill({ active: false, class: "piece" }),
    num2: new Array(13).fill({ active: false, class: "piece" })
  },
  minutes: {
    num1: new Array(13).fill({ active: false, class: "piece" }),
    num2: new Array(13).fill({ active: false, class: "piece" })
  },
  seconds: {
    num1: new Array(13).fill({ active: false, class: "piece" }),
    num2: new Array(13).fill({ active: false, class: "piece" })
  }
};

const numberStates = [
  [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13],
  [3, 5, 8, 10, 13],
  [1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13],
  [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13],
  [1, 3, 4, 5, 6, 7, 8, 10, 13],
  [1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13],
  [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13],
  [1, 2, 3, 5, 8, 10, 13],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13]
];

export default function App() {
  const [pieces, setPieces] = useState(piecesObj);

  // timePart hours, minutes or seconds
  const displayNumber = (identifier, insideKey, number) => {
    let copiedObj = { ...piecesObj };
    copiedObj[identifier][insideKey] = copiedObj[identifier][insideKey].map(
      (element, idx) => {
        if (numberStates[+number].includes(idx + 1)) {
          return { ...element, active: true };
        }
        return element;
      }
    );

    piecesObj = copiedObj;
    setPieces(copiedObj);
  };

  const getTime = () => {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    hours = (hours < 10 ? `0${hours}` : hours).toString().split("");
    minutes = (minutes < 10 ? `0${minutes}` : minutes).toString().split("");
    seconds = (seconds < 10 ? `0${seconds}` : seconds).toString().split("");

    piecesObj = {
      hours: {
        num1: new Array(13).fill({ active: false, class: "piece" }),
        num2: new Array(13).fill({ active: false, class: "piece" })
      },
      minutes: {
        num1: new Array(13).fill({ active: false, class: "piece" }),
        num2: new Array(13).fill({ active: false, class: "piece" })
      },
      seconds: {
        num1: new Array(13).fill({ active: false, class: "piece" }),
        num2: new Array(13).fill({ active: false, class: "piece" })
      }
    };

    setPieces(piecesObj);

    // set hour
    displayNumber("hours", "num1", +hours[0]);
    displayNumber("hours", "num2", +hours[1]);

    // set minute
    displayNumber("minutes", "num1", +minutes[0]);
    displayNumber("minutes", "num2", +minutes[1]);

    // set seconds
    displayNumber("seconds", "num1", +seconds[0]);
    displayNumber("seconds", "num2", +seconds[1]);
  };

  useEffect(() => {
    let interval = setInterval(getTime, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="container">
      {Object.keys(pieces).map((keys) => (
        <div className="flex" key={keys}>
          {Object.keys(pieces[keys]).map((key) => (
            <div className="number" key={key}>
              {pieces[keys][key].map((k, idx) => (
                <div
                  className={k.active === true ? "piece show" : "piece"}
                  key={idx}
                ></div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
