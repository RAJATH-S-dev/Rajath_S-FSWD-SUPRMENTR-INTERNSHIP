// Mock Task Database
export let tasks = [
  {
    id: 1,
    title: 'Complete backend assignment',
    description: 'Build the CRUD Task API using Express',
    status: 'In Progress',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Test with Postman',
    description: 'Verify all GET, POST, PUT, DELETE endpoints',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];
