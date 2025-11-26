import classNames from "classnames";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function CTAButton({ children, href, reverse = false }: { children: React.ReactNode, href: string, reverse: boolean }) {

    return (
        <Link className={classNames("py-3 px-4 flex max-w-fit max-h-fit gap-2 items-center text-cta",reverse?"bg-white text-black": "bg-black text-white")}
            href={href}>
            {children}
            <ArrowRight size={18} />
        </Link>
    )
}