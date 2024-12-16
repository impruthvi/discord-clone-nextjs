import { Server as HTTPServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponseServerIo } from "@/types";

// Disable body parsing for this API route
export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("* Initializing Socket.IO");

    // Cast Next.js server as an HTTP server
    const httpServer: HTTPServer = res.socket.server as any;

    // Configure the Socket.IO server
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket/io", // Match the API route
      cors: {
        origin: "*", // Adjust for security as needed
        methods: ["GET", "POST"],
      },
    });

    // Attach the Socket.IO server to the response object
    res.socket.server.io = io;

    // Handle socket connections
    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      // Example event handling
      socket.on("message", (data) => {
        console.log("Message received:", data);
        socket.emit("reply", `Server received: ${data}`);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });
  } else {
    console.log("Socket.IO server already initialized.");
  }

  // End the HTTP response while keeping the WebSocket server alive
  res.end();
};

export default ioHandler;
