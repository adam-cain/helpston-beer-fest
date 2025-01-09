import {ArrowRight} from "lucide-react";
import Link from "next/link";

export default function CTAButton({ children, href }: { children: React.ReactNode, href: string }) {

    return (
        <Link className="bg-black text-white py-3 px-4 flex max-w-fit max-h-fit gap-2 items-center"
            href={href}>
            {children}
            <ArrowRight size={18} />
        </Link>
    )
}