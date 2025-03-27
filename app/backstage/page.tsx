import LoginForm from '@/components/Backstage/login-form'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Backstage",
  description: "Access your K&K Records account. Log in securely to manage your profile, music, and more.",
  robots: "noindex, nofollow", // Prevents search engines from indexing the login page
  openGraph: {
    title: "Backstage - K&K Records",
    description: "Sign in to access your K&K Records account.",
    url: "https://kkrecords.se/backstage",
    siteName: "Backstage - K&K Records",
    images: [
      {
        url: "https://kkrecords.se/api",
        width: 1200,
        height: 630,
        alt: "Backstage - K&K Records",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backstage - K&K Records",
    description: "Backstage - K&K Records",
    images: ["https://kkrecords.se/api"],
  },
};

export default async function page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Login - K&K Records",
    "description": "Sign in to access your K&K Records account.",
    "url": "https://kkrecords.se/login",
    "about": {
      "@type": "Organization",
      "name": "K&K Records",
      "url": "https://kkrecords.se",
      "logo": "https://kkrecords.se/assets/logo.png"
    },
    "potentialAction": {
      "@type": "LoginAction",
      "target": "https://kkrecords.se/login",
      "name": "Login to K&K Records"
    }
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LoginForm />
    </div>
  )
}
