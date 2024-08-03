import { type RequestContext, dangerHTML } from 'brisa';

export default function Home(_: undefined, { i18n }: RequestContext) {
  const features = [
    {
      name: i18n.t('LANDING.CONSULTING'),
      description: i18n.t('LANDING.CONSULTING_DESCRIPTION'),
      icon: <icon-consulting class="w-8" />,
    },
    {
      name: i18n.t('LANDING.ENGINEERING'),
      description: i18n.t('LANDING.ENGINEERING_DESCRIPTION'),
      icon: <icon-engineering class="w-8" />,
    },
  ];

  const projects = [
    {
      title: i18n.t('LANDING.PROJECT_TITLE_1'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_1'),
      list: [],
    },
    {
      title: i18n.t('LANDING.PROJECT_TITLE_2'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_2'),
      list: [],
    },
    {
      title: i18n.t('LANDING.PROJECT_TITLE_3'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_3'),
      list: [],
    },
    {
      title: i18n.t('LANDING.PROJECT_TITLE_4'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_4'),
      list: [],
    },
    {
      title: i18n.t('LANDING.PROJECT_TITLE_5'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_5'),
      list: [],
    },
    {
      title: i18n.t('LANDING.PROJECT_TITLE_6'),
      description: i18n.t('LANDING.PROJECT_DESCRIPTION_6'),
      list: [],
    },
  ].map((project) => {
    const list = project.description
      .split(/'(?<temp1>.*?)',?\s?/)
      .filter(Boolean);

    return {
      title: project.title,
      description: project.description,
      list,
    };
  });

  return (
    <>
      {/* Hero */}
      <section class="container mx-auto max-w-7xl py-4 px-8 md:px-16">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="md:flex-1">
            <hgroup>
              <h1 class="leading-tight font-semibold text-xl sm:text-2xl lg:text-3xl">
                <span class="relative after:content-[''] after:w-full after:h-1/10 after:absolute after:bottom-1 after:left-0 after:bg-primary-300 after:-z-10">
                  {i18n.t('LANDING.TITLE')}
                </span>
              </h1>
              <p class="font-semibold mb-8 text-primary-700 dark:text-primary-500 text-l sm:text-xl lg:text-2xl">
                {i18n.t('LANDING.SUBTITLE')}
              </p>
            </hgroup>
            <p class="mb-8 text-gray-700 dark:text-gray-300">
              {dangerHTML(i18n.t('LANDING.DESCRIPTION'))}
            </p>
            <a href="#contact">
              <button type="button" class="w-56 primary">
                {i18n.t('CONTACT_US')}
              </button>
            </a>
          </div>
          <div class="md:flex-1 flex justify-center">
            <div class="relative self-center rounded shadow overflow-hidden">
              <img
                class="object-cover"
                src="/images/landing-image.jpg"
                alt="Zenet Technology"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What do we do? */}
      <div class="w-full h-0" id="what_do_we_do" />
      <icon-polygon class="-mb-[1px] mt-8 fill-secondary-300 dark:fill-secondary-700" />
      <section class="py-16 px-8 md:px-16 bg-secondary-300 dark:bg-secondary-700">
        <div class="container mx-auto max-w-7xl">
          <h2 class="mb-16 text-center">{i18n.t('WHAT_DO_WE_DO')}</h2>

          <div class="max-w-lg mx-auto md:max-w-none">
            <div class="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12">
              {features.map((feature) => (
                <div
                  class="flex flex-col gap-6 md:flex-col lg:flex-row text-center md:text-left items-center md:items-start"
                  key={feature.name}
                >
                  <div class="flex h-12 w-12 items-center justify-center rounded bg-primary-500 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3>{feature.name}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div class="w-full h-0" id="our_contributions" />
      <section class="py-16 px-8 md:px-16 bg-primary-300 dark:bg-primary-700">
        <div class="container mx-auto max-w-7xl">
          <h2 class="mb-16 text-center">{i18n.t('OUR_CONTRIBUTIONS')}</h2>

          <div class="hidden md:flex md:flex-row gap-4 justify-around items-center max-w-lg sm:mx-auto md:max-w-none">
            <icon-setoros class="w-16" />
            <icon-splyt class="w-20" />
            <icon-brisa class="w-16" />
            <icon-viatsy class="w-28" />
            <icon-solid-start class="w-12" />
          </div>

          <div class="flex flex-col md:hidden md:flex-row gap-4 justify-around items-center max-w-lg sm:mx-auto md:max-w-none">
            <icon-viatsy class="w-28" />
            <icon-brisa class="w-12" />
            <icon-splyt class="w-16" />
            <icon-setoros class="w-16" />
            <icon-solid-start class="w-8" />
          </div>
        </div>
      </section>

      {/* What have we done? */}
      <div class="w-full h-0" id="what_have_we_done" />
      <section class="py-16 px-8 md:px-16 bg-tertiary-300 dark:bg-tertiary-700">
        <div class="container mx-auto max-w-7xl">
          <h2 class="mb-16 text-center">{i18n.t('WHAT_HAVE_WE_DONE')}</h2>

          <div class="max-w-lg sm:mx-auto md:max-w-none">
            <div class="flex flex-wrap gap-8">
              {projects.map((project) => (
                <div
                  class="flex-[1_1_50%] md:flex-[1_1_40%] xl:flex-[1_1_30%] bg-white dark:bg-black p-6 shadow rounded"
                  key={project.title}
                >
                  <h3>{project.title}</h3>
                  <ul>
                    {project.list.map((item) => (
                      <li
                        class="leading-8 text-sm text-gray-700 dark:text-gray-300"
                        key={item}
                      >
                        {/* <CheckCheck class="inline-block mr-4 text-primary-500" />{' '} */}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <icon-polygon class="-mt-[1px] mb-8 fill-tertiary-300 dark:fill-tertiary-700 rotate-180" />
    </>
  );
}
