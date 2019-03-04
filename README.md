# usevideo

> useVideo hook

[![NPM](https://img.shields.io/npm/v/usevideo.svg)](https://www.npmjs.com/package/usevideo) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
    <video ref={ref} muted autoPlay loop style={{ width: "100%" }}>
      <source
        src="https://app.coverr.co/s3/mp4/4X4-in-Vinyard.mp4"
        type="video/mp4"
      />
    </video>
  );
}
```

## License

MIT © [tylermcrobert](https://github.com/tylermcrobert)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
