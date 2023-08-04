"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <div className="w-full h-[80px] py-4 text-4xl flex justify-between items-center gap-2  px-8 shadow-md">
      <Link href="/" className="flex gap-2 items-center">
        <Image
          src="./logo.svg"
          width={50}
          height={50}
          alt="logo"
          className="object-contain"
        />
        <h1 className="max-md:hidden flex  text-[1.3rem] text-white font-medium">
          To - Brew
        </h1>
      </Link>

      {/* Desktop navbar */}
      <div className="max-md:hidden flex">
        {session?.user ? (
          <div className="flex items-center gap-4 cursor-pointer">
            <Link href="/create-note" className="solid_button">
              Create Note
            </Link>
            <button
              type="button"
              className="w-full text-[1rem] outline_button"
              onClick={signOut}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="relative rounded-full"
                src={session?.user.image}
                width={50}
                height={50}
                alt="logo"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="solid_button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navbar */}
      <div className="max-md:flex hidden">
        {session?.user ? (
          <div className="flex items-center gap-4 cursor-pointer">
            <Image
              className="relative  rounded-full"
              src={session?.user.image}
              width={50}
              height={50}
              alt="logo"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropDown && (
              <div className="flex flex-col items-end  bg-white p-4 text-[1rem] rounded-md absolute top-[4rem] right-8">
                <Link
                  href="/profile"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-note"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                >
                  Create-Note
                </Link>

                <button
                  onClick={() => {
                    setToggleDropDown((prev) => !prev);
                    signOut();
                  }}
                  type="button"
                  className="w-full text-[1rem] solid_button mt-5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="solid_button"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
