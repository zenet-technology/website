interface FeatureProps {
  features: Array<{
    name: string;
    description: string;
    icon: JSX.Element;
  }>;
  title: string;
  subtitle?: string;
  description?: string;
}

export default function Feature({
  title,
  subtitle,
  description,
  features,
}: FeatureProps) {
  return (
    <div class="mx-6 my-24">
      <div class="sm:text-center">
        <h2 class="text-xl font-semibold leading-8 text-primary-700 dark:text-primary-500">
          {title}
        </h2>
        {subtitle && (
          <p class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {subtitle}
          </p>
        )}
        {description && (
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      <div class="mt-20 max-w-lg sm:mx-auto md:max-w-none">
        <div class="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              class="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
            >
              <div class="flex h-12 w-12 items-center justify-center rounded bg-primary-500 text-white sm:shrink-0">
                {feature.icon}
              </div>
              <div class="sm:min-w-0 sm:flex-1">
                <p class="text-lg font-semibold leading-8 text-gray-700 dark:text-white">
                  {feature.name}
                </p>
                <p class="mt-2 text-base leading-7 text-gray-600 dark:text-gray-100">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
