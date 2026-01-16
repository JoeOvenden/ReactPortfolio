import { deepStrictEqual } from "assert";
import { DESTRUCTION } from "dns";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";
import { ComponentProps, ImgHTMLAttributes } from "react";
import Section from "./ui/section";

function Card({imgAttributes, description, title, link} : {
  imgAttributes: ComponentProps<typeof Image>,
  description?: string,
  title?: string,
  link?: string
}) {
  return (
    <a href={`${link}`}>
      <Section className="flex flex-col gap-2 items-center max-w-60 hover:scale-105 transition duration-200">
        <h1 className="text-xl font-bold">{title}</h1>
        <Image
          {...imgAttributes}
          width={80}
          height={61}
        />
        <p>{description}</p>
      </Section>
    </a>
  )
}

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-[100vh]">
      <section className="flex flex-row items-center gap-6">
        <Card 
          imgAttributes={{
            src: "/runner-logo.png",
            alt: "Man running logo"
          }}
          description="Running app for runners"
          title="Runner"
          link="/runner"
        />
        <Card 
          imgAttributes={{
            src: "/physics-logo.png",
            alt: "Man running logo"
          }}
          description="An interactive education physics website about the laws of motion"
          title="Physics"
          link="/physics"
        />
        <Card 
          imgAttributes={{
            src: "/fishy-logo.png",
            alt: "Fish logo"
          }}
          description="Fishy game"
          title="Fishy"
          link="/fishy"
        />
      </section>
    </div>
  );
}
