// import React, { useState, useEffect } from "react";

// const FloatingCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovering, setIsHovering] = useState(false);

//   const slides = [
//     {
//       id: 1,
//       title: "Cosmic Journey",
//       description: "Explore the unknown",
//       image: "/slide1.png",
//     },
//     {
//       id: 2,
//       title: "Ocean Dreams",
//       description: "Dive into beauty",
//       image: "/slide2.png",
//     },
//     {
//       id: 3,
//       title: "Forest Magic",
//       description: "Nature's secrets",
//       image: "/slide3.png",
//     },
//     {
//       id: 4,
//       title: "Desert Whispers",
//       description: "Silent beauty",
//       image: "/slide4.png",
//     },
//     {
//       id: 5,
//       title: "Desert Whispers",
//       description: "Silent beauty",
//       image: "/slide5.png",
//     },
//   ];

//   const nextSlide = () => {
//     setActiveIndex((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   useEffect(() => {
//     if (!isHovering) {
//       const interval = setInterval(nextSlide, 200000);
//       return () => clearInterval(interval);
//     }
//   }, [isHovering]);

//   const getCardStyles = (index) => {
//     const diff = (index - activeIndex + slides.length) % slides.length;
//     const translateX =
//       diff === 0 ? 0 : diff === 1 ? 95 : diff === slides.length - 1 ? -95 : 200;
//     const translateY = diff === 0 ? 0 : 0;
//     const translateZ = diff === 0 ? 0 : -200;
//     const rotateY =
//       diff === 0 ? 0 : diff === 1 ? 30 : diff === slides.length - 1 ? -30 : 60;
//     const opacity =
//       diff === 0 ? 1 : diff === 1 || diff === slides.length - 1 ? 0.6 : 0.3;
//     const scale = diff === 0 ? 1 : 0.9;
//     return {
//       transform: `perspective(2000px) translateX(${translateX}%) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
//       opacity,
//       zIndex: slides.length - diff,
//     };
//   };

//   return (
//     <div
//       className="relative h-screen w-full bg-gray-900 overflow-hidden"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {/* Cards Container */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className="absolute w-full max-w-2xl transition-all duration-700 ease-out"
//             style={getCardStyles(index)}
//           >
//             <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
//               {/* Background Gradient */}
//               <div className={`absolute inset-0 bg-[#0000000c] `} />

//               {/* Image */}
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
//               />

//               {/* Content */}
//               <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
//                 <h2 className="text-4xl font-bold text-white mb-2 transform group-hover:translate-x-4 transition-transform duration-300">
//                   {slide.title}
//                 </h2>
//                 <p className="text-xl text-white/80 transform group-hover:translate-x-6 transition-transform duration-500 delay-100">
//                   {slide.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-50">
//         <button
//           onClick={prevSlide}
//           className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
//         >
//           ←
//         </button>

//         {/* Indicators */}
//         <div className="flex gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveIndex(index)}
//               className={`rounded-full transition-all duration-300 ${
//                 index === activeIndex
//                   ? "h-3 w-8 bg-primary"
//                   : "w-3 h-3  bg-secondary hover:bg-primary"
//               }`}
//             />
//           ))}
//         </div>

//         <button
//           onClick={nextSlide}
//           className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
//         >
//           →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FloatingCarousel;
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
      id: 1,
      title: "Cosmic Journey",
      description: "Explore the unknown",
      image: "/slide1.png",
    },
    {
      id: 2,
      title: "Ocean Dreams",
      description: "Dive into beauty",
      image: "/slide2.png",
    },
    {
      id: 3,
      title: "Forest Magic",
      description: "Nature's secrets",
      image: "/slide3.png",
    },
    {
      id: 4,
      title: "Desert Whispers",
      description: "Silent beauty",
      image: "/slide4.png",
    },
    {
      id: 5,
      title: "Desert Whispers",
      description: "Silent beauty",
      image: "/slide5.png",
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
    <div className="w-full h-dvh bg-black flex flex-col py-14">
      <div className="flex justify-center items-center h-fit w-full">
        <h2 className="PageHeader text-secondary ">Department</h2>
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
        <div className="absolute inset-0 flex items-center justify-center mb-10">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute w-full max-w-2xl transition-all duration-500 ease-out"
              style={getCardStyles(index)}
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl group ">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                  loading="lazy"
                />
                <div className="absolute h-fit py-5 px-3 w-full bottom-0 translate-y-full group-hover:translate-y-0 duration-300 bg-black/75">
                  <h3 className="w-full text-center text-primary text-2xl pt-2.5 font-light scale-y-150 font-luckiest">
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
