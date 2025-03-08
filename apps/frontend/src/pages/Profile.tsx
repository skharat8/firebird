import ProfileFeed from "@/features/profile/ProfileFeed";
import useUser from "@/hooks/useUser";
import { useParams } from "react-router-dom";

function Profile() {
  const { profileId } = useParams();
  const { user } = useUser();

  return <ProfileFeed userId={profileId ?? user?.id ?? ""} />;
}

export default Profile;
