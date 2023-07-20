import React from 'react';

export type DataTableHeadProps = {
	children: React.ReactNode;
};

const DataTableHead: React.FC<DataTableHeadProps> = ({ children }) => {
	return <thead>{children}</thead>;
};

export default DataTableHead;
