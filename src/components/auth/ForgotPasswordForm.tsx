import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { forgotPasswordSchema } from '../../lib/validation/auth';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Supabase password reset link request
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      // Security requirement: Always show generic success message to prevent account enumeration
      setIsSubmitted(true);
    } catch (err) {
      // Always show generic success message
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Auth Box Header */}
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase font-heading tracking-tight">
          RESTORE ACCESS
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 font-mono font-medium max-w-xs mx-auto">
          Enter your email and we'll send instructions if an account exists.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="brutalist-card rounded-xl p-6 sm:p-8 space-y-5">
        {isSubmitted ? (
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-cyan-400 text-slate-950 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0F172A]">
              <CheckCircle className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <div className="inline-block font-mono text-xs font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-300 rounded">
                [DISPATCH_COMPLETE]
              </div>
              <h3 className="text-lg font-extrabold text-slate-950 uppercase font-heading">
                Instructions Dispatched
              </h3>
              <p className="text-xs font-mono text-slate-700 leading-relaxed font-medium">
                If an account exists for this email, recovery instructions have been sent.
              </p>
            </div>

            <div className="pt-2 font-mono">
              <a href="/login" className="inline-block w-full">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full uppercase font-bold"
                  leftIcon={<ArrowLeft className="w-4 h-4 stroke-[2.5]" />}
                >
                  Return to sign in
                </Button>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div role="alert" className="p-3.5 rounded-lg bg-red-50 border-2 border-slate-900 text-red-950 text-xs font-mono font-bold flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#EF4444]">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 stroke-[2.5]" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="candidate@jobai.io"
              leftIcon={<Mail className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
              required
              autoFocus
            />

            <div className="pt-2 space-y-3 font-mono">
              <Button
                type="submit"
                variant="brutalist-cyan"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              >
                Send recovery link
              </Button>

              <div className="text-center pt-2">
                <a
                  href="/login"
                  className="text-xs font-bold text-slate-900 hover:text-indigo-700 inline-flex items-center gap-1.5 uppercase underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" /> Back to sign in
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
