import classNames from "classnames"

export default function Marque({className} : {className?: string}) {
    return(
        <div className={classNames("text-highlight ml-auto transition-opacity ease-linear opacity-100", className)}>
        <div className="flex w-72 gap-1">
            <div className="block w-2 rounded-sm bg-current"></div>
            <div className="flex w-full gap-2 overflow-hidden">
                <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                </ul>
                <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                    <li className=" font-mono leading-none tracking-tight">
                        Helpston Beer Festival | Drink for charity | March 22nd |
                    </li>
                </ul>
            </div>
            <div className="block w-2 rounded-sm bg-current"></div>
        </div>
    </div>
    )
}