import Feed from '@components/Feed';

export default function Home() {
  return (
    <main className="w-full flex flex-col  p-4 ">
      <div className="w-full flex items-center mt-5">
        <div className="flex flex-col gap-2 p-4">
          <h1 className="font-bold text-6xl text-white w-full h-full max-md:text-center">TO - BREW</h1>
          <p className="font-medium text-[1.3rem] text-justify text-white w-full max-md:text-center">Discover the art of brewing at your fingertips - our feature-rich note app grants you the power to record and organize your journey, unlocking new insights and discoveries along the way!</p>
        </div>
      </div>
      <Feed/>
    </main>
  );
}
