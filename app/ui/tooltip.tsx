import { Arrow, Content, Portal, Provider, Root, Tooltip, Trigger } from "@radix-ui/react-tooltip";
import React from "react";

export default ({ children, label } : { children: React.ReactNode, label: string}) => (
	<Provider>
		<Root>
			<Trigger asChild>
                {children}
            </Trigger>
			<Portal>
				<Content className="TooltipContent" sideOffset={5}>
                    {label}
					<Arrow className="TooltipArrow" />
				</Content>
			</Portal>
		</Root>
	</Provider>
);
