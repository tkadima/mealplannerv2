import React from 'react';
import Alert  from 'react-bootstrap/Alert';

type PropTypes = {
    errorMessage: string
}
const ErrorAlert = ({errorMessage}: PropTypes) => {
	return (
		<Alert variant="danger">
			{errorMessage}
		</Alert>
	);
};

export default ErrorAlert;