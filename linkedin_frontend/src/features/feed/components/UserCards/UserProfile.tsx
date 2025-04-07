import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { CardBox } from "../CardBox/CardBox";

export function UserProfile(){
    const { user } = useAuthentication();
    let cover = user.cover ? user.cover : "/default-cover.png";
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";
    let nm = user.lastName + user.firstName;
    let company_position = user.company + user.position;
    let location = user.location;
    let company = user.company;

    return (
        <CardBox>
            <img src={cover} className="absolute top-0 start-0 z-10 w-full h-14 object-cover rounded-t-lg"/>
            <img src={avatar} className="size-16 z-20 rounded-full"/>
            <div className="flex flex-col">
                <span className="font-bold text-2xl">{nm}</span>
                <span className="text-gray-800">{company_position}</span>
                <span className="text-gray-600 text-sm">{location}</span>
            </div>
        </CardBox>
    );
}
