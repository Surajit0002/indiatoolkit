export default function Head() {
  return (
    <>
      <title>India Toolkit - 1000+ Free Online Tools - Fast, Secure & No Login Required</title>
      <meta
        name="description"
        content="Use our free online tools to instantly convert, compress or generate. No login required. Fast & secure. 1000+ tools for developers and students."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="free online tools, converters, calculators, text tools, developer utilities, image tools, PDF tools, AI tools" />
      <meta name="author" content="India Toolkit" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href="https://indiatoolkit.in" />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="India Toolkit - 1000+ Free Online Tools" />
      <meta property="og:description" content="Fast, secure & free online tools. No signup required. 1000+ utilities for developers, designers & students." />
      <meta property="og:url" content="https://indiatoolkit.in" />
      <meta property="og:site_name" content="India Toolkit" />
      <meta property="og:image" content="https://indiatoolkit.in/og/hero.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="India Toolkit - Free Online Tools" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@IndiaToolkit" />
      <meta name="twitter:title" content="India Toolkit - 1000+ Free Online Tools" />
      <meta name="twitter:description" content="Fast, secure & free online tools. No signup required." />
      <meta name="twitter:image" content="https://indiatoolkit.in/og/hero.png" />
      <meta name="twitter:creator" content="@IndiaToolkit" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'India Toolkit',
            url: 'https://indiatoolkit.in',
            description: 'India\'s premier platform for free online tools and utilities',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://indiatoolkit.in/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            },
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: 1000,
              itemListElement: []
            }
          })
        }}
      />
      
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2181120097485339"
        crossOrigin="anonymous"
      />
    </>
  );
}