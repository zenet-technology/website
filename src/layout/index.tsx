import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Nav from '@/components/nav';
import getCanonical from '@/utils/getCanonical';
import type { RequestContext } from 'brisa';
import appStyle from '../style.css';

export default function Layout(
  { children }: { children: JSX.Element },
  { route, i18n, css: setCSS }: RequestContext,
) {
  const { name, query, pathname } = route;
  const isDefaultMeta = name !== '/blog/[slug]';
  const hasQueryParams = Object.keys(query ?? {}).length > 0;

  const metadata = {
    title: 'Zenet Technology Pte. Ltd. | Your technology consultancy',
    baseUrl: getCanonical(),
    url: getCanonical(pathname),
    search: getCanonical('search.xml'),
    description:
      'A technology consultancy, engineering, with a service we are proud of. We help you building your digital journey so you can make extraordinary impact today, tomorrow and beyond.',
    keywords: [
      'Zenet',
      'Zenet Technology',
      'Consultancy',
      'Outsourcing',
      'Mentoring',
      'Development',
      'Software development',
      'Software consultancy',
      'App development',
      'Web development',
      'Website development',
      'Engineering',
    ],
  } as const;

  setCSS`
    ${appStyle}
  `;

  return (
    <html lang={i18n.locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="author" href={metadata.baseUrl} />
        <meta name="author" content="Zenet Technology Pte. Ltd." />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0b2027" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,300;0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@zenettechnology" />
        <link
          rel="search"
          href={metadata.search}
          type="application/opensearchdescription+xml"
          title={metadata.title}
        />
        {hasQueryParams && <meta name="robots" content="noindex, follow" />}
        {isDefaultMeta && (
          <>
            <title>{metadata.title}</title>
            <meta name="title" content={metadata.title} />
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords.join(',')} />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta
              name="twitter:image"
              content={`${metadata.baseUrl}/media/og-share.png`}
            />
            <meta name="twitter:image:alt" content={metadata.title} />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:url" content={metadata.baseUrl} />
            <meta
              property="og:image"
              content={`${metadata.baseUrl}/media/og-share.png`}
            />
            <meta property="og:image:alt" content={metadata.title} />
          </>
        )}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Zenet Technology" />
        <link
          href="/splash/splash-1290.png"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1179.png"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1284.png"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1170.png"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1080.png"
          media="(device-width: 360px) and (device-height: 780px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1242-1.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-828.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1125.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1242-2.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-750.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-2048.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1668-1.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1640.png"
          media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1620.png"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1668-2.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splash/splash-1536.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link
          rel="icon"
          href="/icons/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/icons/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/icons/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon.png"
          sizes="180x180"
          type="image/png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          // @ts-expect-error -- mask-icon is supposed to have color=""
          color="#ffaa00"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/icons/apple-touch-icon-precomposed.png"
        />
      </head>
      <body class="dark:bg-black text-black dark:text-white">
        <Nav />

        <main class="mt-16">{children}</main>
        <div class="container mx-auto max-w-7xl px-4 py-8" id="contact">
          <Contact />
        </div>
        <Footer />
        <cookies-banner />
      </body>
    </html>
  );
}
