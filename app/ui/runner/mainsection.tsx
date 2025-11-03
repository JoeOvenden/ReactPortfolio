import Collapsible from "../collapsible";

export default function MainSection({ className = "", children, gridCols = 12 } : {
  className?: string, 
  children: React.ReactNode,
  gridCols?: number }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}

export function CollapsibleMainSection({ className = "", children } : {className?: string, children: React.ReactNode }) {
  return (
    <Collapsible>
      <MainSection className={className}>
        {children}
      </MainSection>
    </Collapsible>
  )
}