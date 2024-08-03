import BlockGrid from '@/components/block-grid';

export default function AboutUs() {
  const gridBlocks = [
    {
      title: 'Our Mission',
      content:
        'Make technology accessible and hassle-free by addressing any technological challenge.',
    },
    {
      title: 'Our Vision',
      content:
        'We assist businesses by providing strategic consulting and engineering services that align with their corporate goals. It is to offer an exclusive service that can support businesses throughout every stage of their lifecycle.',
    },
    {
      title: 'Our Values',
      content:
        'At Zenet Technology, we love what we do with boundless enthusiasm. We champion teamwork, commitment, and excellence—all with a cheerful smile.',
    },
  ];

  return (
    <article class="container mx-auto max-w-5xl px-4 lg:px-6 pt-8 lg:pt-16">
      <hgroup class="text-center">
        <h1>About Us</h1>
        <p class="font-light text-gray-500 text-base sm:text-lg dark:text-gray-400">
          Zenet Technology Pte. Ltd.
        </p>
      </hgroup>
      <img
        class="w-full h-auto rounded-lg"
        alt="About Us"
        src="/images/about-us.webp"
      />
      <h2>Zenet Technology—Putting A Smile On The Faces Of Businesses</h2>
      <p>
        In response to the challenges posed by COVID-19 layoffs, Albert, an
        engineer with a solid remote work background and a freshly acquired MBA,
        set out to make his mark in the tech industry, pursuing his lifelong
        dreams.
      </p>
      <p>
        Fast forward to 2022, amidst the backdrop of job uncertainties and the
        ever-evolving landscape of remote work culture, Zenet Technology was
        born. Zenet Technology was conceived to address pressing questions:
      </p>
      <ul>
        <li>How can we minimise layoffs?</li>
        <li>
          How can remote/hybrid work be a win-win for employers and employees?
        </li>
        <li>
          How can we maximise and share knowledge in smaller/mid-size companies?
        </li>
        <li>
          How can knowledge retention be ensured even when an engineer departs?
        </li>
        <li>How can employee motivation soar through effective leadership?</li>
        <li>
          How can work be efficiently managed across different time zones?
        </li>
        <li>How can we simplify the complexity of software development?</li>
      </ul>

      <BlockGrid gridBlocks={gridBlocks} />

      <h2>Why Zenet Technology?</h2>
      <p>
        Zenet Technology stands as a reliable ally in technology consulting,
        engineering, and mentoring. We help our clients grow their businesses by
        harnessing the power of technology. Our core competencies include:
      </p>
      <ul>
        <li>Technology and Leadership Mentoring</li>
        <li>Software Development & Infrastructure Management Outsourcing</li>
        <li>Engineering Management</li>
        <li>Product Management</li>
      </ul>
      <p>
        We evaluate company management and products, and we're here to assist
        you in creating brand-new software, solving seemingly impossible
        challenges, or alleviating your technology pains.
      </p>

      <h2>Are you trying to figure yourself out?</h2>
      <p>Let us build it for you!</p>
      <p>
        We are dedicated to establishing lasting relationships with our
        customers by offering high-calibre services that meet your unique
        requirements.
      </p>

      <h2>Our five promises:</h2>
      <ol>
        <li>We Understand Your Business Needs</li>
        <li>Efficient Communication</li>
        <li>On-time Delivery</li>
        <li>High Scalability</li>
        <li>Rapid Adaptation</li>
      </ol>

      <h2>How Will Zenet Technology Help You?</h2>
      <p>
        Our team of professionals is committed to offering our customers
        high-quality services and is well-versed in their respective fields.
        Each organisation has specific needs, and we adapt our solutions to meet
        those needs.
      </p>
      <p>
        Our expertise lies in providing customised solutions. A good
        relationship between our clients and staff is essential. We will ensure
        this.
      </p>
      <p>
        Explore how Zenet Technology can be the catalyst for your business
        success. We're here to empower your growth.
      </p>

      <blockquote>
        Ready to Make Your Team/App Shine? Drop us a line! We'll help you grow
        your business.
      </blockquote>
    </article>
  );
}
