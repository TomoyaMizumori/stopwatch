import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Timer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      alert('初めにログインをしてください！');
      navigate("/")
    }
  })


  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lapList, setLapList] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((nowTime) => nowTime + 10);
    }, 10);
  };

  const lapTimer = () => {
    setLapList((prev) => [...prev, time]);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setLapList([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const transformTime = (tmpTime: number): string => {
    let ms = Math.floor(tmpTime / 10) % 100;
    let sec = Math.floor(tmpTime / 1000) % 60;
    let min = Math.floor(tmpTime / 60000) % 60;
    let hour = Math.floor(tmpTime / 3600000);

    const addZero = (unit: number): string => {
      return unit < 10 ? "0" + unit : unit.toString();
    };

    return `${addZero(hour)}:${addZero(min)}:${addZero(sec)}:${addZero(ms)}`;
  };

  return (
    <div className="App">
      <header>
        <h1>ストップウォッチ</h1>
      </header>
      <main>
        <div className="TimeContainer">
          <p>{transformTime(time)}</p>
        </div>
        <div className="ButtuonContainer">
          <input
            id="start-button"
            type="button"
            value="start"
            onClick={startTimer}
            disabled={isRunning}
          />
          <input
            id="lap-button"
            type="button"
            value="Lap"
            onClick={lapTimer}
            disabled={!isRunning}
          />
          <input
            id="stop-button"
            type="button"
            value="stop"
            onClick={stopTimer}
            disabled={!isRunning}
          />
          <input
            id="reset-button"
            type="button"
            value="reset"
            onClick={resetTimer}
          />
        </div>
        <div className="lapContainer">
          {lapList.map((oneLap, index) => (
            <div className="OneLapBox" key={index}>
              Lap {index + 1}: {transformTime(oneLap)}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Timer;
