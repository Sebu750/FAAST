import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonicalURL: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  schemaType?: string
  schema?: Record<string, any>
  localBusinessSchema?: Record<string, any>[]
  keywords?: string
}

const SEO = ({
  title,
  description,
  canonicalURL,
  ogTitle,
  ogDescription = description,
  ogImage = 'https://adorzia.com/og-image.jpeg',
  ogImageAlt = 'Adorzia - Pakistani fashion ecosystem',
  schemaType = 'WebPage',
  schema = {},
  localBusinessSchema = [],
  keywords = ''
}: SEOProps) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": title,
    "description": description,
    "url": canonicalURL,
    ...schema
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <link rel="canonical" href={canonicalURL} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Adorzia" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalURL} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Schema.org JSON-LD - Main Schema */}
      <script type="application/ld+json">
        {JSON.stringify(baseSchema)}
      </script>

      {/* Schema.org JSON-LD - Local Business Schemas */}
      {localBusinessSchema.map((bizSchema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(bizSchema)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEO
