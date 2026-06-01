import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Adjusted path to point up one level

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO KEYWORD GOLDMINES ---
const seoData = {
  vi: {
    title: "Mandarin with Yulin | Học Tiếng Trung 1 kèm 1 Online",
    description: "Khóa học tiếng Trung 1 kèm 1 online với giáo viên bản ngữ Đài Loan, chứng chỉ New Zealand. Dạy tiếng Trung giao tiếp bằng tiếng Anh, luyện thi HSK chuẩn Bắc Kinh.",
  },
  en: {
    title: "Mandarin with Yulin | 1-on-1 Online Mandarin Tutor",
    description: "Private Mandarin lessons for English speakers. Learn Mandarin with a Native Taiwanese Mandarin teacher online, NZ certified. Premium 1-on-1 Mandarin tutor UK.",
  },
  zh: {
    title: "跟玉玲学中文 | 一对一在线精品中文课程",
    description: "一对一在线中文家教。台湾母语教师，新西兰认证。全英语授课，提供日常交流与北京大学标准HSK辅导。",
  }
};

// Dynamically generate Meta Tags based on the URL parameter (/vi, /en, /zh)
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as keyof typeof seoData) || 'vi';
  const meta = seoData[lang];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: {
        'vi': '/vi',
        'en': '/en',
        'zh': '/zh',
      },
    },
  };
}

// Tell Next.js to pre-build these 3 exact language routes
export function generateStaticParams() {
  return [{ lang: 'vi' }, { lang: 'en' }, { lang: 'zh' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  
  return (
    <html
      lang={resolvedParams.lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}