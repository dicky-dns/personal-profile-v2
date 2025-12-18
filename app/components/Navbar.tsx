import Image from "next/image";
import Link from "next/link";

export default function Navbar(){
    return ( 
        <div className="container">
          <div className="navbar-header ">
            <div className="row">
                <div className="col-4">
                    <div className="navbar-navigate">
                        <div className="navbar-menu">
                              {[
                                { href: "/", label: "Home", Image: "/images/menu-home.png"},
                                { href: "/#about", label: "About", Image: "/images/menu-about.png" },
                                { href: "/#project", label: "Project", Image: "/images/menu-project.png" },
                                { href: "/#contact", label: "Contact", Image: "/images/menu-contact.png" },
                              ].map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="text-dark text-decoration-none"
                                >
                                  <span className="text-menu">{item.label}</span>
                                  <span className="logo-menu">
                                    <Image fill src={item.Image} alt={item.label}/>
                                  </span>
                                </Link>
                              ))}
                        </div>
                        <Link href="#" className="button-hamburger"></Link>
                    </div>
                </div>

                <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <Link href="/" className="navbar-brand navbar-image"
                            style={{ backgroundImage: "url('/images/logo.png')"}}></Link>
                    </div>
                </div>


                <div className="col-4">
                    <div className="d-flex align-items-center justify-content-end h-100">
                        <Link href="/contact" className="button-dark-play">{"Let's Play!"}</Link>
                        <Link href="#" className="button-hamburger"></Link>
                    </div>
                </div>
              </div>
              <div className="nav-menu-mobile">
                <Link href="#" className="button-close-mobile">
                  <Image src="images/close-white.svg" alt="Close Menu" fill/>
                </Link>
                
                <div className="navbar-menu-mobile">
                    <Link href="/" className="navbar-menu-mobile text-dark text-decoration-none">
                      <span className="text-menu">Home</span>
                      <span className="logo-menu">
                          <Image width={125} height={120} alt="Menu" src="/images/menu-home.png" />
                      </span>
                    </Link>
                    <Link href="/#about" className="navbar-menu-mobile text-dark text-decoration-none">
                      <span className="text-menu">About</span>
                      <span className="logo-menu">
                        <Image width={50} height={50} alt="Menu" src="/images/menu-about.png" />
                      </span>
                    </Link>
                    <Link href="/#project" className="navbar-menu-mobile text-dark text-decoration-none">
                      <span className="text-menu">Project</span>
                      <span className="logo-menu">
                        <Image width={50} height={50} alt="Menu" src="/images/menu-project.png" />
                      </span>
                    </Link>
                    <Link href="/#contact" className="navbar-menu-mobile text-dark text-decoration-none">
                      <span className="text-menu">Contact</span>
                      <span className="logo-menu">
                        <Image width={40} height={40} alt="Menu" src="/images/menu-contact.png" />
                      </span>
                    </Link>
                    <div className="navbar-menu-mobile-footer">
                        <Link href="{{ route('contact" className="button-dark-play d-block">{"Let's Play!"}</Link>
                    </div>
                </div>
              </div>
          </div>
        </div>
    );
};