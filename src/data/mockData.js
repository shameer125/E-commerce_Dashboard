export const mockCustomers = [
    {
        id: 'CUST-001',
        name: 'Eleanor Pena',
        email: 'eleanor.pena@example.com',
        avatar: 'https://i.pravatar.cc/150?u=eleanor',
        totalOrders: 14,
        totalSpent: 4250.50,
        status: 'Active',
        joinDate: '2023-08-12'
    },
    {
        id: 'CUST-002',
        name: 'Wade Warren',
        email: 'wade.warren@example.com',
        avatar: 'https://i.pravatar.cc/150?u=wade',
        totalOrders: 3,
        totalSpent: 850.00,
        status: 'Inactive',
        joinDate: '2023-11-24'
    },
    {
        id: 'CUST-003',
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        avatar: 'https://i.pravatar.cc/150?u=esther',
        totalOrders: 31,
        totalSpent: 12400.75,
        status: 'Active',
        joinDate: '2022-04-05'
    },
    {
        id: 'CUST-004',
        name: 'Cameron Williamson',
        email: 'cameron.williamson@example.com',
        avatar: 'https://i.pravatar.cc/150?u=cameron',
        totalOrders: 8,
        totalSpent: 2150.25,
        status: 'Active',
        joinDate: '2024-01-15'
    },
    {
        id: 'CUST-005',
        name: 'Brooklyn Simmons',
        email: 'brooklyn.simmons@example.com',
        avatar: 'https://i.pravatar.cc/150?u=brooklyn',
        totalOrders: 1,
        totalSpent: 120.00,
        status: 'Active',
        joinDate: '2024-02-28'
    }
];

export const mockOrders = [
    {
        id: 'ORD-89432',
        customer: mockCustomers[0],
        date: '2024-02-28T10:24:00Z',
        items: 3,
        total: 849.50,
        status: 'Processing',
        paymentMethod: 'Credit Card'
    },
    {
        id: 'ORD-89431',
        customer: mockCustomers[2],
        date: '2024-02-27T14:15:00Z',
        items: 1,
        total: 2498.00,
        status: 'Delivered',
        paymentMethod: 'PayPal'
    },
    {
        id: 'ORD-89430',
        customer: mockCustomers[3],
        date: '2024-02-27T09:30:00Z',
        items: 5,
        total: 154.25,
        status: 'Shipped',
        paymentMethod: 'Apple Pay'
    },
    {
        id: 'ORD-89429',
        customer: mockCustomers[1],
        date: '2024-02-26T18:45:00Z',
        items: 2,
        total: 320.00,
        status: 'Cancelled',
        paymentMethod: 'Credit Card'
    },
    {
        id: 'ORD-89428',
        customer: mockCustomers[4],
        date: '2024-02-25T11:20:00Z',
        items: 1,
        total: 120.00,
        status: 'Delivered',
        paymentMethod: 'Credit Card'
    }
];
