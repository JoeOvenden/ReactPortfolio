import Section from "../ui/section";
/*
Add some white space to the left and right, so put big margins on either side? 
Have a look at facebook/youtube/reddit see waht they do
*/

export default function Page() {
  return (
    <main className='grid p-10 grid-cols-3 gap-20'>
        <Section className='col-span-2'>
          <p>Test</p>
        </Section>
        <Section className='col-span-1'>
          Test
        </Section>
    </main>
  );
}
