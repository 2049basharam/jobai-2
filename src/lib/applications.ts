import { z } from 'zod';
import { supabase } from './supabase';
import type { CandidateProfile } from './profile';
import type { CandidateSkillRecord } from './skills';

export type ApplicationStage = 
  | 'SAVED'
  | 'APPLIED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'ACCEPTED';

export interface ApplicationStatusHistoryItem {
  id: string;
  stage: ApplicationStage;
  changedAt: string;
  notes?: string;
}

export interface CoverLetterArtifact {
  id: string;
  content: string;
  isCandidateApproved: boolean;
  generatedAt: string;
  updatedAt: string;
}

export interface InterviewPrepSection {
  id: string;
  category: 'Role Overview' | 'Technical Topics' | 'Candidate Evidence' | 'Likely Questions' | 'Questions to Ask';
  items: string[];
}

export interface CandidateApplication {
  id: string;
  userId: string;
  opportunityId?: string;
  roleTitle: string;
  organization: string;
  organizationLogo?: string;
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite';
  applicationUrl?: string;
  stage: ApplicationStage;
  appliedDate: string;
  submittedResumeId?: string;
  submittedResumeName?: string;
  coverLetter?: CoverLetterArtifact;
  interviewPrep?: InterviewPrepSection[];
  statusHistory: ApplicationStatusHistoryItem[];
  notes?: string;
  source: 'OPPORTUNITY_RADAR' | 'MANUALLY_ADDED';
  createdAt: string;
  updatedAt: string;
}

