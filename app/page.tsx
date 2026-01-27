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
import ScrollToSection from "./components/ScrollToSection";
import ChatWidget from "./components/ChatWidget";

export default function Home() {
  return (
    <>
        <ScrollToSection/>
        <ChatWidget />
        
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
