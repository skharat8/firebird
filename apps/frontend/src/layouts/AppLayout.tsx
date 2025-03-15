import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";

import { Feather } from "lucide-react";

import Button from "@/components/ui/Button";

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
  const navigate = useNavigate();

  function createNewPost() {
    navigate("/new");
  }

  return (
    <div className="flex-center-col min-h-full bg-card-50 dark:bg-neutral-900">
      <Header showAvatar={showAvatar} showBackButton={showBackButton} />

      <main className="mx-auto flex min-w-full grow justify-center gap-5">
        <Navbar
          className="xl:w-50 top-[5rem] ml-5 hidden h-fit gap-2 rounded-xl p-3 sm:flex sm:flex-col
            sm:gap-1"
        />

        <div className="flex-center max-w-[65ch] flex-1">
          <Suspense fallback={<GridLoader color="#b63b63" />}>
            <Outlet />
          </Suspense>
        </div>
      </main>

      {showFooterNavbar && (
        <>
          <Navbar className="border-t-1 bottom-0 flex min-w-full border-t-neutral-500/30 sm:hidden" />

          <Button
            size="rounded"
            className="shadow-secondary fixed bottom-16 right-7 shadow-[0px_1px_2px_1px] md:hidden"
            onClick={createNewPost}
          >
            <Feather />
          </Button>
        </>
      )}
    </div>
  );
}

export default AppLayout;
