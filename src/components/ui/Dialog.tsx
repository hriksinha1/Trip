import React, { useEffect, useRef, useId } from "react";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const generatedId = useId();
  const titleId = `dialog-title-${generatedId}`;
  const descId = `dialog-desc-${generatedId}`;

  useEffect(() => {
    if (!isOpen) return;

    // Capture triggering element to restore focus on close
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Lock body scroll safely
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus: first interactive form field, else dialog container
    const timer = setTimeout(() => {
      if (!dialogRef.current) return;
      const firstInput = dialogRef.current.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])'
      );
      if (firstInput) {
        firstInput.focus();
      } else {
        dialogRef.current.focus();
      }
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs modal-backdrop-animate overflow-y-auto"
      onClick={() => onCloseRef.current()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E8E6E0] text-[#151515] my-auto modal-content-animate focus:outline-none"
      >
        <button
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 id={titleId} className="font-display text-2xl font-bold tracking-tight text-[#151515] pr-8">
          {title}
        </h3>

        {description && (
          <p id={descId} className="text-sm text-neutral-600 mt-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};
