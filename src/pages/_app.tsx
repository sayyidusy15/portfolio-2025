// import "@/styles/globals.css";
import AppShell from "@/components/layouts/AppShell";
import "@/styles/style.css"; 
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppShell>
      <Component {...pageProps} />
    </AppShell>
  )
}
