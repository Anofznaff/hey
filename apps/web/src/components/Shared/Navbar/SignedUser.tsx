import { Menu } from '@headlessui/react';
import { FeatureFlag } from '@hey/data/feature-flags';
import type { Profile } from '@hey/lens';
import getAvatar from '@hey/lib/getAvatar';
import getProfile from '@hey/lib/getProfile';
import { Image } from '@hey/ui';
import cn from '@hey/ui/cn';
import isFeatureEnabled from '@lib/isFeatureEnabled';
import type { FC } from 'react';
import { useAppStore } from 'src/store/useAppStore';
import { useGlobalModalStateStore } from 'src/store/useGlobalModalStateStore';

import MenuTransition from '../MenuTransition';
import Slug from '../Slug';
import { NextLink } from './MenuItems';
import MobileDrawerMenu from './MobileDrawerMenu';
import AppVersion from './NavItems/AppVersion';
import GardenerMode from './NavItems/GardenerMode';
import Invites from './NavItems/Invites';
import Logout from './NavItems/Logout';
import Mod from './NavItems/Mod';
import Pro from './NavItems/Pro';
import Settings from './NavItems/Settings';
import StaffMode from './NavItems/StaffMode';
import SwitchProfile from './NavItems/SwitchProfile';
import ThemeSwitch from './NavItems/ThemeSwitch';
import YourProfile from './NavItems/YourProfile';

const SignedUser: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setShowMobileDrawer = useGlobalModalStateStore(
    (state) => state.setShowMobileDrawer
  );
  const showMobileDrawer = useGlobalModalStateStore(
    (state) => state.showMobileDrawer
  );

  const Avatar = () => (
    <Image
      src={getAvatar(currentProfile as Profile)}
      className="h-8 w-8 cursor-pointer rounded-full border dark:border-gray-700"
      alt={currentProfile?.id}
    />
  );

  const openMobileMenuDrawer = () => {
    setShowMobileDrawer(true);
  };

  return (
    <>
      {showMobileDrawer ? <MobileDrawerMenu /> : null}
      <button
        className="focus:outline-none md:hidden"
        onClick={() => openMobileMenuDrawer()}
      >
        <Avatar />
      </button>
      <Menu as="div" className="hidden md:block">
        <Menu.Button className="outline-brand-500 flex self-center rounded-full">
          <Avatar />
        </Menu.Button>
        <MenuTransition>
          <Menu.Items
            static
            className="absolute right-0 mt-2 w-48 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-black"
          >
            <Menu.Item
              as={NextLink}
              href={getProfile(currentProfile).link}
              className="m-2 flex items-center rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <div className="flex w-full flex-col">
                <div>Logged in as</div>
                <div className="truncate">
                  <Slug
                    className="font-bold"
                    slug={getProfile(currentProfile).slugWithPrefix}
                  />
                </div>
              </div>
            </Menu.Item>
            <div className="divider" />
            <Menu.Item
              as="div"
              className={({ active }: { active: boolean }) =>
                cn(
                  { 'dropdown-active': active },
                  'm-2 rounded-lg border dark:border-gray-700'
                )
              }
            >
              <SwitchProfile />
            </Menu.Item>
            <div className="divider" />
            <Menu.Item
              as={NextLink}
              href={getProfile(currentProfile).link}
              className={({ active }: { active: boolean }) =>
                cn({ 'dropdown-active': active }, 'menu-item')
              }
            >
              <YourProfile />
            </Menu.Item>
            <Menu.Item
              as={NextLink}
              href="/settings"
              className={({ active }: { active: boolean }) =>
                cn({ 'dropdown-active': active }, 'menu-item')
              }
            >
              <Settings />
            </Menu.Item>
            {isFeatureEnabled(FeatureFlag.Gardener) ? (
              <Menu.Item
                as={NextLink}
                href="/mod"
                className={({ active }: { active: boolean }) =>
                  cn({ 'dropdown-active': active }, 'menu-item')
                }
              >
                <Mod />
              </Menu.Item>
            ) : null}
            <Menu.Item
              as="div"
              className={({ active }: { active: boolean }) =>
                cn({ 'dropdown-active': active }, 'm-2 rounded-lg')
              }
            >
              <Invites />
            </Menu.Item>
            {isFeatureEnabled(FeatureFlag.Pro) && (
              <Menu.Item
                as={NextLink}
                href="/pro"
                className={({ active }: { active: boolean }) =>
                  cn({ 'dropdown-active': active }, 'menu-item')
                }
              >
                <Pro />
              </Menu.Item>
            )}
            <Menu.Item
              as="div"
              className={({ active }) =>
                cn({ 'dropdown-active': active }, 'm-2 rounded-lg')
              }
            >
              <Logout />
            </Menu.Item>
            <div className="divider" />
            <Menu.Item
              as="div"
              className={({ active }) =>
                cn({ 'dropdown-active': active }, 'm-2 rounded-lg')
              }
            >
              <ThemeSwitch />
            </Menu.Item>
            {isFeatureEnabled(FeatureFlag.Gardener) ? (
              <Menu.Item
                as="div"
                className={({ active }) =>
                  cn(
                    { 'bg-yellow-100 dark:bg-yellow-800': active },
                    'm-2 rounded-lg'
                  )
                }
              >
                <GardenerMode />
              </Menu.Item>
            ) : null}
            {isFeatureEnabled(FeatureFlag.Staff) ? (
              <Menu.Item
                as="div"
                className={({ active }) =>
                  cn(
                    { 'bg-yellow-100 dark:bg-yellow-800': active },
                    'm-2 rounded-lg'
                  )
                }
              >
                <StaffMode />
              </Menu.Item>
            ) : null}
            <div className="divider" />
            <AppVersion />
          </Menu.Items>
        </MenuTransition>
      </Menu>
    </>
  );
};

export default SignedUser;
