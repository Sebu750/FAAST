import { Link, useLocation } from 'react-router-dom'

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
      return { name: formattedName, path }
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
      
      <nav aria-label="Breadcrumb" className="py-6 border-b border-neutral-900 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ol className="flex items-center space-x-3 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-3 text-neutral-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-[#bb9457] font-medium" aria-current="page">
                    {currentPage || item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}

export default Breadcrumb
