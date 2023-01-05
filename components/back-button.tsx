import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineArrowLeft } from 'react-icons/ai';

type PropTypes = {
    link: string
}

const BackButton = ({link}: PropTypes) => {
	return (
		<div style={{ padding: '10px 0px' }}>
			<Link href={link}>
				<Button>
					<AiOutlineArrowLeft/>
				</Button>
			</Link>
		</div>
	);
};

export default BackButton;