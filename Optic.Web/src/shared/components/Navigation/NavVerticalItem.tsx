import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const NavVerticalItem = ({ title, description, url, fontIcon }: { title: string; description: string; url: string; fontIcon?: IconDefinition }) => {
	return (
		<NavLink
			className="relative flex gap-2 items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
			to={url}
		>
			{fontIcon && (
				<FontAwesomeIcon
					icon={fontIcon}
					className="w-5 h-5"
				/>)}

			<div className="hidden-xs">
				<span>{title}</span>
				<p className="text-xs text-gray-500">{description}</p>
			</div>
			<br />

		</NavLink>
	);
};

export default NavVerticalItem;
