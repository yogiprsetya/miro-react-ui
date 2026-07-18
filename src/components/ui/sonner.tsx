import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  Loader2Icon,
  X,
  XCircle,
} from 'lucide-react';
import { cn } from '~/lib/utils';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      icons={{
        success: <CircleCheckIcon />,
        info: <InfoIcon />,
        warning: <TriangleAlertIcon />,
        error: <XCircle />,
        loading: <Loader2Icon className="animate-spin" />,
        close: <X className="size-3" />,
      }}
      style={
        {
          '--success-title': 'var(--color-success-600)',
          '--error-title': 'var(--color-error-600)',
          '--info-text': 'var(--color-primary-600)',
          '--warning-text': 'var(--color-warning-600)',
        } as React.CSSProperties
      }
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'flex rounded-md gap-3 shadow-elevation-2! border border-neutral-200! bg-neutral-50! overflow-hidden p-3'
          ),
          icon: 'size-6',
          closeButton:
            'bg-transparent! text-neutral-700! size-6! absolute right-3 top-3 flex items-center justify-center',
          title: 'font-semibold text-base',
          content: 'space-y-1',
          description: 'text-neutral-700! pr-6',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
