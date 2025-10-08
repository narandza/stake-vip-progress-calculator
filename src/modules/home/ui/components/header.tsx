import {
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_WIDTH,
} from "@/modules/constants/constants";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="flex flex-col items-center gap-y-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        height={DEFAULT_LOGO_HEIGHT}
        width={DEFAULT_LOGO_WIDTH}
        className="invert mt-6"
      />

      <h1 className="text-2xl font-bold">Stake VIP Progress Calculator</h1>
    </header>
  );
};
