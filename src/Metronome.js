import React, { useState, useRef, useLayoutEffect } from "react";
import "./Metronome.css";
import click1 from "./click1.wav";
import click2 from "./click2.wav";

function Metronome() {
  const clickOne = new Audio(click1);
  const clickTwo = new Audio(click2);
  const [bpm, setBpm] = useState(100);
  const [playing, setPlaying] = useState(false);
  const [bpmeasureString, setBpmeasureString] = useState('2');
  const ref = useRef({ timer: null, count: 0 });

  useLayoutEffect(refreshInterval, [playClick, bpm, bpmeasureString, playing]);

  console.log('rendering')

  function handlePlayButtonClick() {
    if (!playing) {
      const interval = (60 / bpm) * 1000;
      ref.current.timer = setInterval(playClick, interval);
    }
    if (playing) {
      clearInterval(ref.current.timer);
    }
    setPlaying((prevState) => !prevState);
  }

  function handleBpmSliderChange(e) {
    setBpm(e.target.value);
    if (playing) {
      refreshInterval();
    }
  }

  function handleBPMeasureSelectChange(e) {
    setBpmeasureString(e.target.value);
  }

  function refreshInterval() {
    if (playing) {
      clearInterval(ref.current.timer);
      ref.current.count = 0;
      const interval = (60 / bpm) * 1000;
      ref.current.timer = setInterval(playClick, interval);
    }
  }

  function playClick() {
    const bpmeasure = Number.parseInt(bpmeasureString);
    if (ref.current.count % bpmeasure) {
      clickOne.play();
      ref.current.count++;
      console.log(bpmeasure, ref.current.count);
    } else {
      clickTwo.play();
      ref.current.count++;
      console.log(bpmeasure, ref.current.count);
    }
  }

  return (
    <div className="metronome">
      <div className="bpm-slider">
        <div>{bpm} BPM</div>
        <input
          type="range"
          min="60"
          max="200"
          value={bpm}
          onChange={handleBpmSliderChange}
        />
      </div>
      <div className="beatsPerMeasure">
        <label htmlFor="bpmeasure">Beats Per Measure:</label>

        <select name="bpmeasure" id="bpmeasure" onChange={handleBPMeasureSelectChange} defaultValue={bpmeasureString}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <button onClick={handlePlayButtonClick}>
        {playing ? "Stop" : "Start"}
      </button>
      {/* <div>bpmeasure: {bpmeasureString}</div> */}
    </div>
  );
}

export default Metronome;
