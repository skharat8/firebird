import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { GridLoader } from "react-spinners";

import PostEditorModal from "@/features/posts/PostEditorModal";

import Header from "./Header";
import Navbar from "./Navbar";

type AppLayoutProps = {
  showAvatar?: boolean;
  showBackButton?: boolean;
  showFooterNavbar?: boolean;
};

function AppLayout({
  showAvatar,
  showBackButton,
  showFooterNavbar,
}: AppLayoutProps) {
  return (
    <div className="flex-center-col min-h-full dark:bg-neutral-900">
      <Header showAvatar={showAvatar} showBackButton={showBackButton} />

      <main className="mx-auto flex min-w-full grow justify-center gap-5">
        <Navbar
          className="xl:w-50 top-[5rem] ml-5 hidden h-fit gap-2 rounded-xl p-3 sm:flex sm:flex-col
            sm:gap-1"
        />

        <div className="flex-center max-w-[70ch] flex-1">
          <Suspense fallback={<GridLoader color="var(--color-primary)" />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      {showFooterNavbar && (
        <>
          <Navbar className="border-t-1 bottom-0 flex min-w-full border-t-neutral-500/30 sm:hidden" />
          <PostEditorModal />
        </>
      )}
    </div>
  );
}

export default AppLayout;
