import React, { Suspense, lazy } from "react";
import Hero from "./hero/page";
import Loader from "@/components/Loader";
import FloatingAI from "@/components/FloatingAI";
import GitHubStats from "@/components/GitHubStats";

const About = lazy(() => import("./about/page"));
const Skills = lazy(() => import("./skills/page"));
const Projects = lazy(() => import("./project/page"));
const Contact = lazy(() => import("./contact/page"));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loader />}>
        <About />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Skills />
      </Suspense>
      <GitHubStats />
      <Suspense fallback={<Loader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Contact />
      </Suspense>
      <FloatingAI />
    </>
  );
}