// Zod Validation Schema for Application Creation/Editing
export const applicationInputSchema = z.object({
  roleTitle: z.string().min(2, 'Role title must be at least 2 characters'),
  organization: z.string().min(2, 'Organization name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  workMode: z.enum(['remote', 'hybrid', 'onsite']),
  stage: z.enum(['SAVED', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED', 'WITHDRAWN', 'ACCEPTED']),
  appliedDate: z.string().min(4, 'Applied date is required'),
  applicationUrl: z.string().url('Invalid application URL').or(z.literal('')).optional(),
  notes: z.string().optional(),
});

const LOCAL_STORAGE_APPS_KEY = 'jobai_candidate_applications_v2';

/**
 * Default Baseline Applications Catalog (Shaik Rameez Basha)
 */
export function getDefaultApplications(userId: string = 'demo-candidate-01'): CandidateApplication[] {
  const now = new Date().toISOString();

  return [
    {
      id: 'app-001',
      userId,
      opportunityId: 'opp-001',
      roleTitle: 'Senior AI & Backend Systems Engineer',
      organization: 'Aptivue Technologies',
      location: 'Bengaluru, India (Hybrid)',
      workMode: 'hybrid',
      stage: 'INTERVIEW',
      appliedDate: '2026-09-02T10:00:00Z',
      applicationUrl: 'https://example.com/careers/aptivue-senior-ai-engineer',
      submittedResumeId: 'doc-01',
      submittedResumeName: 'Shaik_Rameez_Basha_Resume.pdf',
      source: 'OPPORTUNITY_RADAR',
      notes: 'Initial technical screening cleared on Sept 6. Technical system design round scheduled with Lead Architect.',
      statusHistory: [
        { id: 'h-01', stage: 'SAVED', changedAt: '2026-09-01T09:00:00Z', notes: 'Saved from Opportunity Radar' },
        { id: 'h-02', stage: 'APPLIED', changedAt: '2026-09-02T10:00:00Z', notes: 'Submitted resume via career portal' },
        { id: 'h-03', stage: 'SCREENING', changedAt: '2026-09-06T14:30:00Z', notes: 'Recruiter call with Talent Lead' },
        { id: 'h-04', stage: 'INTERVIEW', changedAt: '2026-09-12T11:00:00Z', notes: 'Invited for 60-min System Design & Vector DB round' },
      ],
      coverLetter: {
        id: 'cl-001',
        content: `Dear Hiring Team at Aptivue Technologies,\n\nI am writing to express my enthusiasm for the Senior AI & Backend Systems Engineer position. With 2+ years of full-stack engineering experience building FastAPI microservices, retrieval-augmented generation (RAG) pipelines, and PostgreSQL vector indexing, I am eager to contribute to Aptivue's AI orchestration platform.\n\nAt AfterQuery, I engineered high-throughput REST APIs and client-oriented evaluation suites handling complex unstructured documents. My technical stack aligns closely with your requirements in Python, FastAPI, pgvector, and containerized Docker deployments.\n\nThank you for considering my application. I look forward to discussing how my background in scalable backend architecture can drive value for Aptivue.\n\nSincerely,\nShaik Rameez Basha`,
        isCandidateApproved: true,
        generatedAt: '2026-09-02T09:45:00Z',
        updatedAt: '2026-09-02T10:00:00Z',
      },
      interviewPrep: [
        {
          id: 'ip-01',
          category: 'Role Overview',
          items: [
            'Lead LLM orchestration microservices & RAG document pipelines',
            'Target sub-50ms latency on pgvector queries across high-volume indices',
            'Implement SSE streaming agent API contracts for frontend clients',
          ],
        },
        {
          id: 'ip-02',
          category: 'Technical Topics',
          items: [
            'FastAPI async event loop concurrency & worker thread isolation',
            'HNSW vs IVFFlat indexing strategies in pgvector for high-dimensional embeddings',
            'Fail-safe fallback cascades for LLM API rate limits & HTTP timeouts',
            'Docker Compose multi-stage builds and non-root container security',
          ],
        },
        {
          id: 'ip-03',
          category: 'Candidate Evidence',
          items: [
            'AfterQuery & RotorDyn Applications (Python, FastAPI, PostgreSQL, React)',
            'JobAI Candidate Platform V2 (Astro 5, Supabase, Tailwind CSS, Playwright)',
            'Digital Skill Passport (Python, FastAPI, PostgreSQL evidence records)',
          ],
        },
        {
          id: 'ip-04',
          category: 'Likely Questions',
          items: [
            'How do you prevent SQL injection and schema drift when using pgvector?',
            'Describe how you handle streaming SSE responses when an upstream LLM API drops connection.',
            'Explain how you isolate blocking CPU tasks from FastAPI event loops.',
          ],
        },
        {
          id: 'ip-05',
          category: 'Questions to Ask',
          items: [
            'What is Aptivue current vector search query volume and SLA threshold?',
            'How does the team handle model evaluation and regression benchmarks before production deployments?',
          ],
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'app-002',
      userId,
      opportunityId: 'opp-002',
      roleTitle: 'Full Stack Engineer (React + FastAPI)',
      organization: 'FinScale Intelligence',
      location: 'Remote (India / APAC)',
      workMode: 'remote',
      stage: 'SCREENING',
      appliedDate: '2026-09-10T11:30:00Z',
      applicationUrl: 'https://example.com/careers/finscale-fullstack-dev',
      submittedResumeId: 'doc-01',
      submittedResumeName: 'Shaik_Rameez_Basha_Resume.pdf',
      source: 'OPPORTUNITY_RADAR',
      notes: 'Applied via remote portal. Recruiter outreach email received on Sept 14.',
      statusHistory: [
        { id: 'h-05', stage: 'APPLIED', changedAt: '2026-09-10T11:30:00Z', notes: 'Submitted online application' },
        { id: 'h-06', stage: 'SCREENING', changedAt: '2026-09-14T09:15:00Z', notes: 'Screening email received' },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'app-003',
      userId,
      opportunityId: 'opp-003',
      roleTitle: 'Lead Python Backend Infrastructure Architect',
      organization: 'CloudMatrix Labs',
      location: 'Hyderabad, India (On-site)',
      workMode: 'onsite',
      stage: 'APPLIED',
      appliedDate: '2026-09-14T15:00:00Z',
      source: 'OPPORTUNITY_RADAR',
      notes: 'Submitted via company website.',
      statusHistory: [
        { id: 'h-07', stage: 'APPLIED', changedAt: '2026-09-14T15:00:00Z', notes: 'Application submitted' },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

/**
 * Load Candidate Applications from Supabase DB with LocalStorage fallback
 */
export async function loadCandidateApplications(): Promise<CandidateApplication[]> {
  if (typeof window === 'undefined') return getDefaultApplications();

  // Try Supabase first
  try {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id || 'demo-candidate-01';

    const { data, error } = await supabase
      .from('candidate_applications')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        userId: d.user_id,
        opportunityId: d.opportunity_id,
        roleTitle: d.role_title,
        organization: d.organization,
        organizationLogo: d.organization_logo,
        location: d.location,
        workMode: d.work_mode || 'hybrid',
        applicationUrl: d.application_url,
        stage: d.stage || 'APPLIED',
        appliedDate: d.applied_date,
        submittedResumeId: d.submitted_resume_id,
        submittedResumeName: d.submitted_resume_name,
        coverLetter: d.cover_letter,
        interviewPrep: d.interview_prep,
        statusHistory: d.status_history || [],
        notes: d.notes,
        source: d.source || 'OPPORTUNITY_RADAR',
        createdAt: d.created_at || new Date().toISOString(),
        updatedAt: d.updated_at || new Date().toISOString(),
      }));
    }
  } catch (err) {
    console.warn('[JobAI Applications] Supabase read warning, checking LocalStorage fallback:', err);
  }

  // LocalStorage Fallback
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('LocalStorage load applications error:', err);
  }

  // Default Baseline Fallback
  const defaults = getDefaultApplications();
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(defaults));
  }
  return defaults;
}

/**
 * Save / Update Candidate Application Record
 */
export async function saveCandidateApplication(app: CandidateApplication): Promise<CandidateApplication[]> {
  const existing = await loadCandidateApplications();
  app.updatedAt = new Date().toISOString();

  const idx = existing.findIndex((item) => item.id === app.id);
  let updatedList: CandidateApplication[];

  if (idx >= 0) {
    updatedList = [...existing];
    updatedList[idx] = app;
  } else {
    updatedList = [app, ...existing];
  }

  // Persist LocalStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(updatedList));
  }

  // Sync with Supabase DB
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      await supabase.from('candidate_applications').upsert({
        id: app.id,
        user_id: authData.user.id,
        opportunity_id: app.opportunityId,
        role_title: app.roleTitle,
        organization: app.organization,
        location: app.location,
        work_mode: app.workMode,
        application_url: app.applicationUrl,
        stage: app.stage,
        applied_date: app.appliedDate,
        submitted_resume_id: app.submittedResumeId,
        submitted_resume_name: app.submittedResumeName,
        cover_letter: app.coverLetter,
        interview_prep: app.interviewPrep,
        status_history: app.statusHistory,
        notes: app.notes,
        source: app.source,
        updated_at: app.updatedAt,
      });
    }
  } catch (err) {
    console.warn('[JobAI Applications] Supabase upsert error:', err);
  }

  return updatedList;
}

