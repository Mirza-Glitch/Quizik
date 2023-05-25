import Link from "next/link";

function Navbar({ isExplore = true }) {
  return (
    <nav className="bg-white border border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 pl-4 md:px-10">
        <Link href="/" className="flex items-center">
          <img src="/puzzle.png" className="h-8 mr-3" alt="favicon" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Quizik
          </span>
        </Link>
        <div className="inline-flex">
          <Link
            href={isExplore ? "/explore" : "/"}
            className="rounded mr-1 border-2 border-white hover:border-gray-200 hover:bg-gray-50"
          >
            <img
              src={isExplore ? "/explore.svg" : "/home.svg"}
              className="m-1"
              height="25"
              width="25"
              alt="explore"
            />
          </Link>
          <Link
            href="/edit"
            className="rounded mr-1 border-2 border-white hover:border-gray-200 hover:bg-gray-50"
          >
            <img
              src="/person.svg"
              className="m-1"
              height="29"
              width="29"
              alt="edit"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
