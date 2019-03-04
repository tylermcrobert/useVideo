import { useRef, useEffect } from "react";
import useInterval from "use-interval";
import { useSetState } from "react-use";

let globalData;

const round = (num, place = 100) => Math.round(num * place) / place;

function addListeners() {
  const { video, updateState } = globalData;
  const update = () => setFromVideo(globalData);
  const setReady = () => updateState({ ready: true });

  video.addEventListener("loadeddata", setReady);
  video.addEventListener("play", update);
  video.addEventListener("pause", update);
  video.addEventListener("volumechange", update);
  video.addEventListener("seeking", update);
}

function getFunctions(video) {
  const pause = () => video.pause();
  const play = () => video.play();
  const mute = () => (video.muted = true);
  const unmute = () => (video.muted = false);
  const seek = e => {
    e.persist();
    video.currentTime = e.target.value;
  };

  return {
    play,
    pause,
    mute,
    unmute,
    seek
  };
}

function setFromVideo() {
  const { video, state, updateState } = globalData;
  const percent =
    video.duration > 0 ? (video.currentTime / video.duration) * 100 : 0;

  if (state.ready) {
    updateState({
      duration: video.duration,
      time: round(video.currentTime),
      percent: round(percent),
      muted: video.muted,
      isPlaying: !video.paused
    });
  }
}

export default function useVideo(input) {
  const ref = useRef();
  const [state, setState] = useSetState({
    isPlaying: false, // null?
    muted: false, // null?
    duration: 0,
    time: 0,
    videoReady: false,
    percent: 0
  });
  const updateState = newState =>
    setState(prevState => ({ ...prevState, ...newState }));

  useEffect(
    () => {
      globalData = { video: ref.current, state, updateState };
      setFromVideo();
      addListeners();

      return () => {
        console.log("unmounted");
      };
    },
    [state.ready, state.isPlaying]
  );

  useInterval(() => setFromVideo(), state.isPlaying ? 500 : null);

  return {
    ref,
    state,
    functions: getFunctions(ref.current)
  };
}
