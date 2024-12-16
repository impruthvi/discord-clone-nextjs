import { Server as NextServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");
    const path = "/api/socket/io";

    const httpServer: NextServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export default ioHandler;