/**
 * Mock Internships API
 * 
 * This file provides mock internship endpoints for testing.
 * Replace with real API calls once your backend is ready.
 */

// Mock internship data
const getMockInternships = () => {
  const internships = JSON.parse(localStorage.getItem('mockInternships') || '[]');
  
  // If empty, create some sample data
  if (internships.length === 0) {
    const sampleInternships = [
      {
        id: '1',
        title: 'Frontend Developer Intern',
        company: 'Google',
        location: 'Mountain View, CA',
        status: 'Applied',
        appliedDate: '2025-03-15',
        salary: '$25/hour',
        description: 'Work on React and Next.js projects',
      },
      {
        id: '2',
        title: 'Full Stack Developer Intern',
        company: 'Microsoft',
        location: 'Seattle, WA',
        status: 'Interview Scheduled',
        appliedDate: '2025-03-10',
        salary: '$28/hour',
        description: 'Build cloud applications with Azure',
      },
      {
        id: '3',
        title: 'Backend Developer Intern',
        company: 'Amazon',
        location: 'Remote',
        status: 'Rejected',
        appliedDate: '2025-02-28',
        salary: '$26/hour',
        description: 'Work with Node.js and databases',
      },
    ];
    
    localStorage.setItem('mockInternships', JSON.stringify(sampleInternships));
    return sampleInternships;
  }
  
  return internships;
};

export const fetchInternships = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const internships = getMockInternships();
    return internships;
  } catch (error) {
    throw new Error('Failed to fetch internships');
  }
};

export const fetchInternship = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const internships = getMockInternships();
    const internship = internships.find(i => i.id === id);
    
    if (!internship) {
      throw new Error('Internship not found');
    }
    
    return internship;
  } catch (error) {
    throw error;
  }
};

export const createInternship = async (data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const internships = getMockInternships();
    
    const newInternship = {
      id: Date.now().toString(),
      ...data,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    
    internships.push(newInternship);
    localStorage.setItem('mockInternships', JSON.stringify(internships));
    
    return newInternship;
  } catch (error) {
    throw new Error('Failed to create internship');
  }
};

export const updateInternship = async (id, data) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const internships = getMockInternships();
    const index = internships.findIndex(i => i.id === id);
    
    if (index === -1) {
      throw new Error('Internship not found');
    }
    
    internships[index] = { ...internships[index], ...data };
    localStorage.setItem('mockInternships', JSON.stringify(internships));
    
    return internships[index];
  } catch (error) {
    throw error;
  }
};

export const deleteInternship = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const internships = getMockInternships();
    const index = internships.findIndex(i => i.id === id);
    
    if (index === -1) {
      throw new Error('Internship not found');
    }
    
    internships.splice(index, 1);
    localStorage.setItem('mockInternships', JSON.stringify(internships));
    
    return { success: true };
  } catch (error) {
    throw error;
  }
};
