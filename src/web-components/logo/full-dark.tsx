interface Props {
  class?: string;
}

export default function LogoFull({ class: className }: Props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 516 144"
      xmlns="http://www.w3.org/2000/svg"
      class={className ?? ''}
    >
      <title>Zenet Technology Pte. Ltd. - Logo full dark</title>
      <path
        d="M162.648 106V95.92l41.568-50.112 1.92 5.664h-42.72V38.8h56.544v10.08l-41.472 50.112-1.92-5.664H221.4V106h-58.752Zm85.03-40.128h32.352v12.096h-32.352V65.872Zm1.152 27.648h36.576V106h-52.032V38.8h50.784v12.48H248.83v42.24ZM299.781 106V38.8h12.864l39.648 48.384h-6.241V38.8h15.361V106h-12.768l-39.744-48.384h6.24V106h-15.36Zm93.835-40.128h32.352v12.096h-32.352V65.872Zm1.152 27.648h36.576V106h-52.032V38.8h50.784v12.48h-35.328v42.24Zm64.87 12.48V51.472h-21.504V38.8h58.56v12.672H475.19V106h-15.552Z"
        fill="#2B303A"
      />
      <g clipPath="url(#a)">
        <path
          d="M17 36v24l20.833 12L17 84v24l62.501 36v-24l-20.835-12L79.5 96V72L17 36Z"
          fill="#FA0"
        />
        <path
          d="M79.501 72v24l20.833-12v48l20.833-12V72L142 60V36L79.501 72Z"
          fill="#2470E7"
        />
        <path
          d="m17 36 62.501 36 20.833-12-20.833-12h41.666L142 36 79.501 0 58.666 12 79.5 24H37.833L17 36Z"
          fill="#00C5A7"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M17 0h125v144H17z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
