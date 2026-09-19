import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name is too long' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
});

export type RegisterStep1Data = z.infer<typeof registerStep1Schema>;

export const registerStep2Schema = z.object({
  careerGoal: z.enum(
    ['find_job', 'switch_careers', 'grow_career', 'explore_opportunities'],
    { required_error: 'Please select a career goal' }
  ),
});

export type RegisterStep2Data = z.infer<typeof registerStep2Schema>;

export const registerStep3Schema = z.object({
  careerStage: z.enum(
    ['student', 'early_career', 'professional', 'freelancer'],
    { required_error: 'Please select your current career stage' }
  ),
});

export type RegisterStep3Data = z.infer<typeof registerStep3Schema>;

export const registerStep4Schema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterStep4Data = z.infer<typeof registerStep4Schema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
