import useUserContext from '../shared/context/useUserContext'
export const Logo = () => {
    const { business } = useUserContext();

    return (
        <div className="h-full flex flex-col items-center">
            <div className="shrink-0">
                <img
                    src={`${import.meta.env.BASE_URL}initials-logo.svg`}
                    alt="logo"
                    className="h-full w-20 rounded-full"
                />
            </div>
            <div className="shrink-0">
                <span>{business?.abbreviation}</span>
            </div>
        </div>
    )
}
