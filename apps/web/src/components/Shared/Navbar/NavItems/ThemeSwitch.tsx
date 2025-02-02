import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import cn from "@hey/ui/cn";
import { useTheme } from "next-themes";
import type { FC } from "react";

interface ThemeSwitchProps {
  className?: string;
  onClick?: () => void;
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className = "", onClick }) => {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className={cn(
        "flex w-full items-center space-x-1.5 px-2 py-1.5 text-left text-gray-700 text-sm dark:text-gray-200",
        className
      )}
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        onClick?.();
      }}
      type="button"
    >
      {theme === "light" ? (
        <>
          <MoonIcon className="size-4" />
          <div>Dark mode</div>
        </>
      ) : (
        <>
          <SunIcon className="size-4" />
          <div>Light mode</div>
        </>
      )}
    </button>
  );
};

export default ThemeSwitch;
