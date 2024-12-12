import { useState } from 'react';
import useUserContext from '../shared/context/useUserContext'
import { Profile } from './Profile';

export const Avatar = () => {
    const { user } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className="h-full flex items-center gap-4 bg-blue-50 pl-4 rounded-lg border-l-2 border-blue-200 cursor-pointer">
                <div className="shrink-0">
                    <span>{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="shrink-0">
                    <img
                        src={`${import.meta.env.BASE_URL}images/avatars/bigSmile-${user?.idAvatar}.svg`}
                        alt="logo"
                        className="min-w-16 rounded-lg"
                    />
                </div>
            </div>
            {isOpen && <Profile setIsOpen={setIsOpen} />}
        </>
    )
}
