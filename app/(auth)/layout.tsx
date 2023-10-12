import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-full flex justify-center items-center">{children}</div>
  );
};

export default AuthLayout;
