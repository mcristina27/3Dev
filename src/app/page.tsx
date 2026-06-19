import Navbar    from "@/components/layout/Navbar";
import Footer    from "@/components/layout/Footer";
import Hero      from "@/components/sections/Hero";
import Ticker    from "@/components/sections/Ticker";
import Catalog   from "@/components/sections/Catalog";
import Feature3D from "@/components/sections/Feature3D";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Feature3D />
      <Catalog />
      <Footer />
    </main>
  );
}
