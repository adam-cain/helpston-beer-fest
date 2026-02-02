import classNames from "classnames"

export default function Marque({className} : {className?: string}) {
    return(
        <div className={classNames("text-highlight ml-auto transition-opacity ease-linear opacity-100", className)}>
        <div className="flex w-72 gap-1">
            <div className="block w-2 rounded-sm bg-current"></div>
            <div className="flex w-full gap-2 overflow-hidden">
                <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                </ul>
                <ul className="animate-marquee flex min-w-full shrink-0 items-baseline justify-around gap-2 text-current">
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                    <li className="font-light leading-none tracking-wide-caps text-xs">
                        Helpston Beer Festival | Drink for charity | March 21st |
                    </li>
                </ul>
            </div>
            <div className="block w-2 rounded-sm bg-current"></div>
        </div>
    </div>
    )
}