import Image from "next/image";
import Link from 'next/link'
import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Play from "./components/Coin";
import Contribution from "./components/Contribution";
import Project from "./components/Project";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
        <Hero/>
      
        <About/>

        <Skill/>

        <Play/>

        <Contribution/>

        <Project/>
     
        <ContactForm/>

        <Footer/>
    </>
  );
}
