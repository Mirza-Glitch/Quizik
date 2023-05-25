import { useRouter } from "next/router";

export default function BackBtn({ onclick }) {
  return (
    <button
      onClick={() => onclick()}
      className="bg-white border border-gray-50 rounded-2xl p-2 inline-block shadow-sm hover:bg-blue-400"
    >
      <img src="/back.svg" height="25" width="25" alt="back" />
    </button>
  );
}
export function GoBackBtn({ onclick }) {
  const router = useRouter();
  return (
    <div className="absolute top-4 left-4">
      <BackBtn onclick={() => router.back()} />
    </div>
  );
}
