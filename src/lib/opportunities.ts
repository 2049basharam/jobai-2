import { supabase } from './supabase';
import type { CandidateSkillRecord } from './skills';
import type { CandidateProfile } from './profile';

export type WorkMode = 'remote' | 'hybrid' | 'onsite';
export type EmploymentType = 'full-time' | 'contract' | 'part-time' | 'internship';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export type OpportunitySource = 
  | 'configured_provider'
  | 'remote_ok'
  | 'greenhouse'
  | 'linkedin'
  | 'illustrative_demo';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  roleCategory: 'AI / ML Engineering' | 'Backend Engineering' | 'Full Stack Engineering' | 'DevOps & Cloud' | 'Data Engineering';
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  responsibilities: string[];
  source: OpportunitySource;
  sourceLabel: string;
  sourceUrl?: string;
  isIllustrativeDemo: boolean;
  publishedAt: string;
  expiresAt?: string;
}

export interface SavedOpportunity {
  id: string;
  userId: string;
  opportunityId: string;
  savedAt: string;
  notes?: string;
}

export interface OpportunityAlignment {
  opportunityId: string;
  matchedRequiredSkills: string[];
  missingRequiredSkills: string[];
  matchedPreferredSkills: string[];
  missingPreferredSkills: string[];
  supportingProjectCount: number;
  alignmentIndex: number; // Deterministic: (matchedRequired / totalRequired) * 100
  alignmentGrade: 'HIGH_ALIGNMENT' | 'MODERATE_ALIGNMENT' | 'DEVELOPING_ALIGNMENT';
  explanation: string;
}

// Storage Key for Local Fallback
const SAVED_OPPORTUNITIES_KEY = 'jobai_saved_opportunities_v2';

/**
 * Baseline Illustrative Opportunity Catalog
 * Explicitly marked as illustrative preview until enterprise job sources are configured.
 */
