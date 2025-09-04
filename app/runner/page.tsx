// import AcmeLogo from '@/app/ui/acme-logo';
// import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Lusitana } from 'next/font/google';
// import { lusitana } from './ui/fonts';
import Image from 'next/image';
import Section from '../ui/runner/mainsection';
import MainSection from '../ui/runner/mainsection';

export default function Page() {
  return (
    <main className='grid p-10 grid-cols-3 gap-20'>
        <MainSection className='col-span-2'>
          <p>Test</p>
        </MainSection>
        <MainSection className='col-span-1'>
          Test
        </MainSection>
    </main>
  );
}
