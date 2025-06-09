'use client'
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      imageUrl: user?.imageUrl,
    });
    console.log(result);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <div className="flex justify-between mt-1 text-sm text-gray-600">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Additional sidebar content can go here */}
        <div className="mt-auto">
          <UserButton />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Hello {user?.fullName || 'Guest'}</h2>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
