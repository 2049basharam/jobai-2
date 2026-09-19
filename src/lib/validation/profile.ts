import { z } from 'zod';

export const profileIdentitySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name is too long' }),
});

export type ProfileIdentityFormData = z.infer<typeof profileIdentitySchema>;

export const careerDirectionSchema = z.object({
  primaryTargetRole: z
    .string()
    .max(100, { message: 'Target role title is too long' })
    .optional()
    .or(z.literal('')),
  careerGoal: z.enum(
    ['find_job', 'switch_careers', 'grow_career', 'explore_opportunities'],
    { required_error: 'Please select a career goal' }
  ),
  careerStage: z.enum(
    ['student', 'early_career', 'professional', 'freelancer'],
    { required_error: 'Please select your career stage' }
  ),
  location: z
    .string()
    .max(100, { message: 'Location is too long' })
    .optional()
    .or(z.literal('')),
  workMode: z.enum(['remote', 'hybrid', 'onsite', 'open'], {
    required_error: 'Please select preferred work mode',
  }),
});

export type CareerDirectionFormData = z.infer<typeof careerDirectionSchema>;

export const professionalSummarySchema = z.object({
  professionalSummary: z
    .string()
    .max(2000, { message: 'Professional summary cannot exceed 2000 characters' }),
});

export type ProfessionalSummaryFormData = z.infer<typeof professionalSummarySchema>;

export const experienceSchema = z.object({
  company: z
    .string()
    .min(1, { message: 'Company name is required' })
    .max(100, { message: 'Company name is too long' }),
  position: z
    .string()
    .min(1, { message: 'Position title is required' })
    .max(100, { message: 'Position title is too long' }),
  location: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().optional().or(z.literal('')),
  isCurrent: z.boolean().default(false),
  description: z.string().max(2000).optional().or(z.literal('')),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: z
    .string()
    .min(1, { message: 'Institution / University is required' })
    .max(120, { message: 'Institution name is too long' }),
  degree: z
    .string()
    .min(1, { message: 'Degree qualification is required' })
    .max(100, { message: 'Degree name is too long' }),
  fieldOfStudy: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
  isCurrent: z.boolean().default(false),
});

export type EducationFormData = z.infer<typeof educationSchema>;

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Project title is required' })
    .max(100, { message: 'Project title is too long' }),
  description: z.string().max(2000).optional().or(z.literal('')),
  role: z.string().max(100).optional().or(z.literal('')),
  projectUrl: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .optional()
    .or(z.literal('')),
  githubUrl: z
    .string()
    .url({ message: 'Please enter a valid GitHub URL' })
    .optional()
    .or(z.literal('')),
  technologies: z.array(z.string()).default([]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const certificationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Certification name is required' })
    .max(100, { message: 'Certification name is too long' }),
  issuingOrganization: z
    .string()
    .min(1, { message: 'Issuing organization is required' })
    .max(100, { message: 'Issuing organization is too long' }),
  issueDate: z.string().optional().or(z.literal('')),
  expiryDate: z.string().optional().or(z.literal('')),
  credentialId: z.string().optional().or(z.literal('')),
  credentialUrl: z
    .string()
    .url({ message: 'Please enter a valid credential URL' })
    .optional()
    .or(z.literal('')),
});

export type CertificationFormData = z.infer<typeof certificationSchema>;

export const linkSchema = z.object({
  label: z
    .string()
    .min(1, { message: 'Label is required' })
    .max(50, { message: 'Label is too long' }),
  url: z.string().min(1, { message: 'URL is required' }).url({ message: 'Please enter a valid URL (e.g. https://github.com/username)' }),
  type: z.enum(['github', 'linkedin', 'portfolio', 'twitter', 'other']).default('other'),
});

export type LinkFormData = z.infer<typeof linkSchema>;
