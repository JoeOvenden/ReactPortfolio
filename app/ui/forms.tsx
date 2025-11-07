export function EditableTextarea({ children, label } : { children: React.ReactNode, label: string}) {
    return (
        <div className="inline-flex flex-col border-2 rounded text-(--color1)">
            <div className="pl-2 pt-0.5 pb-0.5 font-bold border-b-2">
                {label}
            </div>
            <textarea className={`border-transparent focus:shadow-none focus:border-transparent focus:outline-0`}>
                {children}
            </textarea>
        </div>
    )
}