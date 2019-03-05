"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVideo;

var _react = require("react");

var _useInterval = _interopRequireDefault(require("use-interval"));

var _reactUse = require("react-use");

var _screenfull = _interopRequireDefault(require("screenfull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var globalData;

var round = function round(num) {
  var place = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return Math.round(num * place) / place;
};

function addListeners() {
  var _globalData = globalData,
      video = _globalData.video,
      updateState = _globalData.updateState;

  var update = function update() {
    return setFromVideo(globalData);
  };

  var setReady = function setReady() {
    return updateState({
      ready: true
    });
  };

  video.addEventListener('loadeddata', setReady);
  video.addEventListener('play', update);
  video.addEventListener('pause', update);
  video.addEventListener('volumechange', update);
  video.addEventListener('seeking', update);
}

function getFunctions(video) {
  var _onload = function _onload(cb) {
    return video ? cb : null;
  };

  var pause = function pause() {
    return video.pause();
  };

  var play = function play() {
    return video.play();
  };

  var mute = function mute() {
    return video.muted = true;
  };

  var unmute = function unmute() {
    return video.muted = false;
  };

  var seek = function seek(e) {
    e.persist();
    video.currentTime = e.target.value;
  };

  var fullscreen = function fullscreen() {
    _screenfull.default.request(video);
  };

  return {
    play: play,
    pause: pause,
    mute: mute,
    unmute: unmute,
    seek: seek,
    fullscreen: _onload(fullscreen)
  };
}

function setFromVideo() {
  var _globalData2 = globalData,
      video = _globalData2.video,
      state = _globalData2.state,
      updateState = _globalData2.updateState;
  var percent = video.duration > 0 ? video.currentTime / video.duration * 100 : 0;

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

function useVideo(input) {
  var ref = (0, _react.useRef)();

  var _useSetState = (0, _reactUse.useSetState)({
    isPlaying: false,
    // null?
    muted: false,
    // null?
    duration: 0,
    time: 0,
    percent: 0
  }),
      _useSetState2 = _slicedToArray(_useSetState, 2),
      state = _useSetState2[0],
      setState = _useSetState2[1];

  var updateState = function updateState(newState) {
    return setState(function (prevState) {
      return _objectSpread({}, prevState, newState);
    });
  };

  (0, _react.useEffect)(function () {
    globalData = {
      video: ref.current,
      state: state,
      updateState: updateState
    };
    setFromVideo();
    addListeners();
    return function () {
      console.log('unmounted');
    };
  }, [state.ready, state.isPlaying]);
  (0, _useInterval.default)(function () {
    return setFromVideo();
  }, state.isPlaying ? 500 : null);
  return {
    ref: ref,
    state: state,
    functions: getFunctions(ref.current)
  };
}

//# sourceMappingURL=useVideo.js.map