import { tools } from "@/lib/tools";

const BASE_URL = "https://jaeseong90.github.io/Toolry";

export default function ToolStructuredData({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Toolry",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tool.name,
        item: `${BASE_URL}/${slug}`,
      },
    ],
  };

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.name} | Toolry`,
    url: `${BASE_URL}/${slug}`,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    inLanguage: "ko",
    isPartOf: {
      "@type": "WebSite",
      name: "Toolry",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
    </>
  );
}
