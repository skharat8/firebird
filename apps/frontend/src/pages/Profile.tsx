import ProfileFeed from "@/features/profile/ProfileFeed";
import useUser from "@/hooks/useUser";
import { useParams } from "react-router-dom";

function Profile() {
  let { profileId } = useParams();
  const { user } = useUser();

  if (!profileId) profileId = user?.id ?? "";

  return <ProfileFeed userId={profileId} />;
}

export default Profile;
