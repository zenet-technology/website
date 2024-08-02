interface Props {
  class?: string;
}

export default function IconPolygon({ class: className }: Props) {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 2560 100"
      xmlns="http://www.w3.org/2000/svg"
      class={className ?? ''}
    >
      <title>Icon Polygon</title>
      <path d="M2560 0v100H0z" fill="fill-current" />
    </svg>
  );
}
