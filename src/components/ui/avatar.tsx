"use client";

import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border-2 border-black/10",
  {
    variants: {
      size: {
        xs: "h-5 w-5",
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
        xl: "h-12 w-12",
        "2xl": "h-16 w-16",
        "3xl": "h-20 w-20",
        "4xl": "h-24 w-24",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const avatarImageVariants = cva("aspect-square h-full w-full object-cover");

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-medium text-white uppercase",
  {
    variants: {
      size: {
        xs: "text-[10px] leading-none",
        sm: "text-xs leading-none",
        md: "text-sm leading-none",
        lg: "text-base leading-none",
        xl: "text-lg leading-none",
        "2xl": "text-xl leading-none",
        "3xl": "text-2xl leading-none",
        "4xl": "text-[28px] leading-none",
      },
      variant: {
        neutral: "bg-neutral-700",
        yellow: "bg-yellow-500",
        lime: "bg-lime-500",
        teal: "bg-teal-500",
        indigo: "bg-indigo-500",
        pink: "bg-pink-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "neutral",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn(avatarImageVariants({ className }))}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, size, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarFallbackVariants({ size, variant, className }))}
      {...props}
    />
  )
);
AvatarFallback.displayName = "AvatarFallback";

// Utility function to get initials from a name
export const getInitials = (name: string): string => {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

// Utility function to get a consistent color variant based on a string
export const getVariantFromString = (
  str: string
): "neutral" | "yellow" | "lime" | "teal" | "indigo" | "pink" => {
  if (!str) return "neutral";

  const variants = [
    "neutral",
    "yellow",
    "lime",
    "teal",
    "indigo",
    "pink",
  ] as const;
  const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return variants[hash % variants.length];
};

// Complete Avatar component with automatic fallback
export interface CompleteAvatarProps extends AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  fallbackVariant?:
    | "neutral"
    | "yellow"
    | "lime"
    | "teal"
    | "indigo"
    | "pink"
    | "auto";
}

const CompleteAvatar = React.forwardRef<HTMLDivElement, CompleteAvatarProps>(
  (
    {
      src,
      alt,
      name = "",
      fallbackVariant = "auto",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const initials = getInitials(name);
    const variant =
      fallbackVariant === "auto" ? getVariantFromString(name) : fallbackVariant;

    const shouldShowFallback = !src || imageError || !initials;

    return (
      <Avatar ref={ref} size={size} className={className} {...props}>
        {src && !imageError && (
          <AvatarImage
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
          />
        )}
        {shouldShowFallback && (
          <AvatarFallback size={size} variant={variant as any}>
            {initials || "?"}
          </AvatarFallback>
        )}
      </Avatar>
    );
  }
);
CompleteAvatar.displayName = "CompleteAvatar";

export {
  Avatar,
  AvatarFallback,
  avatarFallbackVariants,
  AvatarImage,
  avatarImageVariants,
  avatarVariants,
  CompleteAvatar,
};
