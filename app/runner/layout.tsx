import Nav from '../ui/runner/nav';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="">{children}</div>
    </div>
  );
}