import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card ({ children, ...props}:CardProps) {
    return (
        <div
            {...props}
            className="
                rounded-lg
                border
                p-4
                shadow-sm
                bg-white
            "
        >
            {children}
        </div>
    );
}