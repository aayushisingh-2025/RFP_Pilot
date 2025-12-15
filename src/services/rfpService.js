import { v4 as uuidv4 } from 'uuid';

// Mock Store
const jobs = {};

const MOCK_SCORES = {
    businessStrategy: 85,
    coreOfferings: 92,
    resourceAvailability: 60,
    riskCompliance: 78,
    overallScore: 82,
    recommendation: 'PURSUE'
};

const MOCK_DRAFT = `
  <h2>1. Executive Summary</h2>
  <p>We are pleased to submit this proposal to help transform your business operations. Based on our deep experience in similar transformations, we believe we are uniquely positioned to deliver value...</p>
  
  <h2>2. proposed Solution</h2>
  <p>Our solution leverages our proprietary platform to automate 80% of manual tasks, reducing error rates by 99%...</p>
  
  <h2>3. Delivery Model</h2>
  <p>We propose an agile delivery model with 2-week sprints, ensuring transparency and rapid feedback loops...</p>
`;

const MOCK_QUESTIONS = [
    { id: 1, category: 'Scope', question: 'Can you clarify the integration requirements for the legacy CRM system?', priority: 'High' },
    { id: 2, category: 'Timeline', question: 'Is the go-live date of Q3 fixed, or is there flexibility based on scope?', priority: 'Medium' },
    { id: 3, category: 'Budget', question: 'Does the budget include post-go-live support and maintenance?', priority: 'High' },
    { id: 4, category: 'Stakeholders', question: 'Who will be the primary decision maker for the UX design phase?', priority: 'Low' },
];

export const rfpService = {
    uploadRFP: async (file) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const id = uuidv4();
                jobs[id] = {
                    id,
                    fileName: file.name,
                    status: 'processing',
                    uploadedAt: new Date().toISOString()
                };
                resolve(id);
            }, 1500); // Simulate upload latency
        });
    },

    getJobStatus: async (id) => {
        // Simulate processing time
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('completed');
            }, 1000);
        });
    },

    getAssessment: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...MOCK_SCORES });
            }, 500);
        });
    },

    getDraftResponse: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_DRAFT);
            }, 800);
        });
    },

    getQuestions: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_QUESTIONS);
            }, 600);
        });
    }
};
