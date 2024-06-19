import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className = "",
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={twMerge("border border-button h-full p-1", className)}
      {...props}
    >
      {children}
    </button>
  );
}
