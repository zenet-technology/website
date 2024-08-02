interface Props {
  class?: string;
}

export default function IconBrisa({ class: className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 199"
      class={className ?? ''}
    >
      <title>Brisa logo</title>
      <path
        d="M124.615 158.942c69.711-24.68 66.301-116.049 16.152-158.079 43.551 19.486 65.989 72.089 57.436 118.042-6.691 35.949-33.645 65.617-68.513 75.619-18.35 5.264-37.995 6.295-56.605 1.677-36.649-9.093-65.432-40.247-71.782-77.423-5.086-29.78 4.772-60.435 28.619-79.782 24.886-20.19 62.185-24.94 89.402-6.479 26.818 18.191 36.452 56.935 15.907 83.594-10.483 13.603-27.818 21.522-45.04 18.901-18.007-2.74-32.021-18.974-29.585-37.518 3.049 24.069 31.528 33.18 48.637 16.389 15.781-15.489 7.269-39.546-8.726-51.28-13.333-9.782-32.128-7.335-45.257 1.617-16.2 11.046-22.521 30.497-18.971 49.354 7.774 41.292 51.337 58.463 88.326 45.368Z"
        fill="url(#a)"
        transform="translate(0 -.863)"
      />
      <defs>
        <radialGradient
          id="a"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(52.186 -99.1373 99.1373 52.186 88.82 100)"
        >
          <stop offset="0" stop-color="#2cf0cc" />
          <stop offset=".53" stop-color="#2ce6d1" />
          <stop offset="1" stop-color="#2cc3e4" />
        </radialGradient>
      </defs>
    </svg>
  );
}
