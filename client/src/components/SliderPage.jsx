import React, { useState, useEffect, useRef, useCallback } from "react";

const FloatingCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrolling, setScrolling] = useState(false);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollThreshold = 30; // Reduced threshold for more responsive scrolling
  const scrollCooldown = 250; // Cooldown period between scroll events

  const slides = [
    {
      title: "Sessions & Workshops",
      description:
        "The Sessions & Workshops department focuses on enhancing learning through interactive sessions and hands-on workshops. Our goal is to equip members with valuable skills and practical knowledge that contribute to their personal and professional growth",
      image: "/workshop.jpg",
      resume:
        "This department ensures that learning is not just theoretical but also practical, engaging, and impactful.",
    },
    {
      title: "Events & Activities",
      description:
        "The Events & Activities department plays a key role in fostering community engagement and collaboration through well-planned events and challenges. Our focus is on creating interactive and enriching experiences that bring members together and enhance their skills.",
      image: "/events.jpg",
      resume:
        "Through these activities, we aim to build a vibrant and connected community where members can learn, network, and grow together.",
    },
    {
      title: "Freelance & Business",
      description:
        "The Freelance & Business department equips members with the essential skills needed to succeed in freelancing and business development. Our goal is to help members navigate the freelance world with confidence and an entrepreneurial mindset.",
      image: "/freelance.jpg",
      resume:
        "This department empowers members to turn their skills into opportunities, grow their careers independently, and thrive in the freelance industry.",
    },
    {
      title: "External Relations",
      description:
        "The External Relations department manages the club’s outreach efforts, fostering meaningful connections with organizations and securing sponsorships to support club initiatives.",
      image: "/relations.jpg",
      resume:
        "This department plays a vital role in strengthening the club’s presence, ensuring sustainability, and creating valuable opportunities for members through strategic collaborations.",
    },
    {
      title: "Social Media & Marketing",
      description:
        "The Social Media & Marketing department strengthens the club’s online presence, leveraging strategic content to engage a wider audience and build a dynamic community.",
      image: "/social.jpg",
      resume:
        "This department plays a key role in expanding the club’s reach, fostering community interaction, and maintaining a strong digital presence through impactful content and branding.",
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (!isHovering && !scrolling) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovering, scrolling, nextSlide]);

  const handleWheel = useCallback(
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();

        const now = Date.now();
        if (now - lastScrollTime.current < scrollCooldown) {
          return;
        }

        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        lastScrollTime.current = now;

        if (Math.abs(e.deltaX) > scrollThreshold) {
          if (e.deltaX > 0) {
            nextSlide();
          } else {
            prevSlide();
          }

          scrollTimeout.current = setTimeout(() => {
            scrollTimeout.current = null;
          }, scrollCooldown);
        }
      }
    },
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setScrolling(true);
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (!startX) return;

      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      if (Math.abs(diff) > scrollThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        setStartX(null);
      }
    },
    [startX, nextSlide, prevSlide]
  );

  const handleTouchEnd = () => {
    setStartX(null);
    setScrolling(false);
  };

  const getCardStyles = (index) => {
    const diff = (index - activeIndex + slides.length) % slides.length;
    const translateX =
      diff === 0 ? 0 : diff === 1 ? 95 : diff === slides.length - 1 ? -95 : 200;
    const translateZ = diff === 0 ? 0 : -200;
    const backgroundColor = diff === 0 ? "transparent" : "rgba(0, 0, 0, 0.15)";
    const rotateY =
      diff === 0 ? 0 : diff === 1 ? 30 : diff === slides.length - 1 ? -30 : 60;
    const opacity =
      diff === 0 ? 1 : diff === 1 || diff === slides.length - 1 ? 0.6 : 0.3;
    const scale = diff === 0 ? 1 : 0.9;

    return {
      transform: `perspective(2000px) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: slides.length - diff,
      willChange: "transform, opacity",
      backgroundColor,
    };
  };

  return (
    <div className="w-full h-[90dvh] md:h-dvh bg-therd flex flex-col py-14">
      <div className="flex justify-center items-center h-fit w-full">
        <h2 className="PageHeader text-secondary py-0">Department</h2>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 w-full z-50 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards Container */}
        <div className="absolute w-[85%] md:w-full md:mx-0 mx-auto inset-0 flex items-center justify-center mb-10">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute w-full max-w-2xl transition-all duration-500 ease-out"
              style={getCardStyles(index)}
            >
              <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute h-fit py-5 px-3 w-full bottom-0 translate-y-full group-hover:translate-y-0 duration-300 bg-black/75">
                  <h3 className="w-full text-center text-white text-2xl pt-2.5 font-light scale-y-150 font-luckiest">
                    {" "}
                    {slide.title}{" "}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "h-2.5 w-8 bg-primary"
                  : "w-2.5 h-2.5 bg-secondary hover:bg-primary"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingCarousel;
