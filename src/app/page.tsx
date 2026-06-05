import Navbar      from "@/components/layout/Navbar";
import Footer      from "@/components/layout/Footer";
import Hero        from "@/components/sections/Hero";
import Ticker      from "@/components/sections/Ticker";
import Catalog     from "@/components/sections/Catalog";
import Categories  from "@/components/sections/Categories";
import About       from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Categories />
      <Catalog />
      <Footer />
    </main>
  );
}
