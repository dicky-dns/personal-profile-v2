"use client"

export default function Hero() {
    return (
        <>
            <div className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="hero-image-desktop">
                            {[
                                ["image-d", "hero-desktop-d.png"],
                                ["image-i", "hero-desktop-i.png"],
                                ["image-c", "hero-desktop-c.png"],
                                ["image-k", "hero-desktop-k.png"],
                                ["image-y", "hero-desktop-y.png"],
                                ["image-d2", "hero-desktop-d2.png"],
                                ["image-n", "hero-desktop-n.png"],
                                ["image-s", "hero-desktop-s.png"],
                                ["image-icon", "hero-desktop-icon.png"],
                                ].map(([cls, src]) => (
                                <img key={cls} className={cls} src={"/images/" + src} alt="Logo" />
                            ))}
                        </div>

                        <div className="hero-image-mobile">
                            {[
                                ["image-d", "hero-mobile-d.png"],
                                ["image-i", "hero-mobile-i.png"],
                                ["image-c", "hero-mobile-c.png"],
                                ["image-k", "hero-mobile-k.png"],
                                ["image-y", "hero-mobile-y.png"],
                                ["image-d2", "hero-mobile-d2.png"],
                                ["image-n", "hero-mobile-n.png"],
                                ["image-s", "hero-mobile-s.png"],
                                ["image-icon", "hero-mobile-icon.png"],
                            ]
                            .map(([cls, src]) => (
                                <img key={cls} className={cls} src={"/images/" + src} alt="Logo" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div className="hero-divider"></div>
        </>
    )
}