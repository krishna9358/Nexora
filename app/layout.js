"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";
import Footer from "@/components/custom/Footer";
import { MessagesContext } from "@/context/MessagesContext";
import { useState } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [messages, setMessages] = useState([]);
  return (
    <html lang="en">
      <title>Nexora</title>
      <MessagesContext.Provider value={{ messages, setMessages }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[url("/bg.jpg")] bg-cover bg-center bg-no-repeat`}
      >
        <Header />
        {children}
        <Footer />
      </body>
      </MessagesContext.Provider>
    </html>
  );
}
