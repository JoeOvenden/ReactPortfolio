'use server';

import { auth } from '@/auth';
import fs from 'fs';
import path from 'path';


export async function IsAdmin() {
    const session = await auth();
}

export async function CreateAvatarComponenets() {
    const session = await auth();
    console.log(session);
}

