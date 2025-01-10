import { ReactNode } from "react";

export default function Container({children}:{children: ReactNode}) {
    return(
        <div className="size-full">
            <div className="mx-auto container size-full min-h-screen">
                {children}
            </div>
        </div>
    )
}