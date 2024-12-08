import { ButtonModel, NavVerticalItemModel } from './Model';
import NavVerticalItem from './NavVerticalItem';

const NavVertical = ({
	title,
	items,
	children,
	buttonFooter,
}: {
	title: string;
	items?: NavVerticalItemModel[];
	children?: JSX.Element;
	buttonFooter?: ButtonModel;
}) => {
	const handleGuardar = () => {
		if (buttonFooter?.actionClick) {
			buttonFooter.actionClick();
		}
	};

	return (
		<div className="box box-primary">
			<div className="box-header with-border">
				<h3 className="box-title">{title}</h3>
			</div>
			<div className="box-body p-none">
				<div className="list-group mb-0 vertical-nav">
					{items?.map((x) => {
						return (
							<NavVerticalItem
								key={x.id}
								description={x.description}
								title={x.name}
								url={x.url}
								fontIcon={x.fontIcon}
							/>
						);
					})}
					{children ?? null}
				</div>
			</div>
			{buttonFooter && (
				<div className="box-footer">
					<a
						onClick={handleGuardar}
						className={`${buttonFooter.className || 'btn btn-success'} pull-right`}
					>
						{buttonFooter?.fontIcon || ''} {buttonFooter.name}
					</a>
				</div>
			)}
		</div>
	);
};

export default NavVertical;
