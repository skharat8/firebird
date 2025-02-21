import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Feather } from "lucide-react";

import Button from "@/components/ui/Button";
import Header from "./Header";
import Navbar from "./Navbar";

function AppLayout() {
  // React Router Loader state is app wide, not per component. So, handle it here.
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const navigate = useNavigate();

  function createNewPost() {
    navigate("/new");
  }

  return (
    <>
      <Header />

      <main className="mx-auto flex min-w-full max-w-7xl grow justify-center gap-5 p-5">
        <Navbar className="top-[5rem] hidden h-fit gap-2 rounded-xl px-3 py-5 sm:flex sm:flex-col xl:w-80" />

        <div className="flex max-w-[60rem] flex-1 items-center justify-center">
          {isLoading && <BeatLoader color="#b63b63" />}
          <Outlet />
        </div>
      </main>

      <Navbar className="bottom-0 flex min-w-full max-w-7xl sm:hidden" />

      <Button
        size="rounded"
        className="fixed bottom-10 right-5"
        onClick={createNewPost}
      >
        <Feather />
      </Button>
    </>
  );
}

export default AppLayout;
