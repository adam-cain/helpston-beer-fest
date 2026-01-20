/**
 * ============================================================================
 * NAVIGATION BAR COMPONENT
 * ============================================================================
 * 
 * Full-screen navigation overlay with animated hamburger menu.
 */

"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import classNames from "classnames"
import { Facebook } from 'lucide-react';
import Marque from "./Marque"

export default function NavBar() {
    const [navigationOpen, setNavigationOpen] = useState(false)
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            setTime(currentTime.toLocaleTimeString());
        };

        // Update time immediately
        updateTime();

        // Set up an interval to update the time every second
        const intervalId = setInterval(updateTime, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Navigation links configuration
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/charities", label: "Charities" },
        { href: "/food-and-drink", label: "Food and Drink" },
        { href: "/getting-here", label: "Getting Here" },
        { href: "/sponsors", label: "Sponsors" },
        { href: "/sponsorship", label: "Become a Sponsor" },
        { href: "/gallery", label: "Gallery" },
        { href: "/impact", label: "Our Impact" },
    ];

    return (
        <section className="relative z-50">
            {/* Background overlay */}
            <div
                className={classNames(
                    "size-full bg-highlight z-50 transition-opacity duration-100",
                    navigationOpen ? "opacity-0" : "opacity-100"
                )}
            ></div>
            
            {/* Fixed header */}
            <div className="fixed left-0 top-0 z-50 w-full transition-all duration-500 pointer-events-auto opacity-1">
                <header className="w-full p-3 sm:p-6">
                    <div className="flex items-center justify-start gap-2 lg:gap-5">
                        {/* Logo */}
                        <Link href={"/"}>
                            <div className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-in-out-circ text-text-stone-900 bg-highlight hover:text-hightlight hover:bg-highlight">
                                <span className="pointer-events-none absolute -left-1/2 -top-1/2 -z-10 block h-full w-full -translate-x-full -translate-y-full rounded-full duration-200 ease-in-out-circ bg-dark"></span>
                                <span className="pointer-events-none absolute inset-[0.5px] -z-20 block rounded-full bg-highlight"></span>
                                <Image
                                    width={40}
                                    height={40}
                                    src={"/logo/logo1.svg"}
                                    alt={"Logo"}
                                />
                                <span className="sr-only">Home</span>
                            </div>
                        </Link>

                        {/* Hamburger button */}
                        <button
                            className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-in-out-circ text-highlight hover:bg-highlight"
                            type="button"
                            onClick={() => setNavigationOpen(!navigationOpen)}
                        >
                            <span
                                className="pointer-events-none absolute -left-1/2 -top-1/2 -z-10 block h-full w-full -translate-x-full -translate-y-full rounded-full bg-highlight duration-200 ease-in-out-circ"
                                style={{
                                    transform: "translate3d(72.5102px, 49.2551px, 0px)",
                                }}
                            />
                            <span className="pointer-events-none absolute inset-[0.5px] -z-20 block rounded-full bg-stone-900"></span>
                            <div className="w-[20px] h-[16px] relative -translate-x-2.5">
                                <span 
                                    className={`absolute w-full h-[2px] bg-current rounded-full transition-all duration-300 ${
                                        navigationOpen ? "top-[7px] rotate-45" : "top-0"
                                    }`}
                                ></span>
                                <span 
                                    className={`absolute w-full h-[2px] bg-current rounded-full transition-all duration-300 ${
                                        navigationOpen ? "opacity-0" : "top-[7px] opacity-100"
                                    }`}
                                ></span>
                                <span 
                                    className={`absolute w-full h-[2px] bg-current rounded-full transition-all duration-300 ${
                                        navigationOpen ? "bottom-[7px] -rotate-45" : "bottom-0"
                                    }`}
                                ></span>
                            </div>
                            <span className="sr-only">{navigationOpen ? "Close" : "Open"} Navigation</span>
                        </button>
                        
                        {/* Marquee */}
                        <Marque className="text-black"/>
                    </div>
                </header>
            </div>

            {/* Full-Screen Nav Overlay */}
            <div
                className={classNames(
                    "fixed inset-0 z-10 flex flex-col justify-center bg-highlight text-stone-900 transition-opacity duration-300 ease-in-out",
                    {
                        "opacity-100 pointer-events-auto": navigationOpen,
                        "opacity-0 pointer-events-none": !navigationOpen,
                    }
                )}
            >
                {/* Nav Footer */}
                <div className="absolute w-full bottom-0 p-6 justify-between flex flex-row">
                    <div className="font-light text-sm">
                        {time}
                    </div>
                    <Link href={"https://www.facebook.com/share/1LRhsQG7V3/"}>
                        <Facebook width={32} />
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4 flex flex-col group w-full md:w-1/2 h-full justify-center px-4 md:px-2 md:border-r md:border-black overflow-y-auto py-20">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="nav-link uppercase text-2xl sm:text-4xl md:text-5xl group-hover:opacity-50 hover:!opacity-100 transition-opacity"
                            onClick={() => setNavigationOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    )
}
