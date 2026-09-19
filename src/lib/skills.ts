import { z } from 'zod';
import { supabase } from './supabase';

export type EvidenceSourceType =
  | 'SELF_DECLARED'
  | 'PROJECT'
  | 'EXPERIENCE'
  | 'RESUME'
  | 'ASSESSMENT'
  | 'CERTIFICATION'
  | 'EMPLOYER_VERIFICATION';

export type EvidenceState =
  | 'SELF_DECLARED'
  | 'DOCUMENTED'
  | 'PROJECT_EVIDENCE'
  | 'ASSESSED'
  | 'CREDENTIALLED'
  | 'EMPLOYER_VERIFIED';

export interface SkillEvidenceItem {
  id: string;
  sourceType: EvidenceSourceType;
  title: string;
  description?: string;
  demonstratedDate?: string;
  verified: boolean;
  verifierName?: string;
  linkUrl?: string;
}

export type SkillCategory =
  | 'AI / Machine Learning'
  | 'Backend Engineering'
  | 'Frontend Engineering'
  | 'Data & Databases'
  | 'DevOps & Cloud'
  | 'Testing & Quality'
  | 'Tools & Platforms';

export interface CandidateSkillRecord {
  id: string;
  userId: string;
  name: string;
  canonicalId: string;
  category: SkillCategory;
  description?: string;
  evidenceState: EvidenceState;
  evidence: SkillEvidenceItem[];
  firstDemonstrated?: string;
  lastDemonstrated?: string;
  relatedSkills: string[];
  createdAt: string;
  updatedAt: string;
}

// Zod Validation Schema for Skill Creation & Editing
export const skillInputSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  category: z.enum([
    'AI / Machine Learning',
    'Backend Engineering',
    'Frontend Engineering',
    'Data & Databases',
    'DevOps & Cloud',
    'Testing & Quality',
    'Tools & Platforms',
  ]),
  description: z.string().optional(),
  evidenceState: z.enum([
    'SELF_DECLARED',
    'DOCUMENTED',
    'PROJECT_EVIDENCE',
    'ASSESSED',
    'CREDENTIALLED',
    'EMPLOYER_VERIFIED',
  ]).default('SELF_DECLARED'),
  firstDemonstrated: z.string().optional(),
  lastDemonstrated: z.string().optional(),
  relatedSkills: z.array(z.string()).default([]),
});

export type SkillInput = z.infer<typeof skillInputSchema>;

const LOCAL_SKILLS_STORAGE_KEY = 'jobai_candidate_skills_v2';

/**
 * Returns default baseline skills seeded for Shaik Rameez Basha
 */
