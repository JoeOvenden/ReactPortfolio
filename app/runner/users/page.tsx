import { getUsers } from "@/app/lib/users";
import { UserList } from "@/app/ui/runner/users";
import Section from "@/app/ui/section";
import { SearchParametersBox } from "./user-search-box";

export default async function Page() {
    const response = await getUsers({
        searchString: "",
        page: 1
    });

    const { users, userCount, pages } = response;
    return (
        <Section className="flex-col items-center">
            <SearchParametersBox className="" />
            <UserList users={users} className="p-6"/>
        </Section>
    )
}