'use client'
import { Link } from "@/navigation";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/app/contexts/UserContextProvider";

export default function HeaderAvatar() {

  const user = useUser();
  
  return (
    <Link href="/me" className="w-10 h-10 bg-zinc-800 rounded-full mx-10">
      <Avatar src={user.avatar} alt="avatar" className="h-full w-full" />
    </Link>
  )
}