export function getDefaultSkills(userId: string): CandidateSkillRecord[] {
  const now = new Date().toISOString();
  return [
    {
      id: 'skill-01',
      userId,
      name: 'Python',
      canonicalId: 'python',
      category: 'AI / Machine Learning',
      description: 'Core language for machine learning pipelines, FastAPI services, and AI evaluation engines.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2021',
      lastDemonstrated: '2026',
      relatedSkills: ['FastAPI', 'PyTorch', 'ONNX', 'NLP'],
      evidence: [
        {
          id: 'ev-01',
          sourceType: 'PROJECT',
          title: 'AfterQuery & RotorDyn Applications',
          description: 'Engineered Python backend evaluation suites and microservices.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Candidate Project Evidence',
          linkUrl: 'https://github.com/2049basharam',
        },
        {
          id: 'ev-02',
          sourceType: 'EXPERIENCE',
          title: 'Full-Stack Software Engineer at AfterQuery',
          description: 'Built evaluation scripts and testing frameworks for AI client codebases.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Work Experience Reference',
        },
        {
          id: 'ev-03',
          sourceType: 'RESUME',
          title: 'B.Tech CSE (AI) Degree & Technical Resume',
          description: 'Documented core capability in academic coursework and resume.',
          demonstratedDate: '2020 - 2024',
          verified: false,
          verifierName: 'Document Extraction',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-02',
      userId,
      name: 'FastAPI',
      canonicalId: 'fastapi',
      category: 'Backend Engineering',
      description: 'High-performance asynchronous Python REST API framework.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2023',
      lastDemonstrated: '2026',
      relatedSkills: ['Python', 'PostgreSQL', 'REST APIs', 'Docker'],
      evidence: [
        {
          id: 'ev-04',
          sourceType: 'PROJECT',
          title: 'AfterQuery Backend Services',
          description: 'Created async REST routes, middleware validation, and database connectors.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-03',
      userId,
      name: 'React & TypeScript',
      canonicalId: 'react-typescript',
      category: 'Frontend Engineering',
      description: 'Building type-safe, brutalist reactive user interfaces and spatial dashboards.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2022',
      lastDemonstrated: '2026',
      relatedSkills: ['Astro', 'Tailwind CSS', 'State Management'],
      evidence: [
        {
          id: 'ev-05',
          sourceType: 'PROJECT',
          title: 'JobAI Candidate Platform V2',
          description: 'Built spatial radial navigator, interactive identity surfaces, and resume dropzones.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
          linkUrl: 'https://github.com/2049basharam',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-04',
      userId,
      name: 'PostgreSQL & Supabase',
      canonicalId: 'postgresql-supabase',
      category: 'Data & Databases',
      description: 'Relational data modeling, RLS security policies, and pgvector vector search.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2022',
      lastDemonstrated: '2026',
      relatedSkills: ['SQL', 'pgvector', 'Database Migration'],
      evidence: [
        {
          id: 'ev-06',
          sourceType: 'PROJECT',
          title: 'JobAI Candidate Database Schema',
          description: 'Configured candidate profiles, document storage, and vector retrieval tables.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-05',
      userId,
      name: 'Explainable AI & NLP',
      canonicalId: 'explainable-ai-nlp',
      category: 'AI / Machine Learning',
      description: 'Natural language processing, Gemini LLM prompt optimization, and model evaluation.',
      evidenceState: 'DOCUMENTED',
      firstDemonstrated: '2023',
      lastDemonstrated: '2026',
      relatedSkills: ['Python', 'Gemini AI', 'PyTorch'],
      evidence: [
        {
          id: 'ev-07',
          sourceType: 'RESUME',
          title: 'Academic Specialization in AI & GenAI Systems',
          description: 'Documented specialization in computer science degree.',
          demonstratedDate: '2024',
          verified: false,
          verifierName: 'Resume Signal',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-06',
      userId,
      name: 'Docker & Microservices',
      canonicalId: 'docker-microservices',
      category: 'DevOps & Cloud',
      description: 'Containerizing full-stack web applications and deployment pipeline orchestration.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2023',
      lastDemonstrated: '2026',
      relatedSkills: ['FastAPI', 'Vercel / Render', 'CI/CD'],
      evidence: [
        {
          id: 'ev-08',
          sourceType: 'PROJECT',
          title: 'RotorDyn Infrastructure Containers',
          description: 'Dockerized microservice stack for automated evaluation.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-07',
      userId,
      name: 'Playwright E2E Testing',
      canonicalId: 'playwright-e2e',
      category: 'Testing & Quality',
      description: 'Automated end-to-end browser testing, accessibility audits, and visual regression.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2024',
      lastDemonstrated: '2026',
      relatedSkills: ['TypeScript', 'Testing Strategy', 'CI Quality Gates'],
      evidence: [
        {
          id: 'ev-09',
          sourceType: 'PROJECT',
          title: 'JobAI E2E Test Suite',
          description: 'Wrote 50+ deterministic Playwright test specs validating workspace flows.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'skill-08',
      userId,
      name: 'Astro 5 SSG / SSR',
      canonicalId: 'astro-framework',
      category: 'Tools & Platforms',
      description: 'Modern web framework using content collections, island hydration, and fast builds.',
      evidenceState: 'PROJECT_EVIDENCE',
      firstDemonstrated: '2025',
      lastDemonstrated: '2026',
      relatedSkills: ['React', 'TypeScript', 'Vite'],
      evidence: [
        {
          id: 'ev-10',
          sourceType: 'PROJECT',
          title: 'JobAI Candidate Platform V2 Architecture',
          description: 'Built multi-page static application shell with zero hydration overhead.',
          demonstratedDate: '2026',
          verified: false,
          verifierName: 'Project Evidence',
        },
      ],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

/**
 * Fetch candidate skills from Supabase DB with LocalStorage fallback
 */
export async function fetchCandidateSkills(): Promise<{ skills: CandidateSkillRecord[]; error: string | null }> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || 'demo-candidate-01';

    // 1. Check LocalStorage cache first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${LOCAL_SKILLS_STORAGE_KEY}_${userId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CandidateSkillRecord[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { skills: parsed, error: null };
          }
        } catch (_) {}
      }
    }

    // 2. Query Supabase candidate_skills table
    const { data: dbSkills, error: dbError } = await supabase
      .from('candidate_skills')
      .select('*')
      .eq('user_id', userId);

    if (!dbError && dbSkills && dbSkills.length > 0) {
      const skills: CandidateSkillRecord[] = dbSkills.map((s: any) => ({
        id: s.id,
        userId: s.user_id,
        name: s.name,
        canonicalId: s.canonical_id || s.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category: s.category as SkillCategory,
        description: s.description || '',
        evidenceState: (s.evidence_state as EvidenceState) || 'SELF_DECLARED',
        evidence: s.evidence || [],
        firstDemonstrated: s.first_demonstrated || '',
        lastDemonstrated: s.last_demonstrated || '',
        relatedSkills: s.related_skills || [],
        createdAt: s.created_at || new Date().toISOString(),
        updatedAt: s.updated_at || new Date().toISOString(),
      }));

      if (typeof window !== 'undefined') {
        localStorage.setItem(`${LOCAL_SKILLS_STORAGE_KEY}_${userId}`, JSON.stringify(skills));
      }

      return { skills, error: null };
    }

    // 3. Fallback to default candidate skills for Shaik Rameez Basha
    const defaultList = getDefaultSkills(userId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_SKILLS_STORAGE_KEY}_${userId}`, JSON.stringify(defaultList));
    }

    return { skills: defaultList, error: null };
  } catch (err: any) {
    console.warn('[JobAI Skills] DB fetch fallback:', err?.message);
    const fallbackList = getDefaultSkills('demo-candidate-01');
    return { skills: fallbackList, error: null };
  }
}

/**
 * Save / update a candidate skill record
 */
export async function saveCandidateSkill(skill: CandidateSkillRecord): Promise<{ success: boolean; error: string | null }> {
  try {
    skill.updatedAt = new Date().toISOString();

    const { skills: currentSkills } = await fetchCandidateSkills();
    const existingIndex = currentSkills.findIndex((s) => s.id === skill.id || s.canonicalId === skill.canonicalId);

    let updatedSkills: CandidateSkillRecord[];
    if (existingIndex >= 0) {
      updatedSkills = [...currentSkills];
      updatedSkills[existingIndex] = skill;
    } else {
      updatedSkills = [skill, ...currentSkills];
    }

    // Save to LocalStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_SKILLS_STORAGE_KEY}_${skill.userId}`, JSON.stringify(updatedSkills));
    }

    // Upsert into Supabase DB if accessible
    await supabase.from('candidate_skills').upsert({
      id: skill.id,
      user_id: skill.userId,
      name: skill.name,
      canonical_id: skill.canonicalId,
      category: skill.category,
      description: skill.description,
      evidence_state: skill.evidenceState,
      evidence: skill.evidence,
      first_demonstrated: skill.firstDemonstrated,
      last_demonstrated: skill.lastDemonstrated,
      related_skills: skill.relatedSkills,
      updated_at: skill.updatedAt,
    });

    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save skill' };
  }
}

/**
 * Delete a candidate skill record
 */
export async function deleteCandidateSkill(skillId: string, userId: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { skills: currentSkills } = await fetchCandidateSkills();
    const filtered = currentSkills.filter((s) => s.id !== skillId);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_SKILLS_STORAGE_KEY}_${userId}`, JSON.stringify(filtered));
    }

    await supabase.from('candidate_skills').delete().eq('id', skillId).eq('user_id', userId);

    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete skill' };
  }
}

/**
 * Detects unreviewed parsed resume skills that are not yet in authoritative candidate skills
 */
export function getUnreviewedResumeSignals(
  candidateSkills: CandidateSkillRecord[],
  parsedResumeSkills: string[] = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Astro', 'Python', 'Tailwind CSS', 'FastAPI']
): string[] {
  const existingNames = new Set(candidateSkills.map((s) => s.name.toLowerCase()));
  return parsedResumeSkills.filter((sk) => !existingNames.has(sk.toLowerCase()));
}
