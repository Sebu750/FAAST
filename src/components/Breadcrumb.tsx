import { useLocation } from 'react-router-dom'

interface BreadcrumbProps {
  currentPage: string
}

const Breadcrumb = ({ currentPage }: BreadcrumbProps) => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    ...pathnames.map((name, index) => {
      const path = `/${pathnames.slice(0, index + 1).join('/')}`
      const formattedName = name
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return { name: index === pathnames.length - 1 ? currentPage || formattedName : formattedName, path }
    })
  ]

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://adorzia.com${item.path}`
    }))
  }

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Keep content below the fixed site header without a second navigation bar. */}
      <div aria-hidden="true" className="h-16 lg:h-20" />
    </>
  )
}

export default Breadcrumb
