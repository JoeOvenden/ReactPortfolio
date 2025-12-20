import { faker } from '@faker-js/faker';
import { UserCreationDTO } from './definitions/User';
import { createPasswordSaveData, getAvatarComponentsInfo } from './users';
import { AvatarComponentsId } from '@/schemas/public/AvatarComponents';
import { sql } from './base';

export async function seedUsers() {
    const { array } = await getAvatarComponentsInfo();
    const eyesIds = array.filter(x => x.type === 'eyes').map(x => x.id);
    const mouthIds = array.filter(x => x.type === 'mouth').map(x => x.id);
    const count = 200;
    const users : UserCreationDTO[] = [];
    for(let i = 0; i < count; i++) {
        users.push({
            name: `${faker.person.firstName()} ${faker.person.lastName()}`,
            email: faker.internet.email(),
            password: await createPasswordSaveData(faker.internet.password()),
            phone_number: faker.phone.number({ style: "international" }),
            date_of_birth: faker.date.birthdate(),
            avatar_colour: faker.color.rgb().replace("#", ""),
            avatar_eyes: faker.helpers.arrayElement(eyesIds) as AvatarComponentsId,
            avatar_mouth: faker.helpers.arrayElement(mouthIds) as AvatarComponentsId
        })
    }
    console.log(users);
    createUsers(users);
}

async function createUsers(users: UserCreationDTO[]) {
    try {
        await sql`INSERT INTO users ${sql(users)};`;
    } catch (err) {
        console.log(`There was an error: ${err}`);
    }
}