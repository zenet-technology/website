interface Props {
  gridBlocks: Array<{
    title: string;
    content: JSX.Element;
  }>;
}

export default function BlockGrid({ gridBlocks }: Props) {
  return (
    <div class="flex flex-wrap justify-center my-8">
      {gridBlocks.map(({ title, content }, i) => (
        <div class="w-full sm:w-1/2 lg:w-1/3 p-4" key={title}>
          <div
            class={`h-full p-4 rounded ${
              (i + 1) % 3 === 1 ? 'bg-primary-300 dark:bg-primary-700' : ''
            }${
              (i + 1) % 3 === 2 ? 'bg-secondary-300 dark:bg-secondary-700' : ''
            }${
              (i + 1) % 3 === 0 ? 'bg-tertiary-300 dark:bg-tertiary-700' : ''
            }`}
          >
            <span class="block text-xl font-bold">{title}</span>
            <p class="m-0">{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
