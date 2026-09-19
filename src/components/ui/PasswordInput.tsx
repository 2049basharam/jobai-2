import React, { useState } from 'react';
import { Input } from './Input';
import type { InputProps } from './Input';
import { Eye, EyeOff, Lock } from 'lucide-react';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        leftIcon={<Lock className="w-4 h-4 text-slate-500 stroke-[2.5]" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-1"
            aria-label={showPassword ? 'Hide password text' : 'Show password text'}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Eye className="w-4 h-4 stroke-[2.5]" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
