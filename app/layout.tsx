import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AdminShortcutModal } from "@/components/ui/AdminShortcutModal";
import { FloatingConcierge } from "@/components/ui/FloatingConcierge";
import { HouseProvider } from "@/lib/context/HouseContext";
import { SCHOOL_FACTS } from "@/lib/content/school-data";

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
  metadataBase: new URL("https://sas.edu.in"),
  title: {
    default: `${SCHOOL_FACTS.fullName} | Integral Education & MPBSE Affiliated, Bhopal`,
    template: `%s | ${SCHOOL_FACTS.fullName}`,
  },
  description:
    "Official portal of Sri Aurobindo School, Bhopal. Co-educational K–12 institution affiliated with MPBSE, run by Sri Aurobindo Education Centre (SAEC) since July 1989 at Tulsi Nagar.",
  keywords: [
    "Sri Aurobindo School Bhopal",
    "SAS Bhopal",
    "Sri Aurobindo Education Centre",
    "SAEC Bhopal",
    "Schools in Tulsi Nagar Bhopal",
    "MPBSE Affiliated Schools Bhopal",
    "Integral Education Bhopal",
    "Four Houses School Bhopal",
  ],
  authors: [{ name: SCHOOL_FACTS.society }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sas.edu.in",
    siteName: SCHOOL_FACTS.fullName,
    title: `${SCHOOL_FACTS.fullName} | Official Portal`,
    description:
      "Nurturing the sun-eyed children of a marvellous dawn through integral education, Four Houses, and academic excellence at Tulsi Nagar, Bhopal.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SCHOOL_FACTS.fullName,
    alternateName: "Sri Aurobindo School",
    url: "https://sas.edu.in",
    logo: "https://sas.edu.in/logo.png",
    foundingDate: "1989-07",
    parentOrganization: {
      "@type": "Organization",
      name: SCHOOL_FACTS.society,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Auro Mandir Parisar, Behind Kannad Bhawan, 2nd Stop, Tulsi Nagar",
      addressLocality: "Bhopal",
      addressRegion: "Madhya Pradesh",
      postalCode: "462003",
      addressCountry: "IN",
    },
    telephone: SCHOOL_FACTS.phone,
    email: SCHOOL_FACTS.email,
  };

  return (
    <html lang="en" data-house="teresa" className={`${inter.variable} ${cinzel.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCFBF9] font-sans text-slate-900 selection:bg-sky-500/20 antialiased">
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
