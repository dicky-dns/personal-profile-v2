import Hero from "./components/Hero";
import About from "./components/About";
import Skill from "./components/Skill";
import Play from "./components/Coin";
import Contribution from "./components/Contribution";
import Project from "./components/Project";
import ContactForm from "./components/ContactForm";
import ScrollToSection from "./components/ScrollToSection";

export default function Home() {
  return (
    <>
        <ScrollToSection/>
        
        <Hero/>
      
        <About/>

        <Skill/>

        <Play/>

        <Contribution/>

        <Project/>
     
        <ContactForm/>
    </>
  );
}
