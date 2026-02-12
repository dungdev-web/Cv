import React, { Suspense, lazy } from 'react';
import Hero from "./hero/page"; 
import Loader from "@/components/Loader";

const About = lazy(() => import("./about/page"));
const Skills = lazy(() => import("./skills/page"));
const Projects = lazy(() => import("./project/page"));
const Contact = lazy(() => import("./contact/page"));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loader/>}>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </>
  );
}
