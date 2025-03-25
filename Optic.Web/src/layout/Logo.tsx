import { useNavigate } from 'react-router-dom';
import useUserContext from '../shared/context/useUserContext';
export const Logo = () => {
    const { business, setBusiness } = useUserContext();
    const navigator = useNavigate();
    const defaultLogo = `${import.meta.env.BASE_URL}initials-logo.svg`;
    
    const handleClick = () => {
        navigator('/Business/Business');
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-4 bg-blue-50 pr-4 rounded-lg border-r-2 border-blue-200 cursor-pointer"
        >
            <div className="shrink-0">
                <img
                    src={business?.urlLogo 
                        ? `${import.meta.env.VITE_API_URL}static/logos/${business.urlLogo}` 
                        : defaultLogo}
                    alt="logo"
                    className="h-full w-full rounded-lg max-h-[64px] p-1 radius-sm"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultLogo;
                       // setBusiness({...business, urlLogo : defaultLogo})
                       console.log(defaultLogo,"logol")
                    }}
                />
            </div>
            <div className="shrink-0">
                <span>{business?.abbreviation || "Empresa"}</span>
            </div>
        </div>
    );
};

