export default function MainSection({ className = "", children } : {className?: string, children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 p-16">
      <section className='col-start-3 col-span-8'>
        {children}
      </section>
    </div>
  );
}