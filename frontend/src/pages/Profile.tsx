import ProfileFeed from "@/features/profile/ProfileFeed";
import useUser from "@/hooks/useUser";

function Profile() {
  const { user, isPending } = useUser();
  if (isPending) return <div>Profile</div>;

  return <ProfileFeed userId={user?.id} />;
}

export default Profile;
