"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";
import Link from "next/link";
import "./index.css";
import React from "react";

export default function Page() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pb-8">
      <section className="hero_section">
        <div className="section_container">
          <div className="hero_container">
            <div className="text_section">
              <Image
                width={180}
                height={57}
                src="/gck.png"
                alt="GCK"
                className="bg-slate-500"
              />

              <h2>Bienvenue chez GCK Likasi !</h2>
              <h3>La construction c&apos;est nous !</h3>
              <p>
                Votre partenaire de confiance pour tous vos besoins en matériaux
                de construction. Situés au cœur de la ville de Likasi, nous
                sommes fiers de vous offrir une large gamme de produits de
                qualité, notamment du ciment, du gravier, et du sable. <br />
                Que vous soyez un professionnel du bâtiment ou un particulier
                passionné de construction, notre équipe est là pour vous
                accompagner dans la réalisation de vos projets. <br />
                Explorez notre site pour découvrir nos offres et services, et
                n&apos;hésitez pas à nous contacter pour toute question ou
                demande spécifique. <br />
                Chez GCK Likasi, nous construisons ensemble l&apos;avenir.
              </p>
              <div className="hero_section_button">
                <Link href="/login">
                  <button className="button">Commander</button>
                </Link>
                <Link href="/login">
                  <button className="button">Se connecter</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        GCK Likasi
      </h2> */}

      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Le premier principe chez GCK Likasi est de toujours vanter la
                qualité de nos produits.
              </span>{" "}
              Gardez un journal de vos projets, notez rapidement votre liste de
              courses, et prenez des notes détaillées pour vos chantiers. Besoin
              de transformer ces notes en actions concrètes ? Aucun souci. GCK
              Likasi est prêt à vous fournir le ciment, le gravier, le sable, et
              tout ce dont vous avez besoin pour réaliser vos rêves de
              construction.
            </p>
            <Image
              src="/gck.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
