'use client';
 
import { useState } from 'react';
import { FieldErrors, FormStateSubscribe, SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toTitleCase } from '@/app/lib/utility'

type Inputs = {
  username: string,
  email: string,
  password: string,
  confirm: string
};

const schema = z.object({
  username: z.string().min(1, { message: "Required"}).max(15, { message: "Username can be at most 15 characters"}),
  email: z.email(),
  password: z.string().min(4, { message: "Password must be at least 4 characters long"}),
  confirm: z.string()
})
.refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"]
});

function FormField({ field, errors, register, placeholder, required, type } :
  {
    field: keyof Inputs,
    errors: FieldErrors<Inputs>,
    register: UseFormRegister<Inputs>,
    placeholder?: string,
    required?: boolean,
    type?: undefined | "string" | "password"
  }
) {
  return (
    <div className={`flex flex-col border-solid border-black border-1 rounded p-2`}>
      <input {...register(field, { required: required ?? false })} placeholder={placeholder ?? toTitleCase(field)} type={type ?? "string"} />
      <p className='min-h-6'>
        {errors[field]?.message ?? ""}
      </p>
    </div>
  )
}
 
export default function RegistrationForm({ className } : {
  className?: string
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(schema)
  });
  const [data, setData] = useState("");
  const onSubmit : SubmitHandler<Inputs> = (data) => {
    setData(JSON.stringify(data));
    console.log(data);
  }
  const onInvalid : SubmitErrorHandler<Inputs> = (errors) => {
    console.log(errors);
  }
  return (
    <form 
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className={`${className ?? ""} flex flex-col gap-4`}
      >
        <FormField errors={errors} register={register} required={true} field='username'/>
        <FormField errors={errors} register={register} required={true} field='email'/>
        <FormField errors={errors} register={register} required={true} field='password' type='password'/>
        <FormField errors={errors} register={register} required={true} field='confirm' type='password'/>
      <p>{data}</p>
      <input type="submit" />
    </form>
  );
}