import AboutText from "./AboutText";
import Principle from "./Principle";

export default function About() {
  return (
    <div className="container" id="about">
          <div className="row">
              <div className="about-heading">
                  <img src="/images/wtf.png" />
              </div>
              <div className="about-section">
                  <div id="about-text" className="text-justify text-base md:text-lg leading-relaxed tracking-wide space-y-4">
                        <AboutText />
                  </div>
              </div>
          </div>

          <div className="row">
            <Principle />
          </div>
      </div>
  );
}