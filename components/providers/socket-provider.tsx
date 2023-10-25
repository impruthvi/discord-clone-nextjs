"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      // @ts-ignore
      addTrailingSlash: false,
    });
    setSocket(socket);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
