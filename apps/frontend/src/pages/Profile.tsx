import { useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

import ProfileFeed from "@/features/users/ProfileFeed";
import useUser from "@/hooks/useUser";

function Profile() {
  const { profileId } = useParams();
  const { user, isPending } = useUser();

  return (
    <>
      {isPending && <GridLoader color="#b63b63" />}
      {user && <ProfileFeed userId={profileId ?? user?.id} />}
    </>
  );
}

export default Profile;
