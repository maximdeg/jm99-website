import EmailForm from "@/components/EmailForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroMain from "@/components/HeroMain";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <section className="h-full">
        <section className="pt-6 md:pt-10 items-center">
          <HeroMain />
          <Services />
          <EmailForm />
          <Footer />
        </section>
      </section>
    </>
  );
}
