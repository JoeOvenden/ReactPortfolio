import { UserList } from "@/app/ui/runner/users";
import Section from "@/app/ui/section";
import { SearchParametersBox } from "./user-search-box";

export type UserSearchParams = {
    username: string | undefined
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<UserSearchParams>
}) {
    return (
        <Section className="flex-col items-center">
            <SearchParametersBox className="" />
            <UserList searchParams={searchParams} className="p-6"/>
        </Section>
    )
}