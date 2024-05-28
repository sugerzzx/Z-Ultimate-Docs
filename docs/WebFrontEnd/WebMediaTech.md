# Web 媒体技术

[Web media technologies](https://developer.mozilla.org/en-US/docs/Web/Media)

# 音频和视频传输

[Audio and Video Delivery](https://developer.mozilla.org/en-US/docs/Web/Media/Audio_and_video_delivery)

## 实时传输 Web 音频与视频

[Livestreaming web audio and video](https://developer.mozilla.org/en-US/docs/Web/Media/Audio_and_video_delivery/Live_streaming_web_audio_and_video)

### 流媒体协议

1. HTTP

2. RTMP

3. RTSP

### 视频流文件格式

1. MPEG-DASH

2. HLS

# 媒体类型和格式指南：图片、音频和视频

[Media type and format guide: image, audio, and video content](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)

# WebRTC

[WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)

# Media Source Extensions (MSE)

[MSE_w3c](https://w3c.github.io/media-source/)

[MediaSource Interface](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource)

[Media Source API](https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API)

# Stream Api

[The Streams API allows JavaScript to programmatically access streams of data received over the network and process them as desired by the developer.](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)

# ServerSide

## FFmpeg

[A complete, cross-platform solution to record, convert and stream audio and video.](https://www.ffmpeg.org/)

## SRS

[SRS is a simple, high efficiency and realtime video server, supports RTMP, WebRTC, HLS, HTTP-FLV, SRT, MPEG-DASH and GB28181. Oryx is an all-in-one, out-of-the-box, and open-source video solution for creating online video services, including live streaming and WebRTC, on the cloud or through self-hosting.](https://ossrs.io/lts/en-us/)

# ClientSide

## flv.js

FLV（Flash Video）：FLV 是一种流行的视频文件格式，最初由 Adobe 公司为 Flash Player 开发。FLV 格式通常用于在 Web 上播放视频，它可以包含音频、视频以及文本数据。虽然随着 HTML5 的发展，Flash 已逐渐被淘汰，但 FLV 格式仍然在一些传统的视频平台和系统中使用。
然而，借助 flv.js，我们可以在不依赖 Flash 的情况下，直接在浏览器中播放 FLV 格式的视频。

[An HTML5 Flash Video (FLV) Player written in pure JavaScript without Flash.](https://github.com/bilibili/flv.js)

## hls.js

HLS（HTTP Live Streaming）：HLS 是一种流媒体传输协议，由苹果公司开发。它通过将视频文件分割成短小的多个.ts（MPEG-TS）格式的片段，并使用 HTTP 协议传输这些片段，实现了高效的视频流传输。HLS 通常用于在 Web 和移动应用上播放实时直播和点播视频。

[HLS.js is a JavaScript library that implements an HTTP Live Streaming client. It relies on HTML5 video and MediaSource Extensions for playback.](https://github.com/video-dev/hls.js)

## dash.js

[A reference client implementation for the playback of MPEG DASH via JavaScript and compliant browsers](https://github.com/Dash-Industry-Forum/dash.js/)

## video.js

[Video.js is a web video player built from the ground up for an HTML5 world. It supports HTML5 video and Media Source Extensions, as well as other playback techs like YouTube and Vimeo (through plugins). It supports video playback on desktops and mobile devices. This project was started mid 2010, and the player is now used on over 700,000 websites.
](https://github.com/videojs/video.js)
