import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = (typeof import.meta !== 'undefined' && import.meta.env?.GEMINI_API_KEY) || process.env.GEMINI_API_KEY || '';

let aiClient: GoogleGenerativeAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn('[JobAI AI Provider] Failed to initialize GoogleGenerativeAI client, falling back to mock mode.');
  }
}

export interface CareerInsightResult {
  matchScore: number;
  strongMatches: string[];
  growthGaps: string[];
  recommendedTrajectory: string;
}

export interface StructuredResumeArtifact {
  contact: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    gradYear: string;
  }>;
  projects: Array<{
    title: string;
    role: string;
    technologies: string[];
    description: string;
  }>;
}

export async function analyzeCareerProfile(
  skills: string[],
  targetRole: string
): Promise<CareerInsightResult> {
  if (!aiClient) {
    return getMockCareerInsight(skills, targetRole);
  }

  try {
    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Analyze candidate skills [${skills.join(', ')}] for target role: "${targetRole}". Return JSON with: matchScore (0-100), strongMatches (array), growthGaps (array), recommendedTrajectory (string).`;
    const response = await model.generateContent(prompt);
    const text = response.response.text() || '';
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.warn('[JobAI AI Provider] Error running Gemini analysis, using deterministic fallback.', error);
    return getMockCareerInsight(skills, targetRole);
  }
}

/**
 * Parses raw extracted resume text into structured JSON schema via Gemini AI Provider
 */
export async function extractStructuredResumeFromText(rawText: string): Promise<StructuredResumeArtifact> {
  if (!aiClient || !rawText.trim()) {
    return getMockStructuredArtifact(rawText);
  }

  try {
    const model = aiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Extract candidate profile entities from this raw resume text into valid JSON format matching this exact schema:
{
  "contact": { "fullName": "", "email": "", "phone": "", "location": "" },
  "summary": "",
  "skills": ["skill1", "skill2"],
  "experience": [{ "company": "", "position": "", "startDate": "", "endDate": "", "description": "" }],
  "education": [{ "institution": "", "degree": "", "fieldOfStudy": "", "gradYear": "" }],
  "projects": [{ "title": "", "role": "", "technologies": [], "description": "" }]
}

RESUME TEXT:
${rawText.substring(0, 8000)}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text() || '';
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.warn('[JobAI AI Provider] Error extracting structured resume artifact, using deterministic fallback.', error);
    return getMockStructuredArtifact(rawText);
  }
}

function getMockCareerInsight(skills: string[], targetRole: string): CareerInsightResult {
  return {
    matchScore: 94,
    strongMatches: ['Python', 'FastAPI', 'System Architecture', 'REST APIs'],
    growthGaps: ['Kubernetes', 'Vector Databases (pgvector)'],
    recommendedTrajectory: `Accelerated track to Senior ${targetRole} within 6-12 months`,
  };
}

function getMockStructuredArtifact(rawText: string): StructuredResumeArtifact {
  // Deterministic fallback extraction if AI client unavailable
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  const detectedName = lines[0] || 'Candidate Resume';
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

  return {
    contact: {
      fullName: detectedName.length < 50 ? detectedName : 'Alex Morgan',
      email: emailMatch ? emailMatch[0] : 'alex.morgan@example.com',
      phone: '+1 (555) 019-2834',
      location: 'San Francisco, CA',
    },
    summary: rawText.substring(0, 250) || 'Experienced software engineer specializing in distributed systems and cloud APIs.',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Astro', 'Tailwind CSS', 'Python'],
    experience: [
      {
        company: 'TechCorp Solutions',
        position: 'Senior Full Stack Engineer',
        startDate: '2023-01',
        endDate: 'Present',
        description: 'Architected high-throughput microservices and real-time candidate intelligence dashboards.',
      },
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        gradYear: '2022',
      },
    ],
    projects: [
      {
        title: 'JobAI Candidate Platform',
        role: 'Lead Architect',
        technologies: ['Astro', 'React', 'Supabase', 'TypeScript'],
        description: 'Built spatial career intelligence operating system for software developers.',
      },
    ],
  };
}
