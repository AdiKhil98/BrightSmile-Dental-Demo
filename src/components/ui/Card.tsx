import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-soft ring-1 ring-navy-100 transition-all ${className}`}
    >
      {children}
    </div>
  );
}
