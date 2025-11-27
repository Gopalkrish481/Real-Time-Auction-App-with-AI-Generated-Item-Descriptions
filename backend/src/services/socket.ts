import { Server } from "socket.io";

export function setupSocket(server: any) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("placeBid", (data) => {
      io.emit("bidUpdated", data);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
  });

  return io;
}
