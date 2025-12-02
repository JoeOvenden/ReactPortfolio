'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from './base';
import { getUserByEmail } from './users';
import { User, UserBasicDTO } from './definitions/User';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  console.log(formData);
  try {

  } catch (error) {
    return "There was an error.";
  }
}