import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
} from "@/modules/constants/constants";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex flex-col items-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        height={DEFAULT_LOGO_HEIGHT}
        width={DEFAULT_LOGO_WIDTH}
        className="invert mt-6"
      />

      <div className="mt-10 ">
        <h1 className="text-xl">Stake VIP Progress Calculator</h1>
      </div>
    </header>
  );
};
