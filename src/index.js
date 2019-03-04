import React from 'react'
import ReactDOM from 'react-dom'
import useVideo from './lib'
import './index.css'

function App() {
  const { ref, state, functions } = useVideo()
  const togglePlay = () =>
    state.isPlaying ? functions.pause() : functions.play()

  return (
    <div className="App">
      <video ref={ref} onClick={togglePlay} playsInline muted loop>
        <source
          src="https://app.coverr.co/s3/mp4/4X4-in-Vinyard.mp4"
          type="video/mp4"
        />
      </video>
      {state.ready && (
        <>
          <p>ready: {state.ready.toString()}</p>
          <p>playing: {state.isPlaying.toString()}</p>
          <p>duration: {state.duration}s</p>
          <p>muted: {state.muted.toString()}</p>
          <p>time: {state.time}s</p>
          <p>percent: {state.percent}%</p>
          {state.isPlaying ? (
            <button onClick={functions.pause}>Pause</button>
          ) : (
            <button onClick={functions.play}>play</button>
          )}
          {state.muted ? (
            <button onClick={functions.unmute}>Unmute</button>
          ) : (
            <button onClick={functions.mute}>Mute</button>
          )}
          <button onClick={functions.fullscreen}>Full Screen</button>
          <input
            type="range"
            min="0"
            max={state.duration}
            value={state.time}
            onChange={functions.seek}
          />
        </>
      )}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
