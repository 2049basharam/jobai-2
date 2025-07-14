import { supabase } from './supabase';

export interface CandidateExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface CandidateEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface CandidateProject {
  id: string;
  title: string;
  description?: string;
  role?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export interface CandidateCertification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface CandidateLink {
  id: string;
  label: string;
  url: string;
  type: 'github' | 'linkedin' | 'portfolio' | 'twitter' | 'other';
}

export interface CandidateProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  professionalSummary: string;
  careerGoal: string;
  careerStage: string;
  primaryTargetRole: string;
  location: string;
  workMode: 'remote' | 'hybrid' | 'onsite' | 'open';
  experience: CandidateExperience[];
  education: CandidateEducation[];
  projects: CandidateProject[];
  certifications: CandidateCertification[];
  links: CandidateLink[];
  updatedAt: string;
}

export interface MissingProfileItem {
  key: string;
  label: string;
  priority: 'HIGH' | 'RECOMMENDED' | 'OPTIONAL';
  anchor: string;
}

export interface ProfileReadinessResult {
  score: number;
  completedCategories: number;
  totalCategories: number;
  missingItems: MissingProfileItem[];
}

/**
 * Deterministic Profile Readiness Calculation (100-point total)
 */
export function calculateProfileReadiness(profile: CandidateProfile | null): ProfileReadinessResult {
  if (!profile) {
    return {
      score: 0,
      completedCategories: 0,
      totalCategories: 7,
      missingItems: [
        { key: 'identity', label: 'Foundational Identity', priority: 'HIGH', anchor: 'identity' },
        { key: 'direction', label: 'Target Role & Direction', priority: 'HIGH', anchor: 'career' },
        { key: 'summary', label: 'Professional Summary', priority: 'HIGH', anchor: 'summary' },
        { key: 'experience', label: 'Work Experience', priority: 'HIGH', anchor: 'experience' },
        { key: 'education', label: 'Education History', priority: 'RECOMMENDED', anchor: 'education' },
        { key: 'projects', label: 'Projects & Repositories', priority: 'RECOMMENDED', anchor: 'projects' },
        { key: 'links', label: 'Professional Links', priority: 'RECOMMENDED', anchor: 'links' },
      ],
    };
  }

  let score = 0;
  const missingItems: MissingProfileItem[] = [];

  // 1. Foundational Identity (15%)
  const hasIdentity = Boolean(profile.fullName && profile.fullName.trim().length >= 2 && profile.email);
  if (hasIdentity) {
    score += 15;
  } else {
    missingItems.push({ key: 'identity', label: 'Foundational Identity', priority: 'HIGH', anchor: 'identity' });
  }

  // 2. Career Direction (20%)
  const hasTargetRole = Boolean(profile.primaryTargetRole && profile.primaryTargetRole.trim().length > 0);
  const hasGoalAndStage = Boolean(profile.careerGoal && profile.careerStage);
  if (hasTargetRole && hasGoalAndStage) {
    score += 20;
  } else if (hasGoalAndStage) {
    score += 10;
    missingItems.push({ key: 'direction', label: 'Primary Target Role Title', priority: 'HIGH', anchor: 'career' });
  } else {
    missingItems.push({ key: 'direction', label: 'Target Role & Direction', priority: 'HIGH', anchor: 'career' });
  }

  // 3. Professional Summary (15%)
  const hasSummary = Boolean(profile.professionalSummary && profile.professionalSummary.trim().length >= 20);
  if (hasSummary) {
    score += 15;
  } else {
    missingItems.push({ key: 'summary', label: 'Professional Summary (min 20 chars)', priority: 'HIGH', anchor: 'summary' });
  }

  // 4. Work Experience (20%)
  const hasExperience = Boolean(profile.experience && profile.experience.length > 0);
  if (hasExperience) {
    score += 20;
  } else {
    missingItems.push({ key: 'experience', label: 'Work Experience', priority: 'HIGH', anchor: 'experience' });
  }

  // 5. Education (10%)
  const hasEducation = Boolean(profile.education && profile.education.length > 0);
  if (hasEducation) {
    score += 10;
  } else {
    missingItems.push({ key: 'education', label: 'Education History', priority: 'RECOMMENDED', anchor: 'education' });
  }

  // 6. Projects (10%)
  const hasProjects = Boolean(profile.projects && profile.projects.length > 0);
  if (hasProjects) {
    score += 10;
  } else {
    missingItems.push({ key: 'projects', label: 'Projects & Repositories', priority: 'RECOMMENDED', anchor: 'projects' });
  }

  // 7. Links & Certifications (10%)
  const hasLinksOrCerts = Boolean(
    (profile.links && profile.links.length > 0) || (profile.certifications && profile.certifications.length > 0)
  );
  if (hasLinksOrCerts) {
    score += 10;
  } else {
    missingItems.push({ key: 'links', label: 'Professional Links / Certifications', priority: 'RECOMMENDED', anchor: 'links' });
  }

  const completedCategories = 7 - missingItems.length;

  return {
    score,
    completedCategories,
    totalCategories: 7,
    missingItems,
  };
}

