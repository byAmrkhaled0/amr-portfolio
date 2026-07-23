import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amr-developer-portfolio.basemngm.chatgpt.site"),
  title: {
    default: "عمرو خالد | مبرمج ومصمم مواقع في المنصورة | React & AI",
    template: "%s | عمرو خالد — مبرمج مواقع في المنصورة",
  },
  description:
    "عمرو خالد مبرمج ومصمم مواقع في المنصورة متخصص في تصميم مواقع الشركات والمنصات التعليمية والمتاجر الإلكترونية باستخدام React والذكاء الاصطناعي، مع SEO قوي وتجربة موبايل سريعة.",
  keywords: [
    "مبرمج مواقع في المنصورة",
    "مصمم مواقع في المنصورة",
    "أفضل مبرمج مواقع في المنصورة",
    "أفضل مصممين مواقع في المنصورة",
    "تصميم مواقع المنصورة",
    "شركة تصميم مواقع المنصورة",
    "مطور React في مصر",
    "تصميم منصة تعليمية",
    "تصميم متجر إلكتروني",
    "تصميم مواقع للمدرسين",
    "Front End Developer Mansoura",
    "React Developer Egypt",
    "Web Designer Mansoura",
    "Amr Khaled Developer",
  ],
  authors: [{ name: "Eng Amr Khaled Abozeid" }],
  creator: "Eng Amr Khaled Abozeid",
  publisher: "Eng Amr Khaled Abozeid",
  alternates: {
    canonical: "/",
    languages: { "ar-EG": "/", "en": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Amr Khaled — Web Developer & Designer",
    title: "عمرو خالد | مبرمج ومصمم مواقع في المنصورة",
    description:
      "تصميم وتطوير مواقع احترافية ومنصات تعليمية ومتاجر إلكترونية سريعة ومتوافقة مع الهاتف باستخدام React وAI.",
    images: [{
      url: "/images/amr-profile-creative.jfif",
      width: 960,
      height: 1280,
      alt: "المهندس عمرو خالد — مبرمج ومصمم مواقع في المنصورة",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "عمرو خالد | مبرمج ومصمم مواقع في المنصورة",
    description: "مواقع ومنصات رقمية سريعة، فنية، ومتوافقة مع الهاتف.",
    images: ["/images/amr-profile-creative.jfif"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Web Development",
  other: {
    "codex-preview": "development",
    "geo.region": "EG-DK",
    "geo.placename": "Mansoura",
  },
  icons: {
    icon: "/images/amr-logo.webp",
    shortcut: "/images/amr-logo.webp",
    apple: "/images/amr-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
