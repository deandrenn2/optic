import useUserContext from '../shared/context/useUserContext'

export const Avatar = () => {
    const { user } = useUserContext();
    return (
        <div className="h-full flex flex-col items-center">
            <div className="shrink-0">
                <img
                    src={`${import.meta.env.BASE_URL}images/avatars/bigSmile-${user?.idAvatar}.svg`}
                    alt="logo"
                    className="min-w-20 rounded-lg"
                />
            </div>
            <div className="shrink-0">
                <span>{user?.firstName}</span>
            </div>
        </div>
    )
}
