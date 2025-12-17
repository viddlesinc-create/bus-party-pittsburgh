import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/lib/business-info";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Build full breadcrumb list including Home
  const fullItems = [{ name: "Home", url: "/" }, ...items];
  
  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BUSINESS_INFO.website}${item.url}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="py-4">
        <ol 
          className="flex items-center space-x-2 text-sm"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          <li 
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <Link 
              to="/" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Home"
              itemProp="item"
            >
              <Home className="h-4 w-4" />
              <meta itemProp="name" content="Home" />
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items.map((item, index) => (
            <li 
              key={index} 
              className="flex items-center space-x-2"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span 
                  className="text-foreground font-medium" 
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.url} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 2)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
