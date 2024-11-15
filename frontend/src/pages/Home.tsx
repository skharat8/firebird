import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import useToggle from "@/hooks/useToggle";
import useUser from "@/hooks/useUser";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { FaRetweet } from "react-icons/fa";

function Home() {
  const [like, toggleLike] = useToggle({ initialValue: false });
  const [retweet, toggleRetweet] = useToggle({ initialValue: false });
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Card>
        <CardHeader className="flex-row gap-4">
          <Avatar>
            <AvatarImage src={user?.profileImage} />
            <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(0)}`}</AvatarFallback>
          </Avatar>
          <h2>
            <p>{user?.fullName}</p>
            <span className="text-sm font-light">@{user?.username}</span>
          </h2>
        </CardHeader>

        <CardContent>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            rhoncus ipsum ut volutpat aliquet. Integer sollicitudin eleifend
            dui, sed euismod justo dapibus at. Praesent suscipit bibendum porta.
            Mauris ac consectetur turpis, feugiat convallis erat. Suspendisse
            sit amet velit massa. Curabitur ornare accumsan elit id dictum. Duis
            turpis tellus, molestie et lacus sit amet, pretium placerat dui.
            Morbi in venenatis mi, nec tempor mauris.
          </p>
        </CardContent>

        <CardFooter>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full px-6"
            onClick={toggleLike}
          >
            {like ? <HeartFilledIcon color="red" /> : <HeartIcon />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full px-6"
            onClick={toggleRetweet}
          >
            {retweet ? <FaRetweet color="green" /> : <FaRetweet />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Home;
