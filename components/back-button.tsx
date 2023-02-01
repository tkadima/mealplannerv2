import Link from 'next/link';
import React from 'react';
import Button  from 'react-bootstrap/Button';
import { AiOutlineArrowLeft } from 'react-icons/ai';

type PropTypes = {
    link: string
}

const BackButton = ({link}: PropTypes) => {
	return (
		<div className='back-button'>
			<Link href={link}>
				<Button variant='outline-primary'>
					<AiOutlineArrowLeft/>
				</Button>
			</Link>
		</div>
	);
};

export default BackButton;