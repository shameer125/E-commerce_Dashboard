import { useState, useMemo } from 'react';

export const useTableParams = (data, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState(null);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const processedData = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let valA = a[sortConfig.key];
                let valB = b[sortConfig.key];

                // Handle nested paths (e.g. 'customer.name')
                if (sortConfig.key.includes('.')) {
                    const keys = sortConfig.key.split('.');
                    valA = keys.reduce((obj, k) => (obj || {})[k], a);
                    valB = keys.reduce((obj, k) => (obj || {})[k], b);
                }

                if (typeof valA === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        const startIdx = (currentPage - 1) * itemsPerPage;
        return sortableItems.slice(startIdx, startIdx + itemsPerPage);
    }, [data, sortConfig, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
        currentPage,
        setCurrentPage,
        sortConfig,
        handleSort,
        processedData,
        totalPages,
        totalItems: data.length
    };
};
