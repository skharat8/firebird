import { Outlet, useNavigate, useNavigation } from "react-router-dom";
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
  // React Router Loader state is app wide, not per component. So, handle it here.
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const navigate = useNavigate();

  function createNewPost() {
    navigate("/new");
  }

  return (
    <div className="flex-center-col min-h-full">
      <Header showAvatar={showAvatar} showBackButton={showBackButton} />

      <main className="dark:bg-secondary-50/60 mx-auto flex min-w-full grow justify-center gap-5">
        <Navbar
          className="xl:w-50 top-[5rem] ml-5 hidden h-fit gap-2 rounded-xl px-3 py-5 sm:flex
            sm:flex-col"
        />

        <div className="flex-center max-w-[65ch] flex-1">
          {isLoading && <GridLoader color="#b63b63" />}
          <Outlet />
        </div>
      </main>

      {showFooterNavbar && (
        <>
          <Navbar className="bottom-0 flex min-w-full sm:hidden" />

          <Button
            size="rounded"
            className="fixed bottom-10 right-5 md:hidden"
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
