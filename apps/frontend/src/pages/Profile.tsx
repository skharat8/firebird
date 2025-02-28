import ProfileFeed from "@/features/profile/ProfileFeed";
import useUser from "@/hooks/useUser";
import Header from "@/layouts/Header";
import { useParams } from "react-router-dom";

function Profile() {
  let { profileId } = useParams();
  const { user } = useUser();

  return (
    <div className="dark:bg-secondary-50/60 w-full">
      {profileId && <Header showBackButton={true} />}
      <ProfileFeed userId={profileId ? profileId : (user?.id ?? "")} />
    </div>
  );
}

export default Profile;
