"use client";

import { FieldErrors, FieldValues, Path, SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { RegisterUserInputs } from "../lib/definitions/User";
import z, { ZodObject } from "zod";
import { toTitleCase } from "../lib/utility";
import { zodResolver } from "@hookform/resolvers/zod";

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

export type FormFieldProps<T extends FieldValues> = {
    field: Path<T>,
    placeholder?: string,
    required?: boolean,
    type?: undefined | "string" | "password"
}

function FormField<T extends FieldValues>({ props, register, errors }: 
  { 
    props: FormFieldProps<T>,
    register: UseFormRegister<T>,
    errors: FieldErrors<T>
  })
{
  const { field, placeholder, required, type } = props;
  const errorMessage = (errors[field]?.message ?? "") as string;

  return (
    <div className={`
      ${errorMessage == "" ? "" : "border-red-600"}
      flex flex-col border-solid border-black border-1 rounded p-2`}>
      <input 
        {...register(field, { required: required ?? false })}
        placeholder={placeholder ?? toTitleCase(field)} 
        type={type ?? "string"} 
        className='rounded'
      />
      <p className={`${errorMessage == "" 
        ? "max-h-0 scale-0" 
        : "max-h-[100px] scale-100"} 
          overflow-y-hidden [transition:max-height_2s,scale_500ms] ease-in-out`}>
        {errorMessage}
      </p>
    </div>
  )
}

export function MyForm<T extends FieldValues>({ onSubmit, onInvalid, schema, className, fieldProps } : {
  onSubmit: SubmitHandler<T>,
  onInvalid: SubmitErrorHandler<T>,
  schema: ZodObject,
  className?: string,
  fieldProps: FormFieldProps<T>[]
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<T>({
      resolver: zodResolver(schema as any)
    });
    return (
      <form 
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={`${className ?? ""} flex flex-col gap-4`}
      >
        {
          fieldProps.map(p => 
            <FormField props={p} register={register} errors={errors}/>
          )
        }
      <input type="submit" />
    </form>
    )
}