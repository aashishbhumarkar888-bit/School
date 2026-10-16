import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdminShortcutModal } from "@/components/ui/AdminShortcutModal";
import { FloatingConcierge } from "@/components/ui/FloatingConcierge";
import { HouseProvider } from "@/lib/context/HouseContext";
import { SCHOOL_FACTS } from "@/lib/content/school-data";
import { SEO_CONFIG } from "@/lib/seo-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: {
    default: `${SEO_CONFIG.siteName} | Integral K–12 Education, MPBSE Affiliated Bhopal`,
    template: `%s | ${SEO_CONFIG.siteName}`,
  },
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: SCHOOL_FACTS.society, url: SEO_CONFIG.siteUrl }],
  creator: SCHOOL_FACTS.fullName,
  publisher: SCHOOL_FACTS.society,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    title: `${SEO_CONFIG.siteName} | Integral K–12 Education`,
    description: SEO_CONFIG.description,
    images: [
      {
        url: "/images/official/society.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Aurobindo School, Auro Mandir Parisar, Tulsi Nagar, Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.siteName,
    description: SEO_CONFIG.description,
    images: ["/images/official/society.jpg"],
  },
  verification: {
    google: "sas-bhopal-institutional-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${SEO_CONFIG.siteUrl}/#organization`,
        name: SEO_CONFIG.siteName,
        alternateName: "Sri Aurobindo School",
        url: SEO_CONFIG.siteUrl,
        logo: `${SEO_CONFIG.siteUrl}/logo.png`,
        foundingDate: "1989-07",
        parentOrganization: {
          "@type": "Organization",
          name: SCHOOL_FACTS.society,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: SEO_CONFIG.address.street,
          addressLocality: SEO_CONFIG.address.city,
          addressRegion: SEO_CONFIG.address.state,
          postalCode: SEO_CONFIG.address.postalCode,
          addressCountry: SEO_CONFIG.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SEO_CONFIG.geo.latitude,
          longitude: SEO_CONFIG.geo.longitude,
        },
        telephone: SEO_CONFIG.contact.phone,
        email: SEO_CONFIG.contact.email,
        openingHours: SEO_CONFIG.contact.openingHours,
      },
      {
        "@type": "School",
        "@id": `${SEO_CONFIG.siteUrl}/#school`,
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        hasCredential: "MPBSE Affiliated K–12 Co-Educational School",
        areaServed: "Bhopal, Madhya Pradesh",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, Cheque, Bank Transfer",
      },
      {
        "@type": "FAQPage",
        "@id": `${SEO_CONFIG.siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "When was Sri Aurobindo School, Bhopal founded?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sri Aurobindo School, Bhopal was established in July 1989 under the auspices of Sri Aurobindo Education Centre (SAEC), registered under the MP Registrar of Firms and Societies.",
            },
          },
          {
            "@type": "Question",
            name: "What board is Sri Aurobindo School, Bhopal affiliated with?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The school is affiliated with the Madhya Pradesh Board of Secondary Education (MPBSE), offering complete education from Nursery through Class XII.",
            },
          },
          {
            "@type": "Question",
            name: "What are the school timings and administrative office hours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Regular school hours are Monday to Saturday from 7:45 AM to 1:30 PM. Admission enquiry and registration windows operate from 8:00 AM to 1:00 PM.",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-blue-600/15 selection:text-blue-900 antialiased">
        <HouseProvider>
          <SiteHeader />
          <main className="flex-1 pt-20 md:pt-24">{children}</main>
          <SiteFooter />
          <FloatingConcierge />
          <AdminShortcutModal />
        </HouseProvider>
      </body>
    </html>
  );
}