/**
 * Audit-logged Application Status Stage Transition
 */
export async function updateApplicationStage(
  applicationId: string,
  newStage: ApplicationStage,
  notes?: string
): Promise<CandidateApplication[]> {
  const existing = await loadCandidateApplications();
  const app = existing.find((a) => a.id === applicationId);
  if (!app) return existing;

  const historyItem: ApplicationStatusHistoryItem = {
    id: `hist-${Date.now()}`,
    stage: newStage,
    changedAt: new Date().toISOString(),
    notes: notes || `Stage updated to ${newStage}`,
  };

  const updatedApp: CandidateApplication = {
    ...app,
    stage: newStage,
    statusHistory: [historyItem, ...(app.statusHistory || [])],
    updatedAt: new Date().toISOString(),
  };

  return saveCandidateApplication(updatedApp);
}

/**
 * Delete Candidate Application Record
 */
export async function deleteCandidateApplication(applicationId: string): Promise<CandidateApplication[]> {
  const existing = await loadCandidateApplications();
  const filtered = existing.filter((a) => a.id !== applicationId);

  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(filtered));
  }

  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      await supabase
        .from('candidate_applications')
        .delete()
        .eq('user_id', authData.user.id)
        .eq('id', applicationId);
    }
  } catch (err) {
    console.warn('Supabase application delete error:', err);
  }

  return filtered;
}

/**
 * AI Cover Letter Draft Generator (Non-Authoritative Candidate Draft)
 */
export function generateCoverLetterDraftForApplication(
  app: CandidateApplication,
  profile: CandidateProfile | null
): CoverLetterArtifact {
  const name = profile?.fullName || 'Shaik Rameez Basha';
  const role = app.roleTitle;
  const company = app.organization;
  const summary = profile?.professionalSummary || 'experienced Full-Stack Engineer specializing in AI microservices and backend systems';

  const content = `Dear Hiring Team at ${company},\n\nI am writing to formally submit my application for the ${role} position. As an ${summary}, I have built production-grade FastAPI REST services, integrated LLM orchestration endpoints, and maintained robust database architectures.\n\nMy practical experience includes building high-performance web applications, pgvector data pipelines, and responsive React interfaces. I am particularly drawn to ${company}'s technical direction and would welcome the opportunity to contribute to your engineering goals.\n\nThank you for reviewing my application materials.\n\nSincerely,\n${name}`;

  return {
    id: `cl-${Date.now()}`,
    content,
    isCandidateApproved: false,
    generatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * AI Interview Preparation Generator (Structured Preparation Signal)
 */
export function generateInterviewPrepForApplication(
  app: CandidateApplication,
  skills: CandidateSkillRecord[]
): InterviewPrepSection[] {
  const topSkillNames = skills.map((s) => s.name).slice(0, 4);

  return [
    {
      id: 'ip-1',
      category: 'Role Overview',
      items: [
        `Target Role: ${app.roleTitle} at ${app.organization}`,
        `Location & Mode: ${app.location} (${app.workMode.toUpperCase()})`,
        `Application Date: ${new Date(app.appliedDate).toLocaleDateString()}`,
      ],
    },
    {
      id: 'ip-2',
      category: 'Technical Topics',
      items: [
        'System architecture & async concurrency boundaries',
        'Database indexing, schema migration strategy, & query optimization',
        'API error handling, rate limiting, and fault tolerance',
        'End-to-end testing, CI/CD pipeline integration, & security parameters',
      ],
    },
    {
      id: 'ip-3',
      category: 'Candidate Evidence',
      items: topSkillNames.length > 0
        ? topSkillNames.map((s) => `Demonstrated capability: ${s} (Digital Skill Passport)`)
        : ['Python & FastAPI microservices', 'PostgreSQL & Supabase pgvector', 'React & TypeScript frontend'],
    },
    {
      id: 'ip-4',
      category: 'Likely Questions',
      items: [
        `How have you architected microservices for ${app.roleTitle} challenges?`,
        'Describe a complex bug or performance bottleneck you resolved in production.',
        'How do you evaluate trade-offs between speed of delivery and architectural cleanliness?',
      ],
    },
    {
      id: 'ip-5',
      category: 'Questions to Ask',
      items: [
        `What are the key technical milestones for ${app.organization}'s engineering team this quarter?`,
        'What deployment infrastructure and CI/CD pipelines does the team use daily?',
      ],
    },
  ];
}
