import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { H6 } from "@hey/ui";
import cn from "@hey/ui/cn";
import { useFlag } from "@unleash/proxy-client-react";
import type { FC } from "react";
import { useProfileStore } from "src/store/persisted/useProfileStore";
import MenuTransition from "../MenuTransition";
import Analytics from "./NavItems/Analytics";
import Bookmarks from "./NavItems/Bookmarks";
import Lists from "./NavItems/Lists";
import Support from "./NavItems/Support";
const MoreNavItems: FC = () => {
  const { currentProfile } = useProfileStore();
  const listsEnabled = useFlag("lists");

  return (
    <Menu as="div">
      {({ open }) => (
        <>
          <MenuButton
            className={cn(
              "w-full cursor-pointer rounded-md px-2 py-1 text-left tracking-wide md:px-3",
              {
                "bg-gray-200 text-black dark:bg-gray-800 dark:text-white": open,
                "text-gray-700 hover:bg-gray-200 hover:text-black dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white":
                  !open
              }
            )}
          >
            <H6>More</H6>
          </MenuButton>
          <MenuTransition>
            <MenuItems
              className="absolute mt-2 rounded-xl border bg-white shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-900"
              static
            >
              {currentProfile ? (
                <>
                  <MenuItem
                    as="div"
                    className={({ focus }: { focus: boolean }) =>
                      cn({ "dropdown-active": focus }, "m-2 rounded-lg")
                    }
                  >
                    <Bookmarks />
                  </MenuItem>
                  {listsEnabled && (
                    <MenuItem
                      as="div"
                      className={({ focus }: { focus: boolean }) =>
                        cn({ "dropdown-active": focus }, "m-2 rounded-lg")
                      }
                    >
                      <Lists />
                    </MenuItem>
                  )}
                  <MenuItem
                    as="div"
                    className={({ focus }: { focus: boolean }) =>
                      cn({ "dropdown-active": focus }, "m-2 rounded-lg")
                    }
                  >
                    <Analytics />
                  </MenuItem>
                  <div className="divider" />
                </>
              ) : null}
              <MenuItem
                as="div"
                className={({ focus }: { focus: boolean }) =>
                  cn({ "dropdown-active": focus }, "m-2 rounded-lg")
                }
              >
                <Support />
              </MenuItem>
            </MenuItems>
          </MenuTransition>
        </>
      )}
    </Menu>
  );
};

export default MoreNavItems;
