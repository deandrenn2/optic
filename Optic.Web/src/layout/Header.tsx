export const Header = () => {
    return (
        <div id="header" className="h-28 bg-gray-300 flex justify-between">
            <div className="h-full flex flex-col items-center">
                <div className="shrink-0">
                    <img src="https://placehold.co/80?text=Kennedy" alt="logo" className="h-full rounded-full" />
                </div>
                <div className="shrink-0">
                    <span>Optica Kennedy</span>
                </div>
            </div>
            <div className="h-full flex flex-col items-center">
            <div className="shrink-0">
                <img src="https://placehold.co/80?text=Usuario" alt="logo" className="h-full rounded-full" />
                </div>
                <div className="shrink-0">
                <span>DEIMER NUÑEZ...</span>
            </div>
            </div>
        </div>
    )
}
