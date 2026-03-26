"use client";

import { AlertFill, CheckCircle } from "@/components/icons";
import MainLayout from "@/components/layout/MainLayout";
import { Toaster } from "sonner";

const AppContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "16px",
            border: "none",
            backgroundColor: "#27272B",
            color: "#F8F8F9",
            backdropFilter: "blur(2px)",
            padding: "16px",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.10)",
            alignItems: "start",
            gap: "8px",
          },
          descriptionClassName: "!text-text-neutral-secondary",
          classNames: {
            cancelButton:
              "bg-transparent hover:!bg-bg-neutral-3 !text-text-neutral-tertiary !hover:text-text-neutral-tertiary p-1 rounded-md text-xl font-bold transition-colors min-w-0 w-auto h-auto flex items-center justify-center",
          },
        }}
        icons={{
          success: <CheckCircle className="text-xl mt-2" />,
          error: <AlertFill className="text-danger mt-2" />,
        }}
      />
    </>
  );
};

export default AppContent;
