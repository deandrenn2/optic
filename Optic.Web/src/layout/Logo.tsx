import useUserContext from '../shared/context/useUserContext'
export const Logo = () => {
    const { business } = useUserContext();

    return (
        <div className="h-full flex items-center gap-4 bg-blue-50 pr-4 rounded-lg border-r-2 border-blue-200">
            <div className="shrink-0">
                <img
                    src={`${import.meta.env.BASE_URL}initials-logo.svg`}
                    alt="logo"
                    className="h-full w-16 rounded-lg"
                />
            </div>
            <div className="shrink-0">
                <span>{business?.abbreviation}</span>
            </div>
        </div>
    )
}
