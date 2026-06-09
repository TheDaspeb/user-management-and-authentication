import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({... props}: InputProps) {
    return (
        <input
            {...props}
            className="
            w-full
            border
            rounded-md
            px-3
            py-2
            outline-none"
        />
    );
}