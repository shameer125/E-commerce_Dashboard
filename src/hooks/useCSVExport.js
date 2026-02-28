import { useCallback } from 'react';

export const useCSVExport = () => {
    const exportToCSV = useCallback((data, filename, headers) => {
        if (!data || !data.length) return;

        // Create CSV header row
        const csvRows = [];
        if (headers) {
            csvRows.push(headers.join(','));
        } else {
            // Auto-generate headers based on first object keys if not provided
            csvRows.push(Object.keys(data[0]).join(','));
        }

        // Create data rows
        for (const row of data) {
            const values = Object.values(row).map(value => {
                // Handle nested objects by stringifying them so they don't break CSV format
                // Alternatively, specific formatters can be passed in.
                if (typeof value === 'object' && value !== null) {
                    return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                }
                const stringValue = String(value);
                // Escape quotes and wrap in quotes if there's a comma
                const escapedValue = stringValue.replace(/"/g, '""');
                return stringValue.includes(',') ? `"${escapedValue}"` : stringValue;
            });
            csvRows.push(values.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return { exportToCSV };
};
