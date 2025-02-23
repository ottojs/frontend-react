const delay_max: number = 10 * 1000;
let connected = false;

function initiate_websocket(delay: number) {
  if (connected) {
    console.log("[WS] ALREADY CONNECTED. IGNORING");
    return () => {};
  }
  console.log("[WS] CONNECTING...", delay);
  delay = delay * 2;
  if (delay > delay_max) {
    delay = delay_max;
  }

  // Replace "http" with "ws" and "https" with "wss"
  const ws = new WebSocket(
    import.meta.env.VITE_API_URL.replace("http", "ws") + "/ws",
  );
  ws.onopen = (x) => {
    connected = true;
    console.log("[WS] OPEN", x);
    delay = 1000;
  };
  ws.onmessage = (m) => console.log("[WS] MESSAGE:", m);
  ws.onclose = (n) => {
    connected = false;
    console.log("[WS] CLOSED:", n);
    setTimeout(() => initiate_websocket(delay), delay);
  };
  ws.onerror = (e) => {
    console.log("[WS] ERROR:", e);
    ws.close();
  };

  // Return cleanup function
  return () => {
    if (ws.OPEN) {
      console.log("[WS] DISCONNECTING...");
      ws.close();
    }
  };
}

export default initiate_websocket;
