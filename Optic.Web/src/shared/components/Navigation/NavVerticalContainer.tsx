import { ButtonModel, NavVerticalItemModel } from './Model';
import NavVertical from './NavVertical';

export const NavVerticalContainer = ({
	fixed,
	sizeCol = '3',
	title,
	items,
	children,
	buttonFooter,
}: {
	fixed?: boolean;
	sizeCol?: string;
	title: string;
	items?: NavVerticalItemModel[];
	children?: JSX.Element;
	buttonFooter?: ButtonModel | undefined;
}) => {
	return (
		<>
			<div className={`col-md-${sizeCol} mr-5 ${fixed ? 'nav-fixed' : ''}`}>
				<NavVertical
					title={title}
					children={children}
					buttonFooter={buttonFooter}
					items={items}
				/>
			</div>

			{fixed && <div className={`col-md-${sizeCol} pr-5 hidden-xs hidden-sm`}></div>}
		</>
	);
};
