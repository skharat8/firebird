import useWhoToFollow from "@/features/users/useWhoToFollow";

function Trending() {
  const { data } = useWhoToFollow();
  return <div>Trending</div>;
}

export default Trending;
