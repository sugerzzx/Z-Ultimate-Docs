# SSE

SSE 是一种标准化的 Web 技术，用于从服务器向浏览器推送实时更新。与 WebSockets 不同，SSE 是单向的，即从服务器到客户端的单向数据流。

👉 [Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)

👉 [Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

👉 [How to Use Server-sent Events in Node.js](https://www.sitepoint.com/server-sent-events-node-js/)

👉 [Server-Sent Events don't work in Next API routes #48427](https://github.com/vercel/next.js/discussions/48427)

## 服务端实现

Next.js

```typescript
export async function POST(request: NextRequest) {
  const mockText =
    "Hello, I am a bot. How can I help you?Hello, I am a bot. How can I help you?Hello, I am a bot. How can I help you?Hello, I am a bot. How can I help you?Hello, I am a bot. How can I help you?";

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  (async function () {
    let content = "";
    for (let i = 0; i < mockText.length; i++) {
      await sleep(10);
      content += mockText[i];
      writer.write(encoder.encode(`event: message\ndata: ${JSON.stringify({ ...assistantMessage, content })}\n\n`));
    }
    writer.close();
  })();

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
```

## 客户端实现

[Using server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

```typescript
const eventSource = new EventSource("/api/sse");
eventSource.onmessage = event => {
  console.log(event.data);
};
```

由于 EventSource API [仅支持 GET 请求](https://stackoverflow.com/questions/34261928/can-server-sent-events-sse-with-eventsource-pass-parameter-by-post)，你可以选择使用其他库来实现 POST 请求的 SSE：

### 使用 fetch-event-source

[Fetch Event Source](https://github.com/Azure/fetch-event-source)

### 使用 sse.js

[sse.js is a flexible EventSource replacement for JavaScript designed to consume Server-Sent Events (SSE) streams with more control and options than the standard EventSource.](https://github.com/mpetazzoni/sse.js)
