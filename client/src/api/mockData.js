export const mockUsers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: 'A', location: 'San Francisco, CA', bio: 'Passionate about creating beautiful and intuitive user interfaces. Skilled in React, Tailwind, and Figma.' },
    { id: 2, name: 'Bob Williams', role: 'Backend Developer', avatar: 'B', location: 'New York, NY', bio: 'Expert in Node.js, Python, and building scalable microservices.' },
    { id: 3, name: 'Charlie Brown', role: 'UI/UX Designer', avatar: 'C', location: 'Austin, TX', bio: 'I turn complex problems into simple, elegant designs.' },
    { id: 4, name: 'Diana Miller', role: 'Project Manager', avatar: 'D', location: 'Chicago, IL', bio: 'Agile enthusiast focused on delivering value and leading happy teams.' },
];

export const mockProjects = [
    { id: 101, name: 'E-Commerce Platform', authorId: 1, members: [1, 2, 3], status: 'Ongoing', description: 'A next-gen online shopping experience with AI-powered recommendations.', tags: ['React', 'Node.js', 'Stripe'], likes: 125, rating: 4.8 },
    { id: 102, name: 'Mobile Banking App', authorId: 4, members: [1, 4], status: 'Ongoing', description: 'A secure and user-friendly mobile app for a leading financial institution.', tags: ['React Native', 'Java', 'Security'], likes: 88, rating: 4.5 },
    { id: 103, name: 'Data Analytics Dashboard', authorId: 2, members: [2, 3, 4], status: 'Planning', description: 'A B2B tool for visualizing complex business intelligence data.', tags: ['Python', 'D3.js', 'SQL'], likes: 210, rating: 4.9 },
    { id: 104, name: 'Student Collaboration Hub', authorId: 3, members: [3], status: 'New', description: 'A platform for students to find teammates and build amazing projects together.', tags: ['UX Design', 'Figma', 'Research'], likes: 302, rating: 5.0 },
];

export const mockTimeline = [
    { id: 1, user: 'Charlie Brown', action: 'pushed a new design for', target: 'E-Commerce Platform', time: '2 hours ago' },
    { id: 2, user: 'Alice Johnson', action: 'completed task "User Authentication"', target: 'Mobile Banking App', time: '5 hours ago' },
    { id: 3, user: 'Diana Miller', action: 'created a new project', target: 'Data Analytics Dashboard', time: '1 day ago' },
];

export const mockTasks = [
    { id: 201, text: 'Design the product page', project: 'E-Commerce Platform', projectId: 101, user: 3, completed: false },
    { id: 202, text: 'Setup the database schema', project: 'Mobile Banking App', projectId: 102, user: 2, completed: true },
    { id: 203, text: 'Implement payment gateway', project: 'E-Commerce Platform', projectId: 101, user: 1, completed: false },
];

export const mockNotifications = [
    { id: 1, text: 'Bob Williams sent you a connection request.'},
    { id: 2, text: 'Your task "Design the product page" is due tomorrow.'},
    { id: 3, text: 'A new project "Marketing Website" was created.'},
];

export const mockMessages = {
    2: [ // Messages with Bob Williams (id: 2)
        { id: 1, sender: 2, text: "Hey Alice, saw your project on Discover. Your React skills are impressive!", timestamp: "10:30 AM" },
        { id: 2, sender: 1, text: "Hey Bob! Thanks, appreciate it. Your backend projects look solid too.", timestamp: "10:31 AM" },
        { id: 3, sender: 2, text: "I'm working on a new project, a real-time data analytics dashboard. Wondering if you'd be interested in collaborating?", timestamp: "10:32 AM" },
    ],
    3: [ // Messages with Charlie Brown (id: 3)
        { id: 1, sender: 3, text: "Can you take a look at the Figma file for the new landing page?", timestamp: "Yesterday" },
        { id: 2, sender: 1, text: "Sure, I'll check it out this afternoon.", timestamp: "Yesterday" },
    ],
    4: [], // No messages with Diana Miller yet
};