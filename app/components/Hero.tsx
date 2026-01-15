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
                                    ["image-d", "hero-desktop-d.webp"],
                                    ["image-i", "hero-desktop-i.webp"],
                                    ["image-c", "hero-desktop-c.webp"],
                                    ["image-k", "hero-desktop-k.webp"],
                                    ["image-y", "hero-desktop-y.webp"],
                                    ["image-d2", "hero-desktop-d2.webp"],
                                    ["image-n", "hero-desktop-n.webp"],
                                    ["image-s", "hero-desktop-s.webp"],
                                    ["image-icon", "hero-desktop-icon.webp"],
                                    ].map(([cls, src]) => (
                                    <img key={cls} className={cls} src={"/images/" + src} alt="Logo" />
                                ))}
                            </div>

                            <div className="hero-image-mobile">
                                {[
                                    ["image-d", "hero-mobile-d.webp"],
                                    ["image-i", "hero-mobile-i.webp"],
                                    ["image-c", "hero-mobile-c.webp"],
                                    ["image-k", "hero-mobile-k.webp"],
                                    ["image-y", "hero-mobile-y.webp"],
                                    ["image-d2", "hero-mobile-d2.webp"],
                                    ["image-n", "hero-mobile-n.webp"],
                                    ["image-s", "hero-mobile-s.webp"],
                                    ["image-icon", "hero-mobile-icon.webp"],
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