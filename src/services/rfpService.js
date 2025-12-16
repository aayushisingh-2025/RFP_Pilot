// Google Drive Folder Configuration
export const DRIVE_CONFIG = {
    SOURCES: {
        EXISTING_RFPS: '1GnGDVQ9-7EnoWmzIwgy3vr3co9tqRJF_',
        QNA_KNOWLEDGE_BASE: '1iraxscjsjBf8P8aCxHaDfcXgsKgAcZIB',
        INTELIA_WEBSITE: 'https://www.intelia.com.au/'
    },
    OUTPUTS: {
        RESPONSES: '1mVFia_W_Y28rZYTQyUJwwSxxX6tKV9WI',
        QNA_DOCS: '1sCrIGwDqB7XQ0LZMpcujAe0z2bqSxSY5'
    }
};

// Mock Data for Simulation
const MOCK_ASSESSMENT = {
    overallScore: 88,
    sections: [
        { id: 1, name: 'Company Info', score: 95, source: 'Intelia_AboutUs_2024.pdf' },
        { id: 2, name: 'Ethics & Compliance', score: 100, source: 'ISO27001_Cert.pdf' },
        { id: 3, name: 'Business Value', score: 82, source: 'CaseStudy_FinTech.docx' },
        { id: 4, name: 'Technical Fit', score: 75, source: 'Capability_Cloud.pdf' }
    ]
};

const MOCK_GENERATED_RFP = `
    <h1>Executive Summary</h1>
    <p>Intelia is uniquely positioned to deliver this transformation...</p>
    <h2>1. Company Profile</h2>
    <p>Founded in 20XX, Intelia has a track record of...</p>
`;

const MOCK_QNA = [
    { id: 1, question: "What is the specific SLA for P1 incidents?", reasoning: "Ambiguous in section 4.2", priority: "High" },
    { id: 2, question: "Can we use offshore resources for non-prod environments?", reasoning: "Not specified in compliance section", priority: "Medium" }
];

export const googleDriveService = {
    // Simulator for fetching files from the "Source" folders
    listFiles: async (folderId) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    { id: 'f1', name: 'Previous_RFP_Gov.docx', type: 'application/vnd.google-apps.document' },
                    { id: 'f2', name: 'Security_Policy_v2.pdf', type: 'application/pdf' },
                    { id: 'f3', name: 'Pricing_Model.xlsx', type: 'application/vnd.google-apps.spreadsheet' }
                ]);
            }, 800);
        });
    },

    // Simulator for Saving to Drive
    saveFile: async (folderId, fileName, content) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`[Mock IO] Saved ${fileName} to Drive Folder ${folderId}`);
                resolve({ success: true, fileId: 'new_file_' + Date.now() });
            }, 1000);
        });
    }
};

export const rfpService = {
    // Legacy wrappers updated to use new structure
    uploadRFP: async (file) => {
        return new Promise(resolve => setTimeout(() => resolve("job_123"), 500));
    },

    getAssessment: async (jobId) => {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_ASSESSMENT), 1000));
    },

    getGeneratedResponse: async (jobId) => {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_GENERATED_RFP), 1200));
    },

    getQnA: async (jobId) => {
        return new Promise(resolve => setTimeout(() => resolve(MOCK_QNA), 800));
    }
};
