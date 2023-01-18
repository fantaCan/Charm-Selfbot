import WebSocket from "ws";
const ws = new WebSocket("wss://us-west2507.discord.media/?v=7");

ws.on('open', function open() {
    ws.send(JSON.stringify({
        "server_id": "1063279350084030465",
        "user_id": "985730040736137237",
        "session_id": "8250eeae0ecfce9f64cf334a38e528f5",
        "token": "e4f8963b2621490a",
        "video": true,
        "streams": [
          {
            "type": "video",
            "rid": "100",
            "quality": 100
          },
          {
            "type": "video",
            "rid": "50",
            "quality": 50
          }
        ]
      
    }))
  });
  
  ws.on('message', function incoming(data) {
    const d = JSON.parse(data);
    console.log(d)
  });