import { Direction, Size } from "./Models";
import { useEffect } from "react";
import './OffCanvas.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type ButtonFooterOffCanvas = {
	fontIcon: string;
	textButton: string;
	className: string;
};

function OffCanvas({
	position,
	visible,
	children,
	titlePrincipal,
	titleFooter,
	headerFontIcon,
	xAction,
	xClose,
	isEnabledFooter,
	buttonFooter,
	size
}: {
	position: Direction;
	visible: boolean;
	children: string | JSX.Element | JSX.Element[];
	titlePrincipal?: string;
	titleFooter?: string;
	headerFontIcon?: string;
	xAction?: () => void;
	xClose?: () => void;
	isEnabledFooter?: boolean;
	buttonFooter?: ButtonFooterOffCanvas;
	size?: Size;
}) {
	const handleAction = () => {
		if (xAction) {
			xAction();
		}
	};

	const handleClose = () => {
		if (xClose) {
			xClose();
		}
	};

	useEffect(() => {
		const body = document.querySelector("body");
		if (body) {
			if (visible) {
				body.style.overflowY = "hidden";
			} else {
				body.style.overflowY = "auto";
			}
		}
	}, [visible]);

	if (visible && position === Direction.Right)
		return (
			<>
				<div className={`offcanvas-backdrop show `} onClick={handleClose}></div>
				<div
					className={`offcanvas offcanvas--right offcanvas--${size || "sm"}`}

				>
					<div className="offcanvas-header">
						<div className="offcanvas-title">
							<i className={headerFontIcon || `fa fa-cog`}></i>{" "}
							{titlePrincipal || "Opciones"}
						</div>
						<a href={undefined} onClick={handleClose} className="bg-gray-400 px-3 py-2 border-red-400 border-solid text-white cursor-pointer">
							<FontAwesomeIcon icon={faTimes} />
						</a>
					</div>

					<div className="offcanvas-body">{children}</div>

					{isEnabledFooter && (
						<div className="offcanvas-footer">
							{titleFooter && (
								<div className="offcanvas-title">{titleFooter}</div>
							)}
							{buttonFooter && (
								<a
									href={undefined}
									className={buttonFooter.className}
									onClick={handleAction}
								>
									<i className={buttonFooter.fontIcon}></i>{" "}
									{buttonFooter.textButton}
								</a>
							)}
						</div>
					)}
				</div>
			</>
		);
}

export default OffCanvas;
