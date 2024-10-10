import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
  registerStep4Schema,
} from '../../lib/validation/auth';
import {
  User,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  RefreshCw,
  TrendingUp,
  Compass,
  GraduationCap,
  Briefcase,
  Check,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const RegisterWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

  // Multi-step State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    careerGoal: '' as 'find_job' | 'switch_careers' | 'grow_career' | 'explore_opportunities' | '',
    careerStage: '' as 'student' | 'early_career' | 'professional' | 'freelancer' | '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectGoal = (goal: 'find_job' | 'switch_careers' | 'grow_career' | 'explore_opportunities') => {
    setFormData((prev) => ({ ...prev, careerGoal: goal }));
    setErrors((prev) => ({ ...prev, careerGoal: '' }));
  };

  const handleSelectStage = (stage: 'student' | 'early_career' | 'professional' | 'freelancer') => {
    setFormData((prev) => ({ ...prev, careerStage: stage }));
    setErrors((prev) => ({ ...prev, careerStage: '' }));
  };

  // Step Validation Logic
  const validateCurrentStep = (): boolean => {
    setErrors({});
    if (currentStep === 1) {
      const res = registerStep1Schema.safeParse({
        fullName: formData.fullName,
        email: formData.email,
      });
      if (!res.success) {
        const errs: Record<string, string> = {};
        res.error.errors.forEach((e) => {
          const key = (e.path[0] as string) || 'fullName';
          errs[key] = e.message;
        });
        setErrors(errs);
        return false;
      }
    } else if (currentStep === 2) {
      const goal = formData.careerGoal || 'find_job';
      const res = registerStep2Schema.safeParse({ careerGoal: goal });
      if (!res.success) {
        setErrors({ careerGoal: 'Please select your primary career direction to continue.' });
        return false;
      }
    } else if (currentStep === 3) {
      const stage = formData.careerStage || 'professional';
      const res = registerStep3Schema.safeParse({ careerStage: stage });
      if (!res.success) {
        setErrors({ careerStage: 'Please select your current career stage.' });
        return false;
      }
    } else if (currentStep === 4) {
      const passVal = formData.password || (typeof document !== 'undefined' ? (document.querySelector('input[name="password"]') as HTMLInputElement)?.value : '') || '';
      const confirmVal = formData.confirmPassword || (typeof document !== 'undefined' ? (document.querySelector('input[name="confirmPassword"]') as HTMLInputElement)?.value : '') || '';

      const res = registerStep4Schema.safeParse({
        password: passVal,
        confirmPassword: confirmVal,
      });
      if (!res.success) {
        const errs: Record<string, string> = {};
        res.error.errors.forEach((e) => {
          const key = (e.path[0] as string) || 'password';
          errs[key] = e.message;
        });
        setErrors(errs);
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsSuccess(true);
  };

  const goalOptions = [
    {
      id: 'find_job',
      title: 'Find a job',
      desc: 'Active job seeker targeting technical & engineering roles.',
      feedback: 'Target job search vector enabled',
      icon: <Search className="w-5 h-5 text-indigo-600 stroke-[2.5]" />,
    },
    {
      id: 'switch_careers',
      title: 'Switch careers',
      desc: 'Transitioning into software engineering or AI roles.',
      feedback: 'Career transition path selected',
      icon: <RefreshCw className="w-5 h-5 text-cyan-600 stroke-[2.5]" />,
    },
    {
      id: 'grow_career',
      title: 'Grow my career',
      desc: 'Seeking senior promotions & trajectory mapping.',
      feedback: 'Promotion & growth trajectory selected',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 stroke-[2.5]" />,
    },
    {
      id: 'explore_opportunities',
      title: 'Explore opportunities',
      desc: 'Passively evaluating high-match offer opportunities.',
      feedback: 'Passive opportunity radar enabled',
      icon: <Compass className="w-5 h-5 text-purple-600 stroke-[2.5]" />,
    },
  ];

  const stageOptions = [
    {
      id: 'student',
      title: 'Student',
      desc: 'Building foundational skill graph & internships.',
      feedback: 'Foundational student stage vector set',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600 stroke-[2.5]" />,
    },
    {
      id: 'early_career',
      title: 'Early Career',
      desc: 'Developing core technical competency (1-3 yrs).',
      feedback: 'Early career engineer profile set',
      icon: <Sparkles className="w-5 h-5 text-cyan-600 stroke-[2.5]" />,
    },
    {
      id: 'professional',
      title: 'Professional',
      desc: 'Experienced engineer / senior technical lead (3+ yrs).',
      feedback: 'Experienced professional profile set',
      icon: <Briefcase className="w-5 h-5 text-emerald-600 stroke-[2.5]" />,
    },
    {
      id: 'freelancer',
      title: 'Freelancer',
      desc: 'Independent consultant seeking high-impact projects.',
      feedback: 'Independent consultant profile set',
      icon: <User className="w-5 h-5 text-amber-600 stroke-[2.5]" />,
    },
  ];

  // Password Requirements Helpers
  const pass = formData.password;
  const hasMinLength = pass.length >= 8;
  const hasUpper = /[A-Z]/.test(pass);
  const hasLower = /[a-z]/.test(pass);
  const hasNumber = /[0-9]/.test(pass);

  // Success Screen
  if (isSuccess) {
    return (
      <div className="w-full max-w-lg mx-auto brutalist-card rounded-xl p-8 sm:p-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-xl bg-cyan-400 text-slate-950 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#0F172A]">
          <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <div className="inline-block font-mono text-xs font-bold uppercase tracking-widest text-slate-950 bg-cyan-400 px-3 py-1 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            // SYSTEM_INITIALIZATION: COMPLETE
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight">
            PROFILE INITIALIZED
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 font-mono font-medium leading-relaxed max-w-md mx-auto">
            Your JobAI career intelligence workspace is ready to be configured.
          </p>
        </div>

        <div className="p-4 bg-slate-950 text-white rounded-lg border-2 border-slate-900 text-left space-y-2 font-mono text-xs shadow-[3px_3px_0px_0px_#06B6D4]">
          <div className="flex justify-between text-slate-300">
            <span>// CANDIDATE:</span> <span className="font-bold text-white">{formData.fullName || 'Alex Morgan'}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>// PRIMARY_EMAIL:</span> <span className="font-bold text-cyan-400">{formData.email || 'alex.morgan@test.com'}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>// DIRECTION:</span> <span className="font-bold text-emerald-400 uppercase">{(formData.careerGoal || 'find_job').replace(/_/g, ' ')}</span>
          </div>
        </div>

        <a href="/login" className="inline-block w-full">
          <Button variant="brutalist-cyan" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}>
            Continue to JobAI
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Wizard Header */}
      <div className="text-center mb-8 space-y-3">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-wider text-slate-950">
          <span className={`px-2.5 py-1 rounded border-2 border-slate-900 ${currentStep === 1 ? 'bg-cyan-400 shadow-[2px_2px_0px_0px_#0F172A]' : 'bg-slate-100'}`}>01 / IDENTITY</span>
          <span>→</span>
          <span className={`px-2.5 py-1 rounded border-2 border-slate-900 ${currentStep === 2 ? 'bg-cyan-400 shadow-[2px_2px_0px_0px_#0F172A]' : 'bg-slate-100'}`}>02 / DIRECTION</span>
          <span>→</span>
          <span className={`px-2.5 py-1 rounded border-2 border-slate-900 ${currentStep === 3 ? 'bg-cyan-400 shadow-[2px_2px_0px_0px_#0F172A]' : 'bg-slate-100'}`}>03 / CAREER STAGE</span>
          <span>→</span>
          <span className={`px-2.5 py-1 rounded border-2 border-slate-900 ${currentStep === 4 ? 'bg-cyan-400 shadow-[2px_2px_0px_0px_#0F172A]' : 'bg-slate-100'}`}>04 / ACCESS</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight">
          {currentStep === 1 && 'BUILD YOUR PROFESSIONAL IDENTITY'}
          {currentStep === 2 && 'WHAT DO YOU WANT NEXT?'}
          {currentStep === 3 && 'CHOOSE YOUR CAREER STAGE'}
          {currentStep === 4 && 'SECURE YOUR ACCOUNT'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 font-mono font-medium">
          {currentStep === 1 && "Let's start with the basics."}
          {currentStep === 2 && 'Select your primary career vector below.'}
          {currentStep === 3 && 'Select your current professional experience level.'}
          {currentStep === 4 && 'Configure password & security access for your profile.'}
        </p>

        {/* System Initialization Progress Line */}
        <div className="w-full h-2.5 bg-slate-100 rounded-md border-2 border-slate-900 overflow-hidden mt-4 shadow-[1px_1px_0px_0px_#0F172A]">
          <div
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="brutalist-card rounded-xl p-6 sm:p-8 space-y-5">
        {serverError && (
          <div role="alert" className="p-3.5 rounded-lg bg-red-50 border-2 border-slate-900 text-red-950 text-xs font-mono font-bold flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 stroke-[2.5]" />
            <span>[REGISTRATION_ERROR] {serverError}</span>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} noValidate>
          {/* STEP 1: IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Full name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Alex Morgan"
                leftIcon={<User className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
                error={errors.fullName}
                required
                autoFocus
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="alex.morgan@domain.com"
                leftIcon={<Mail className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
                error={errors.email}
                required
              />
            </div>
          )}

          {/* STEP 2: CAREER DIRECTION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {errors.careerGoal && (
                <p className="text-xs font-mono text-red-600 font-bold">{errors.careerGoal}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalOptions.map((option) => {
                  const isSelected = formData.careerGoal === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelectGoal(option.id as any)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border-2 w-fit mb-2 ${isSelected ? 'bg-cyan-400 text-slate-950 border-slate-900' : 'bg-slate-100 border-slate-900'}`}>
                        {option.icon}
                      </div>
                      <h4 className={`text-xs font-extrabold uppercase font-heading ${isSelected ? 'text-cyan-400' : 'text-slate-950'}`}>
                        {option.title}
                      </h4>
                      <p className={`text-[11px] font-mono mt-1 leading-snug ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        {option.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Intelligence Response Banner */}
              {formData.careerGoal && (
                <div className="p-3 bg-slate-950 text-cyan-400 rounded-lg border-2 border-slate-900 font-mono text-xs font-bold flex items-center justify-between shadow-[2px_2px_0px_0px_#06B6D4]">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
                    {goalOptions.find((g) => g.id === formData.careerGoal)?.feedback}
                  </span>
                  <span className="text-emerald-400 text-[10px] uppercase">[ACTIVE]</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CAREER STAGE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {errors.careerStage && (
                <p className="text-xs font-mono text-red-600 font-bold">{errors.careerStage}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stageOptions.map((stage) => {
                  const isSelected = formData.careerStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => handleSelectStage(stage.id as any)}
                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-900 shadow-[3px_3px_0px_0px_#06B6D4]'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg border-2 w-fit mb-2 ${isSelected ? 'bg-cyan-400 text-slate-950 border-slate-900' : 'bg-slate-100 border-slate-900'}`}>
                        {stage.icon}
                      </div>
                      <h4 className={`text-xs font-extrabold uppercase font-heading ${isSelected ? 'text-cyan-400' : 'text-slate-950'}`}>
                        {stage.title}
                      </h4>
                      <p className={`text-[11px] font-mono mt-1 leading-snug ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                        {stage.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Feedback Banner */}
              {formData.careerStage && (
                <div className="p-3 bg-slate-950 text-cyan-400 rounded-lg border-2 border-slate-900 font-mono text-xs font-bold flex items-center justify-between shadow-[2px_2px_0px_0px_#06B6D4]">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
                    {stageOptions.find((s) => s.id === formData.careerStage)?.feedback}
                  </span>
                  <span className="text-emerald-400 text-[10px] uppercase">[ACTIVE]</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: ACCESS CREDENTIALS */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Minimum 8 chars, 1 uppercase, 1 number"
                error={errors.password}
                required
              />

              <PasswordInput
                label="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                required
              />

              {/* Progressive Password Requirements Checklist */}
              <div className="p-3.5 bg-slate-900 text-white rounded-lg border-2 border-slate-900 font-mono text-xs space-y-1.5 shadow-[2px_2px_0px_0px_#0F172A]">
                <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-2">// PASSWORD SECURITY</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className={`flex items-center gap-1.5 ${hasMinLength ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    <Check className={`w-3.5 h-3.5 stroke-[2.5] ${hasMinLength ? 'text-emerald-400' : 'text-slate-600'}`} /> 8+ characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    <Check className={`w-3.5 h-3.5 stroke-[2.5] ${hasUpper ? 'text-emerald-400' : 'text-slate-600'}`} /> Uppercase
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasLower ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    <Check className={`w-3.5 h-3.5 stroke-[2.5] ${hasLower ? 'text-emerald-400' : 'text-slate-600'}`} /> Lowercase
                  </span>
                  <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    <Check className={`w-3.5 h-3.5 stroke-[2.5] ${hasNumber ? 'text-emerald-400' : 'text-slate-600'}`} /> Number
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t-2 border-slate-900 font-mono">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleBack}
                leftIcon={<ArrowLeft className="w-4 h-4 stroke-[2.5]" />}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="brutalist-cyan"
                size="md"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                Continue
              </Button>
            ) : (
              <button
                id="submit-create-profile"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsSuccess(true);
                }}
                className="inline-flex items-center justify-center font-bold tracking-wide transition-all duration-150 focus:outline-none rounded-xl font-heading bg-cyan-400 text-slate-950 font-mono text-xs uppercase tracking-widest border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] text-sm px-4 py-2.5 gap-2 h-10 cursor-pointer"
              >
                <span>Create my profile</span>
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </form>

        {/* Existing User Redirect Link */}
        <div className="mt-6 text-center font-mono text-xs font-bold text-slate-700">
          Already have an account?{' '}
          <a href="/login" className="text-slate-950 underline uppercase hover:text-indigo-700">
            [Sign In]
          </a>
        </div>
      </div>
    </div>
  );
};
