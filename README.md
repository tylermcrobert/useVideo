# useVideo

> useVideo hook

[![NPM](https://img.shields.io/npm/v/tylermcrobert.usevideo.svg)](https://www.npmjs.com/package/tylermcrobert.usevideo) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save tylermcrobert.usevideo
```

## Usage

```jsx
import React from "react";
import useVideo from "tylermcrobert.usevideo";

function Video() {
  const { ref, state, functions } = useVideo();
  return (
    <video ref={ref}>
      <source src="video.mp4" type="video/mp4" />
    </video>
  );
}
```

## License

MIT © [tylermcrobert](https://github.com/tylermcrobert)
