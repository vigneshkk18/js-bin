interface Add extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export default function Add({ color = "#000000", ...props }: Readonly<Add>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g id="Edit / Add_Plus">
        <path
          id="Vector"
          d="M6 12H12M12 12H18M12 12V18M12 12V6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