export const DEFAULT_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'Senior AI & Backend Systems Engineer',
    organization: 'Aptivue Technologies',
    location: 'Bengaluru, India (Hybrid)',
    workMode: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    roleCategory: 'AI / ML Engineering',
    requiredSkills: ['Python', 'FastAPI', 'PostgreSQL', 'NLP'],
    preferredSkills: ['Docker', 'RAG', 'Redis', 'Kubernetes'],
    description: 'Lead the architecture and production deployment of LLM orchestration microservices, retrieval-augmented generation pipelines, and high-throughput vector search databases.',
    responsibilities: [
      'Architect microservices using Python and FastAPI for production NLP workloads',
      'Optimize PostgreSQL vector storage (pgvector) for sub-50ms query response times',
      'Design fail-safe fallback providers for LLM inference endpoints',
      'Collaborate with frontend engineers to integrate streaming SSE agent APIs',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-15T09:00:00Z',
    sourceUrl: 'https://example.com/careers/aptivue-senior-ai-engineer',
  },
  {
    id: 'opp-002',
    title: 'Full Stack Engineer (React + FastAPI)',
    organization: 'FinScale Intelligence',
    location: 'Remote (India / APAC)',
    workMode: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    roleCategory: 'Full Stack Engineering',
    requiredSkills: ['React', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS'],
    preferredSkills: ['PostgreSQL', 'Docker', 'Jest', 'Playwright'],
    description: 'Build interactive real-time financial dashboards and secure analytical reporting tools using React 19, TypeScript, and FastAPI.',
    responsibilities: [
      'Develop pixel-perfect brutalist UI components using React, TypeScript, and Tailwind CSS',
      'Implement robust REST endpoints and websockets using FastAPI',
      'Maintain 90%+ unit and integration test coverage across frontend and backend packages',
      'Ensure strict data isolation and enterprise RBAC access controls',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-17T11:30:00Z',
    sourceUrl: 'https://example.com/careers/finscale-fullstack-dev',
  },
  {
    id: 'opp-003',
    title: 'Lead Python Backend Infrastructure Architect',
    organization: 'CloudMatrix Labs',
    location: 'Hyderabad, India (On-site)',
    workMode: 'onsite',
    employmentType: 'full-time',
    experienceLevel: 'lead',
    roleCategory: 'Backend Engineering',
    requiredSkills: ['Python', 'PostgreSQL', 'Docker', 'REST APIs'],
    preferredSkills: ['Kubernetes', 'AWS', 'Redis', 'CI/CD Pipelines'],
    description: 'Design distributed backend systems, multi-region database replication, and enterprise microservices infrastructure handling millions of daily events.',
    responsibilities: [
      'Define database schema evolution patterns and automated migration pipelines',
      'Implement asynchronous worker queues for background document processing',
      'Establish API gateway specifications, rate-limiting, and OAuth2 security parameters',
      'Mentor junior backend engineers in clean architecture and TDD principles',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-10T14:00:00Z',
  },
  {
    id: 'opp-004',
    title: 'Machine Learning Operations (MLOps) Engineer',
    organization: 'DataVanguard AI',
    location: 'Remote (Global)',
    workMode: 'remote',
    employmentType: 'full-time',
    experienceLevel: 'senior',
    roleCategory: 'AI / ML Engineering',
    requiredSkills: ['Python', 'Docker', 'Kubernetes', 'CI/CD Pipelines'],
    preferredSkills: ['PyTorch', 'MLflow', 'PostgreSQL', 'AWS'],
    description: 'Build robust model deployment pipelines, continuous evaluation monitoring, and automated retraining triggers for enterprise computer vision and NLP models.',
    responsibilities: [
      'Construct automated CI/CD deployment pipelines for containerized ML inference models',
      'Implement drift monitoring and data quality validation hooks',
      'Optimize GPU cluster utilization and model quantization latency',
      'Integrate model evaluation metrics with centralized telemetry dashboards',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-12T16:45:00Z',
  },
  {
    id: 'opp-005',
    title: 'Data & Knowledge Graph Systems Engineer',
    organization: 'Cognitive Nexus',
    location: 'Bengaluru, India (Hybrid)',
    workMode: 'hybrid',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    roleCategory: 'Data Engineering',
    requiredSkills: ['Python', 'PostgreSQL', 'SQL', 'Data Modeling'],
    preferredSkills: ['Neo4j', 'FastAPI', 'Elasticsearch', 'Docker'],
    description: 'Develop structured knowledge graph pipelines, ETL telemetry, and semantic data search engines connecting unstructured documents to structured candidate skills.',
    responsibilities: [
      'Write optimized SQL transformations and pgvector indexing scripts',
      'Extract entities and relations from heterogeneous document streams',
      'Build scalable GraphQL and REST query interfaces',
      'Conduct query execution plan tuning and index maintenance',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-18T08:20:00Z',
  },
  {
    id: 'opp-006',
    title: 'Cloud Systems & DevOps Security Engineer',
    organization: 'CyberShield Systems',
    location: 'Remote (India)',
    workMode: 'remote',
    employmentType: 'contract',
    experienceLevel: 'senior',
    roleCategory: 'DevOps & Cloud',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines'],
    preferredSkills: ['Terraform', 'Python', 'Linux', 'Security Auditing'],
    description: 'Harden cloud security boundaries, zero-trust network configurations, and automated compliance verification across multi-cloud environments.',
    responsibilities: [
      'Author Terraform Infrastructure-as-Code modules for isolated VPC networks',
      'Implement container vulnerability scanning in continuous delivery pipelines',
      'Configure IAM policies, secrets rotation, and audit log aggregation',
      'Conduct regular penetration testing and vulnerability assessments',
    ],
    source: 'illustrative_demo',
    sourceLabel: 'ILLUSTRATIVE_DEMO_SOURCE',
    isIllustrativeDemo: true,
    publishedAt: '2026-09-14T10:15:00Z',
  },
];

/**
 * Deterministic Opportunity Matching Engine
 */
export function calculateOpportunityAlignment(
  opportunity: Opportunity,
  candidateSkills: CandidateSkillRecord[],
  candidateProjects: CandidateProfile['projects'] = []
): OpportunityAlignment {
  // Extract normalized candidate skill names
  const candidateSkillNamesSet = new Set<string>();
  
  candidateSkills.forEach((s) => {
    candidateSkillNamesSet.add(s.name.toLowerCase().trim());
  });

  // Also include technologies mentioned in candidate projects
  const projectTechSet = new Set<string>();
  candidateProjects.forEach((p) => {
    p.technologies.forEach((t) => {
      candidateSkillNamesSet.add(t.toLowerCase().trim());
      projectTechSet.add(t.toLowerCase().trim());
    });
  });

  const matchedRequiredSkills: string[] = [];
  const missingRequiredSkills: string[] = [];

  opportunity.requiredSkills.forEach((reqSkill) => {
    const normalized = reqSkill.toLowerCase().trim();
    if (candidateSkillNamesSet.has(normalized)) {
      matchedRequiredSkills.push(reqSkill);
    } else {
      missingRequiredSkills.push(reqSkill);
    }
  });

  const matchedPreferredSkills: string[] = [];
  const missingPreferredSkills: string[] = [];

  opportunity.preferredSkills.forEach((prefSkill) => {
    const normalized = prefSkill.toLowerCase().trim();
    if (candidateSkillNamesSet.has(normalized)) {
      matchedPreferredSkills.push(prefSkill);
    } else {
      missingPreferredSkills.push(prefSkill);
    }
  });

  // Supporting projects calculation
  let supportingProjectCount = 0;
  candidateProjects.forEach((proj) => {
    const projTechs = proj.technologies.map((t) => t.toLowerCase().trim());
    const satisfiesAnyReq = opportunity.requiredSkills.some((req) => 
      projTechs.includes(req.toLowerCase().trim())
    );
    if (satisfiesAnyReq) {
      supportingProjectCount++;
    }
  });

  // Deterministic Alignment Index formula
  const totalRequired = Math.max(1, opportunity.requiredSkills.length);
  const alignmentIndex = Math.round((matchedRequiredSkills.length / totalRequired) * 100);

  let alignmentGrade: 'HIGH_ALIGNMENT' | 'MODERATE_ALIGNMENT' | 'DEVELOPING_ALIGNMENT' = 'DEVELOPING_ALIGNMENT';
  if (alignmentIndex >= 70) {
    alignmentGrade = 'HIGH_ALIGNMENT';
  } else if (alignmentIndex >= 40) {
    alignmentGrade = 'MODERATE_ALIGNMENT';
  }

  // Generate traceably accurate explanation
  let explanation = '';
  if (alignmentGrade === 'HIGH_ALIGNMENT') {
    explanation = `Strong deterministic alignment (${alignmentIndex}%). Candidate demonstrates ${matchedRequiredSkills.length} of ${opportunity.requiredSkills.length} required capabilities (${matchedRequiredSkills.join(', ')}) backed by ${supportingProjectCount} project evidence artifacts.`;
  } else if (alignmentGrade === 'MODERATE_ALIGNMENT') {
    explanation = `Moderate alignment (${alignmentIndex}%). Matches core skills (${matchedRequiredSkills.join(', ')}). Target capabilities to acquire: ${missingRequiredSkills.join(', ')}.`;
  } else {
    explanation = `Developing alignment (${alignmentIndex}%). Currently matches ${matchedRequiredSkills.length > 0 ? matchedRequiredSkills.join(', ') : '0 required skills'}. Primary capability gap: ${missingRequiredSkills.join(', ')}.`;
  }

  return {
    opportunityId: opportunity.id,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    supportingProjectCount,
    alignmentIndex,
    alignmentGrade,
    explanation,
  };
}

/**
 * Persistence Services for Saved Opportunities
 */
export async function loadSavedOpportunities(): Promise<SavedOpportunity[]> {
  if (typeof window === 'undefined') return [];

  // Try Supabase first
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      const { data, error } = await supabase
        .from('candidate_saved_opportunities')
        .select('*')
        .eq('user_id', authData.user.id);

      if (!error && data && data.length > 0) {
        return data.map((d) => ({
          id: d.id,
          userId: d.user_id,
          opportunityId: d.opportunity_id,
          savedAt: d.saved_at,
          notes: d.notes,
        }));
      }
    }
  } catch (err) {
    console.warn('Supabase saved opportunities read error, using localStorage fallback:', err);
  }

  // LocalStorage Fallback
  try {
    const raw = localStorage.getItem(SAVED_OPPORTUNITIES_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('LocalStorage saved opportunities load error:', err);
  }

  return [];
}

export async function toggleSaveOpportunity(opportunityId: string): Promise<SavedOpportunity[]> {
  const existing = await loadSavedOpportunities();
  const isSaved = existing.some((s) => s.opportunityId === opportunityId);

  let updated: SavedOpportunity[];
  if (isSaved) {
    updated = existing.filter((s) => s.opportunityId !== opportunityId);
  } else {
    const newEntry: SavedOpportunity = {
      id: `saved-${Date.now()}`,
      userId: 'user-default',
      opportunityId,
      savedAt: new Date().toISOString(),
    };
    updated = [newEntry, ...existing];
  }

  // Persist LocalStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(SAVED_OPPORTUNITIES_KEY, JSON.stringify(updated));
  }

  // Persist Supabase if authenticated
  try {
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user) {
      if (isSaved) {
        await supabase
          .from('candidate_saved_opportunities')
          .delete()
          .eq('user_id', authData.user.id)
          .eq('opportunity_id', opportunityId);
      } else {
        await supabase.from('candidate_saved_opportunities').upsert({
          user_id: authData.user.id,
          opportunity_id: opportunityId,
          saved_at: new Date().toISOString(),
        });
      }
    }
  } catch (err) {
    console.warn('Supabase saved opportunities sync error:', err);
  }

  return updated;
}
