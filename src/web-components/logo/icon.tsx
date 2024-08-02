interface Props {
  class?: string;
}

export default function LogoIcon({ class: className }: Props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 124 144"
      xmlns="http://www.w3.org/2000/svg"
      class={className ?? ''}
    >
      <title>Zenet Technology Pte. Ltd. - Logo icon</title>
      <g clipPath="url(#a)">
        <g clipPath="url(#b)">
          <path
            d="M0 36v24l20.666 12L0 84v24l62.002 36v-24l-20.67-12 20.67-12V72L0 36Z"
            fill="#FA0"
          />
          <path
            d="M62.002 72v24l20.666-12v48l20.666-12V72L124 60V36L62.002 72Z"
            fill="#2470E7"
          />
          <path
            d="m0 36 62.002 36 20.666-12L62 48h41.333L124 36 62.002 0l-20.67 12 20.67 12H20.666L0 36Z"
            fill="#00C5A7"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h124v144H0z" fill="#fff" />
        </clipPath>
        <clipPath id="b">
          <path d="M0 0h124v144H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
