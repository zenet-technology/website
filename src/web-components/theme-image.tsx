interface Props {
  src: string;
  alt: string;
  darkSrc?: string;
  class?: string;
}

export default function ThemeImage({
  src,
  alt,
  darkSrc,
  class: className,
}: Props) {
  if (darkSrc) {
    return (
      <>
        <img
          class={`dark:hidden ${className ?? ''}`.trim()}
          alt={alt}
          src={src}
        />
        <img
          class={`hidden dark:block ${className ?? ''}`.trim()}
          alt={alt}
          src={darkSrc}
        />
      </>
    );
  }

  return <img class={className ?? ''} alt={alt} src={src} />;
}
