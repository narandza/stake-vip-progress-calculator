import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        height={128}
        width={128}
        className="invert mt-6"
      />
    </div>
  );
}
