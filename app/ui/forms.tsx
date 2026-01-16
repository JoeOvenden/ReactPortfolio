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
    type?: undefined | "string" | "password",
    key: number
}


export type ButtonProps = {
  label?: string,
  position?: "below" | "right"
}
function FormButton(props : ButtonProps) {
  return (
    <button type="submit" className="bg-accent rounded p-3 pl-5 pr-5 transition duration-50 hover:cursor-pointer hover:opacity-80">{props.label ?? "Submit"}</button>
  )
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
      flex flex-col border-solid border-black border-1 rounded-lg p-2`}>
      <input 
        {...register(field, { required: required ?? false })}
        placeholder={placeholder ?? toTitleCase(field)} 
        type={type ?? "string"} 
        className='rounded min-h-10 min-w-80'
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

export function MyForm<T extends FieldValues>({ onSubmit, onInvalid, schema, className, fieldProps, buttonProps } : {
  onSubmit: SubmitHandler<T>,
  onInvalid: SubmitErrorHandler<T>,
  schema: ZodObject,
  className?: string,
  fieldProps: FormFieldProps<T>[],
  buttonProps?: ButtonProps
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<T>({
      resolver: zodResolver(schema as any)
    });
    const buttonPosition = buttonProps?.position ?? "below";
    if (buttonPosition == "below") className += "flex-col"
    return (
      <form 
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`${className ?? ""} flex gap-4`}
      >
        <div className="flex flex-col gap-4">
          {
            fieldProps.map(p => 
              <FormField props={p} register={register} errors={errors} key={p.key}/>
            )
          }
        </div>
        <div className={`flex items-center justify-center`}>
          <FormButton label={buttonProps?.label}/>
        </div>
    </form>
    )
}