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

    return (
        <section className="relative z-50">      {/* Existing background div — you can adjust its usage if needed */}
            <div
                className={classNames(
                    "size-full bg-highlight z-50 transition-opacity duration-100",
                    navigationOpen ? "opacity-0" : "opacity-100"
                )}
            ></div>
            {/* Scroll animation -translate-y-28 lg:-translate-y-32 */}
            <div className="fixed left-0 top-0 z-50 w-full transition-all duration-500 pointer-events-auto opacity-1">
                <header className="w-full p-6">
                    <div className="flex items-center justify-start gap-2 lg:gap-5">
                        <Link href={"/"}>
                            <div className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-in-out-circ text-text-stone-900 bg-highlight hover:text-hightlight  hover:bg-highlight ">
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

                        <button
                            className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-in-out-circ text-highlight hover:text-stone-900 hover:bg-highlight"
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 8"
                                className="inline-block h-[8px] w-[20px]"
                            >
                                <rect width="19.543" height="2" fill="currentColor" rx="1"></rect>
                                <rect
                                    width="19.543"
                                    height="2"
                                    y="6"
                                    fill="currentColor"
                                    rx="1"
                                ></rect>
                            </svg>

                            <span className="sr-only">Open Navigation</span>
                        </button>
                        {/* Marquee */}
                        <Marque className="text-black"/>
                    </div>
                </header>
            </div>

            {/* Full-Screen Nav Overlay (appears when navigationOpen = true) */}
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
                    <div className=" font-light text-sm">
                        {time}
                    </div>
                    <Link href={"https://www.facebook.com/share/1LRhsQG7V3/"}>
                        <Facebook width={32} />
                    </Link>
                </div>


                <nav className="space-y-6 flex flex-col group w-1/2 h-full justify-center px-2 border-r border-black [&>*]:before:content sm:text-3x">
                    <Link
                        href="/"
                        className="nav-link uppercase text-3xl sm:text-5xl group-hover:opacity-50 hover:!opacity-100"
                        onClick={() => setNavigationOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/charities"
                        className="nav-link uppercase text-3xl sm:text-5xl group-hover:opacity-50 hover:!opacity-100"
                        onClick={() => setNavigationOpen(false)}
                    >
                        Charities
                    </Link>
                    <Link
                        href="/food-and-drink"
                        className="nav-link uppercase text-3xl sm:text-5xl group-hover:opacity-50 hover:!opacity-100"
                        onClick={() => setNavigationOpen(false)}
                    >
                        Food and Drink
                    </Link>
                    <Link
                        href="/getting-here"
                        className="nav-link uppercase text-3xl sm:text-5xl group-hover:opacity-50 hover:!opacity-100"
                        onClick={() => setNavigationOpen(false)}
                    >
                        Location
                    </Link>
                    <Link
                        href="/sponsors"
                        className="nav-link uppercase text-3xl sm:text-5xl group-hover:opacity-50 hover:!opacity-100"
                        onClick={() => setNavigationOpen(false)}
                    >
                        Sponsors
                    </Link>
                </nav>
            </div>
        </section>
    )
}