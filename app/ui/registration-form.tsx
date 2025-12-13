'use client';
 
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toTitleCase } from '@/app/lib/utility'
import { registerUser } from '../lib/users';
import { RegisterUserInputs, registerUserSchema } from '../lib/definitions/User';

function FormField({ field, errors, register, placeholder, required, type } :
  {
    field: keyof RegisterUserInputs,
    errors: FieldErrors<RegisterUserInputs>,
    register: UseFormRegister<RegisterUserInputs>,
    placeholder?: string,
    required?: boolean,
    type?: undefined | "string" | "password"
  }
) {
  const errorMessage = errors[field]?.message ?? "";

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
 
export default function RegistrationForm({ className } : {
  className?: string
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUserInputs>({
    resolver: zodResolver(registerUserSchema)
  });
  const onSubmit : SubmitHandler<RegisterUserInputs> = (data) => {
    registerUser(data);
  }
  const onInvalid : SubmitErrorHandler<RegisterUserInputs> = (errors) => {
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
      <input type="submit" />
    </form>
  );
}