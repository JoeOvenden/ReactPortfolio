"use client";

import { FormFieldProps, MyForm } from "@/app/ui/forms";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import z from "zod";

const schema = z.object({
  username: z.string()
});
type FormInputType = z.infer<typeof schema>;

export function SearchParametersBox ({ className } : {
    className?: string
}) {
    const fieldProps : FormFieldProps<FormInputType>[] = [
        { 
            field: "username",
            placeholder: "Username"
        }
    ];
    const onSubmit : SubmitHandler<FormInputType> = (data) => console.log("Legit", data);
    const onInvalid : SubmitErrorHandler<FormInputType> = (data) => console.log("Invalid", data);
    return (
        <MyForm 
            fieldProps={fieldProps}
            onSubmit={onSubmit}
            onInvalid={onInvalid}
            schema={schema}
            className={className}
        />
    )
}