interface AngleRight extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export default function AngleRight({
  color = "#000000",
  ...props
}: Readonly<AngleRight>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.96967 16.2803C9.67678 15.9874 9.67678 15.5126 9.96967 15.2197L13.1893 12L9.96967 8.78033C9.67678 8.48744 9.67678 8.01256 9.96967 7.71967C10.2626 7.42678 10.7374 7.42678 11.0303 7.71967L14.7803 11.4697C15.0732 11.7626 15.0732 12.2374 14.7803 12.5303L11.0303 16.2803C10.7374 16.5732 10.2626 16.5732 9.96967 16.2803Z"
        fill={color}
      />
    </svg>
  );
}
