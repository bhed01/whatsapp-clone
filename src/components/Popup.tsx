import React, { FC } from 'react';

interface Props {
	heading: string;
	content?: string | JSX.Element;
	btns?: JSX.Element;
	onBgClick?: () => void;
}

const Popup: FC<Props> = ({ heading, content, btns, onBgClick }) => {
	const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if ((e.target as HTMLDivElement).id === 'popup' && onBgClick) onBgClick();
	};

	return (
		<div id="popup" className="popup" onClick={onClick}>
			<div className="popup__body">
				<h1 className="popup__heading">{heading}</h1>
				<div className="popup__content">{content}</div>
				<div className="popup__btns">{btns}</div>
			</div>
		</div>
	);
};

export default Popup;