// Local Storage Session Backup Key for smooth offline/client state operations
const LOCAL_PROFILE_STORAGE_KEY = 'jobai_candidate_profile_v2';

function getDefaultProfile(userId: string, email: string, fullName: string, goal = 'find_job', stage = 'professional'): CandidateProfile {
  const isDemo = userId === 'demo-candidate-01' || !fullName || fullName === 'Alex Morgan';

  return {
    id: `prof-${userId}`,
    userId,
    fullName: isDemo ? 'Shaik Rameez Basha' : fullName,
    email: isDemo ? 'shaikbasharam20@gmail.com' : email,
    professionalSummary: 'Computer Science and Engineering graduate specializing in Artificial Intelligence with hands-on experience building and testing real-world software products remotely. Experienced in full-stack development, Python/FastAPI, React/TypeScript, AI-assisted development, API design, databases, testing, security, and deployment.',
    careerGoal: goal,
    careerStage: stage,
    primaryTargetRole: 'Full-Stack AI/ML Engineer & Software Engineer',
    location: 'Piduguralla, Andhra Pradesh',
    workMode: 'remote',
    experience: [
      {
        id: 'exp-01',
        company: 'AfterQuery',
        position: 'Full-Stack Software Engineer — Testing & Evaluation',
        location: 'Remote',
        startDate: '2026-01',
        endDate: 'Present',
        isCurrent: true,
        description: 'Worked on software development, testing, and evaluation tasks across client-oriented codebases, translating requirements into working implementations. Reviewed implementations for correctness, edge cases, usability, and technical quality.',
      },
    ],
    education: [
      {
        id: 'edu-01',
        institution: 'Vasireddy Venkatadri Institute of Technology (JNTUK)',
        degree: 'B.Tech in Computer Science & Engineering (AI)',
        fieldOfStudy: 'Artificial Intelligence',
        startDate: '2020',
        endDate: '2024',
        isCurrent: false,
      },
    ],
    projects: [
      {
        id: 'proj-01',
        title: 'AfterQuery & RotorDyn Applications',
        role: 'Full-Stack Software Engineer',
        projectUrl: 'https://github.com/2049basharam',
        githubUrl: 'https://github.com/2049basharam',
        technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
        description: 'Engineered client-oriented web products and AI-assisted evaluation suites end-to-end.',
      },
      {
        id: 'proj-02',
        title: 'JobAI Candidate Platform V2',
        role: 'Lead Architect',
        projectUrl: 'https://github.com/2049basharam',
        githubUrl: 'https://github.com/2049basharam',
        technologies: ['Astro', 'React', 'Supabase', 'Tailwind CSS', 'Gemini AI'],
        description: 'Built spatial candidate career intelligence operating system featuring radial navigation and AI document ingestion.',
      },
    ],
    certifications: [],
    links: [
      {
        id: 'link-01',
        label: 'GitHub Profile',
        url: 'https://github.com/2049basharam',
        type: 'github',
      },
      {
        id: 'link-02',
        label: 'LinkedIn Profile',
        url: 'https://linkedin.com/in/shaik-rameez-basha-151740286',
        type: 'linkedin',
      },
    ],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Load authoritative candidate profile from Supabase with LocalStorage fallback
 */
export async function fetchCandidateProfile(): Promise<{ profile: CandidateProfile | null; error: string | null }> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id || 'demo-candidate-01';
    const userEmail = session?.user?.email || 'shaikbasharam20@gmail.com';
    const userMeta = session?.user?.user_metadata || {};
    const userName = userMeta.full_name || userMeta.fullName || 'Shaik Rameez Basha';
    const userGoal = userMeta.career_goal || userMeta.careerGoal || 'find_job';
    const userStage = userMeta.career_stage || userMeta.careerStage || 'professional';

    // Check Local Storage cache first for instant responsiveness
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`${LOCAL_PROFILE_STORAGE_KEY}_${userId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CandidateProfile;
          return { profile: parsed, error: null };
        } catch (_) {}
      }
    }

    // Try fetching from Supabase DB
    const { data: dbProfile, error: dbError } = await supabase
      .from('candidate_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!dbError && dbProfile) {
      // Fetch related records
      const [expRes, eduRes, projRes, certRes, linkRes] = await Promise.all([
        supabase.from('candidate_experience').select('*').eq('user_id', userId),
        supabase.from('candidate_education').select('*').eq('user_id', userId),
        supabase.from('candidate_projects').select('*').eq('user_id', userId),
        supabase.from('candidate_certifications').select('*').eq('user_id', userId),
        supabase.from('candidate_links').select('*').eq('user_id', userId),
      ]);

      const candidateProfile: CandidateProfile = {
        id: dbProfile.id,
        userId: dbProfile.user_id,
        fullName: dbProfile.full_name || userName,
        email: dbProfile.email || userEmail,
        professionalSummary: dbProfile.professional_summary || '',
        careerGoal: dbProfile.career_goal || userGoal,
        careerStage: dbProfile.career_stage || userStage,
        primaryTargetRole: dbProfile.primary_target_role || '',
        location: dbProfile.location || '',
        workMode: dbProfile.work_mode || 'hybrid',
        experience: (expRes.data || []).map((e: any) => ({
          id: e.id,
          company: e.company,
          position: e.position,
          location: e.location,
          startDate: e.start_date,
          endDate: e.end_date,
          isCurrent: e.is_current,
          description: e.description,
        })),
        education: (eduRes.data || []).map((e: any) => ({
          id: e.id,
          institution: e.institution,
          degree: e.degree,
          fieldOfStudy: e.field_of_study,
          startDate: e.start_date,
          endDate: e.end_date,
          isCurrent: e.is_current,
        })),
        projects: (projRes.data || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          role: p.role,
          projectUrl: p.project_url,
          githubUrl: p.github_url,
          technologies: p.technologies || [],
        })),
        certifications: (certRes.data || []).map((c: any) => ({
          id: c.id,
          name: c.name,
          issuingOrganization: c.issuing_organization,
          issueDate: c.issue_date,
          expiryDate: c.expiry_date,
          credentialId: c.credential_id,
          credentialUrl: c.credential_url,
        })),
        links: (linkRes.data || []).map((l: any) => ({
          id: l.id,
          label: l.label,
          url: l.url,
          type: l.type,
        })),
        updatedAt: dbProfile.updated_at || new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(`${LOCAL_PROFILE_STORAGE_KEY}_${userId}`, JSON.stringify(candidateProfile));
      }

      return { profile: candidateProfile, error: null };
    }

    // Fallback to default session profile
    const defaultProf = getDefaultProfile(userId, userEmail, userName, userGoal, userStage);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_PROFILE_STORAGE_KEY}_${userId}`, JSON.stringify(defaultProf));
    }

    return { profile: defaultProf, error: null };
  } catch (err: any) {
    console.warn('[JobAI Profile] DB load warning, using local fallback:', err?.message);
    const fallbackProf = getDefaultProfile('demo-candidate-01', 'candidate@jobai.io', 'Alex Morgan');
    return { profile: fallbackProf, error: null };
  }
}

/**
 * Persist candidate profile state
 */
export async function saveCandidateProfile(profile: CandidateProfile): Promise<{ success: boolean; error: string | null }> {
  try {
    profile.updatedAt = new Date().toISOString();

    // Save to LocalStorage cache
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_PROFILE_STORAGE_KEY}_${profile.userId}`, JSON.stringify(profile));
    }

    // Upsert into Supabase candidate_profiles if database is connected
    const { error: dbError } = await supabase.from('candidate_profiles').upsert({
      id: profile.id,
      user_id: profile.userId,
      full_name: profile.fullName,
      email: profile.email,
      professional_summary: profile.professionalSummary,
      career_goal: profile.careerGoal,
      career_stage: profile.careerStage,
      primary_target_role: profile.primaryTargetRole,
      location: profile.location,
      work_mode: profile.workMode,
      updated_at: profile.updatedAt,
    });

    if (dbError) {
      console.warn('[JobAI Profile] Supabase upsert notice:', dbError.message);
    }

    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to save profile' };
  }
}
