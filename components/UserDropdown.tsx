"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth.actions";
const UserDropdown = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleSubmit = async () => {
    await signOut();
    router.push("/sign_in");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className=" text-black gap-4 rounded-3xl flex items-center"
        >
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="">{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-center">
            <span className="text-base font-medium text-gray-400">
              {user.name}{" "}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400">
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              <AvatarFallback className="">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.name}{" "}
              </span>
              <span className="text-sm">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSubmit}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
