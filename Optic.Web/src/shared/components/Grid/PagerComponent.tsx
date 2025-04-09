import { useRef } from 'react';
import './PagerComponent.css';

export const PagerComponent = ({
	pageCurrent,
	totalPages,
	pageSize,
	xChange,
	xChangePageSize,
	itemsCount,
	pageInit = 10,
	isVisibleChangePageSize = false,
}: {
	pageCurrent: number;
	totalPages: number;
	pageSize?: number;
	xChange?: (value: number) => void;
	xChangePageSize?: (value: number) => void;
	itemsCount?: number;
	pageInit?: number;
	isVisibleChangePageSize?: boolean;
}) => {
	const inputPage = useRef<HTMLInputElement>(null);
	const handleChangePage = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;

		if (!target.value) {
			target.value = '1';
		}

		if (!Number.isNaN(target.value) && Number.parseInt(target.value) > totalPages) {
			target.value = totalPages.toString();
		}

		if (xChange) xChange(parseInt(target.value));
	};

	const handleUpPage = () => {
		const target = inputPage.current;
		let incremento = Number.parseInt(target?.value ?? '') + 1;

		if (incremento > totalPages) {
			incremento = totalPages;
		}
		if (target)
			target.value = incremento.toString();

		if (xChange) xChange(incremento);
	};

	const handleDownPage = () => {
		const target = inputPage.current;
		let incremento = Number.parseInt(target?.value ?? '') - 1;

		if (incremento < 1) {
			incremento = 1;
		}
		if (target)
			target.value = incremento.toString();

		if (xChange) xChange(incremento);
	};

	const handleChangePageSize = (e: React.FormEvent<HTMLSelectElement>) => {
		if (xChangePageSize) {
			xChangePageSize(parseInt(e.currentTarget.value));
		}
	};

	const SelectPageSize = () => {
		const items = 5;
		const sizes: number[] = [];
		let i = 1;
		while (i <= items) {
			sizes.push(i * pageInit);
			i++;
		}

		return (
			pageInit && (
				<select
					value={pageSize}
					className="parger-input__select"
					onChange={handleChangePageSize}
				>
					{' '}
					{sizes.map((x) => {
						return (
							<option
								key={x}
								value={x}
							>
								{x}
							</option>
						);
					})}{' '}
				</select>
			)
		);
	};

	return (
		<div className="pager parger-input">
			<div className="parger-input__form">
				<span>Página actual </span>
				<div className="pager-input__page">
					<input
						id="pagerNum"
						className="pager-input__page-number"
						ref={inputPage}
						value={pageCurrent}
						onChange={(e) => {
							return handleChangePage(e);
						}}
						max={totalPages}
						min={1}
						type="number"
						title="Cambiar página actual de datos"
					/>{' '}
					<div onClick={handleUpPage}>
						<i
							className="fa fa-chevron-up pager-input__btn-up"
							title="Avanzar a la página siguiente"
						></i>
					</div>
					<div onClick={handleDownPage}>
						<i
							className="fa fa-chevron-down pager-input__btn-down"
							title="Ir a la página anterior"
						></i>
					</div>
				</div>
				<span>
					{' '}
					de <span className="pager-input__text">{totalPages}</span>
				</span>
			</div>
			{isVisibleChangePageSize &&
				<div className="parger-input__form parger-input__form--select">
					<span> Ver </span>{' '}
					<div className="parger-input__page-size">
						{' '}
						<SelectPageSize />
					</div>
					{pageInit && <span> de </span>}
					{!!itemsCount && (
						<>
							{' '}
							<span>
								{' '}
								<span className="pager-input__text">{itemsCount}</span> Items
							</span>
						</>
					)}
				</div>}
		</div>
	);
};

export default PagerComponent;
