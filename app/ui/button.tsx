import { MouseEventHandler } from "react"

export default function Button({ children, onclick } : {
    children: React.ReactNode,
    onclick?: MouseEventHandler<HTMLButtonElement>
}
) {
    return (
        <button className={`bg-green-800 rounded cursor-pointer`} onClick={onclick}>
            {children}
        </button>
    )
}