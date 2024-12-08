import { NavLink } from 'react-router-dom';

const NavVerticalItem = ({ title, description, url, fontIcon }: { title: string; description: string; url: string; fontIcon?: string }) => {
	return (
		<NavLink
			className="list-group-item vertical-nav__item"
			to={url}
		>
			<span className="h3">
				<i
					className={fontIcon}
					title="Mis actas"
				></i>{' '}
				<span className="hidden-xs">{title}</span>
			</span>
			<br />
			<small className="hidden-xs hidden-sm">{description}</small>
		</NavLink>
	);
};

export default NavVerticalItem;
