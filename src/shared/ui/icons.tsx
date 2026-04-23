import type { SVGProps } from "react";

export type AppIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function withSize(size: number | undefined) {
  return size ?? 20;
}

export function HomeIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function ShoppingBagIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 9a3 3 0 1 1 6 0" />
    </svg>
  );
}

export function BookOpenIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M2 5a3 3 0 0 1 3-3h6v18H5a3 3 0 0 0-3 3V5Z" />
      <path d="M22 5a3 3 0 0 0-3-3h-6v18h6a3 3 0 0 1 3 3V5Z" />
    </svg>
  );
}

export function PhoneIncomingIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m16 2 5 5" />
      <path d="M21 2v5h-5" />
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1.8.3 1.6.6 2.3a2 2 0 0 1-.4 2.1L9 10.3a16 16 0 0 0 4.7 4.7l1.2-1.2a2 2 0 0 1 2.1-.4c.7.3 1.5.5 2.3.6A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

export function CreditCardIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
    </svg>
  );
}

export function TruckIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 4h13v11H1z" />
      <path d="M14 8h4l3 3v4h-7z" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  );
}

export function FlashIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

export function MenuIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function CloseIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function ChevronDownIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function UserIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function SearchIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HeartIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.8 5.8a5 5 0 0 0-7 0L12 7.6l-1.8-1.8a5 5 0 1 0-7 7L12 21.6l8.8-8.8a5 5 0 0 0 0-7Z" />
    </svg>
  );
}

export function CartIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="9" cy="20" r="1.8" />
      <circle cx="18" cy="20" r="1.8" />
      <path d="M2 3h2l2.3 11.2a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size, ...props }: AppIconProps) {
  const iconSize = withSize(size);
  return (
    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
