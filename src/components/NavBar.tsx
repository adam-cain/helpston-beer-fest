import Image from "next/image"
import Link from "next/link"

export default function NavBar() {
    return (
        <div className="relative z-50">
            {/* Scroll animation -translate-y-28 lg:-translate-y-32
 */}
            <div className="fixed left-0 top-0 z-50 w-full transition-all duration-500 pointer-events-auto opacity-1 
            ">
                <header className="w-full p-6">
                    <div className="flex items-center justify-start gap-2 lg:gap-5">
                        <Link href={"/"}>
                            <div className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-inOutCirc text-text-stone-900 bg-highlight hover:text-hightlight hover:color-black hover:text-highlight focus:text-highlight">
                                <span className="pointer-events-none absolute -left-1/2 -top-1/2 -z-10 block h-full w-full -translate-x-full -translate-y-full rounded-full duration-200 ease-inOutCirc bg-dark"></span>
                                <span className="pointer-events-none absolute inset-[0.5px] -z-20 block rounded-full bg-highlight"></span>
                                <Image width={40} height={40} src={"/logo/logo1.svg"} alt={"Logo"} />
                                <span className="sr-only">Home</span>
                            </div>
                        </Link>

                        <button className="outline-none relative z-0 flex h-[52px] w-[52px] shrink-0 select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full no-underline transition-all duration-200 ease-inOutCirc text-highlight hover:text-stone-900 hover:bg-highlight" type="button">
                            <span className="pointer-events-none absolute -left-1/2 -top-1/2 -z-10 block h-full w-full -translate-x-full -translate-y-full rounded-full bg-highlight duration-200 ease-in-out-circ"
                                style={{
                                    transform: "translate3d(72.5102px, 49.2551px, 0px)"
                                }}
                            />
                            <span className="pointer-events-none absolute inset-[0.5px] -z-20 block rounded-full bg-stone-900"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 8" className="inline-block h-[8px] w-[20px]"><rect width="19.543" height="2" fill="currentColor" rx="1"></rect><rect width="19.543" height="2" y="6" fill="currentColor" rx="1"></rect></svg>

                            <span className="sr-only">Open Navigation</span>
                        </button>


                        <div className="text-highlight ml-auto transition-opacity ease-linear opacity-100">
                            <div className="flex w-72 gap-1">
                                <div className="block w-2 rounded-sm bg-current"></div>
                                <div className="flex w-full gap-2 overflow-hidden">
                                    <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                    </ul>
                                    <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                        <li className="text-14 font-mono leading-none tracking-tight">
                                            Helpston Beer Festival | Drink for charity | Cheers! |
                                        </li>
                                    </ul>
                                </div>
                                <div className="block w-2 rounded-sm bg-current">
                                </div>
                            </div>
                        </div>
                    </div>

                </header>

            </div>
        </div>
    )
}