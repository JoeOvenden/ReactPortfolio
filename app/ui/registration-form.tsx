'use client';
 
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { registerUser } from '../lib/users';
import { RegisterUserInputs, registerUserSchema } from '../lib/definitions/User';
import { FormFieldProps, MyForm } from './forms';

export  function RegistrationForm({ className } : {
  className?: string
}) {
      const fieldProps : FormFieldProps<RegisterUserInputs>[] = [
          { 
              field: "username",
              placeholder: "Username",
              required: true,
              type: "string",
              key: 1
          },
          { 
              field: "email",
              placeholder: "Email",
              required: true,
              type: "string",
              key: 2
          },
          { 
              field: "password",
              placeholder: "Password",
              required: true,
              type: "password",
              key: 3
          },
          { 
              field: "confirm",
              placeholder: "Confirm",
              required: true,
              type: "password",
              key: 4
          },
      ];
      const onSubmit : SubmitHandler<RegisterUserInputs> = (data) => {
        registerUser(data);
      }
      const onInvalid : SubmitErrorHandler<RegisterUserInputs> = (data) => console.log("Invalid", data);
      return (
          <MyForm 
              fieldProps={fieldProps}
              onSubmit={onSubmit}
              onInvalid={onInvalid}
              schema={registerUserSchema}
              className={className}
          />
      ) 
}