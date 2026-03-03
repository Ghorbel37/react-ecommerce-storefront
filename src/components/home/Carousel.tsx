import { useEffect, useState } from "react";
import { NavLink, useRouteLoaderData } from "react-router";
import { ChevronLeftIcon, ChevronRightIcon, PhotoIcon } from "@heroicons/react/24/outline";

const BASE_URL = "http://localhost:5173";

export default function Carousel() {
    const slides : any[] = useRouteLoaderData("home-page") ?? [];
    const [current, setCurrent] = useState(0);
    const [loadedPhotos, setLoadedPhotos] = useState({} as Record<string, boolean>);
    
    function markLoaded(id: string) {
        setLoadedPhotos((prev) => ({ ...prev, [id]: true }));
    }

    // Handlers for prev/next buttons
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
    const next = () => setCurrent((c) => (c + 1) % slides.length);

    // Auto-advance every 4 seconds
    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides, prev, next]);

    if (slides.length === 0) {
        return (
            <div className="w-full h-72 bg-stone-200 flex items-center justify-center rounded-xl text-stone-500">
                No slides available.
            </div>
        );
    }

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md">

            {/***********************/}
            {/* Slides */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide) => {
                    const loaded = !loadedPhotos[slide.id];
                    return (
                    <div key={slide.id} className="relative min-w-full h-72 bg-stone-200">
                        {loaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-stone-200">
                                <PhotoIcon className="h-16 w-16 text-stone-400 animate-pulse" />
                            </div>
                        )}
                        <img
                            src={`${BASE_URL}/img/${slide.image}`}
                            alt={slide.title}
                            onLoad={() => markLoaded(slide.id)}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`}
                        />
                        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
                            <h2 className="text-white text-2xl font-bold">{slide.title}</h2>
                            <p className="text-stone-200 text-sm mt-1">{slide.subtitle}</p>
                            <NavLink
                                to={"/browse"}
                                className="mt-4 self-start bg-amber-500 hover:bg-amber-400 transition-colors text-white text-sm font-semibold rounded-full px-5 py-2"
                            >
                                Shop Now
                            </NavLink>
                        </div>
                    </div>
                    );
                })}
            </div>

            {/***********************/}
            {/* Prev / Next buttons */}
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>

            {/***********************/}
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((slide, i) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

// Fetch slides function
export async function loader(){
    const response = await fetch("http://localhost:3001/slides");
    if (!response.ok) {
        throw new Error("Failed to load slides");
    }
    return response;
}
