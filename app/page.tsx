import EmailForm from "@/components/EmailForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroMain from "@/components/HeroMain";
import Services from "@/components/Services";
import Head from "next/head";
import RepairSplitSection from "@/components/RepairSplitSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>JM99 Santa Fe Computer Requirements</title>
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="Venta y reparacion de computadoras. Te garantizamos productos de calidad y compatibilidad para que puedas trabaja y jugar sin problemas con tus dispositivos de cualquier marca. Consultanos!"
          key="desc"
        />
      </Head>
      <Header />
      <section className="h-full">
        <section className="pt-6 md:pt-10 items-center">
          <HeroMain />
          <Services />
          <RepairSplitSection
            leftImage="/window.svg"
            rightImage="/file.svg"
          />
          <EmailForm />
          <Footer />
        </section>
      </section>
    </>
  );
}
