
import IconPhotoProfile from '../../atoms/IconPhotoProfile'

import {
  Container,
  LogoContent,
  Logo,
  LogoName,
  NavList,
  LinkName,
  ProfileContent,
  Profile,
  ProfileDetails,
  NameJob,
  Name,
  Job,
  IconLogout,
  IconChartPie,
  IconCog,
  IconCplusplus,
  IconFillCartFill,
  IconFillChatLeftTextFill,
  IconFolder,
  IconGrid,
  IconHeartFill,
  IconOutlineMenu,
  IconOutlineUser,
  IconSearch,
  IconUserAlt
} from './styles'

export default function Sidebar() {
  return (
    <Container>
      <LogoContent>
        <Logo>
          <IconCplusplus />
          <LogoName>Parley</LogoName>
        </Logo>
        <IconOutlineMenu />
      </LogoContent>
      <NavList>
        <li>
          <a href="#">
            <IconSearch />
            <input type="text" placeholder="Search..." />
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconGrid />
            <LinkName>Dashboard</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconUserAlt />
            <LinkName>User</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconFillChatLeftTextFill />
            <LinkName>Messages</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconChartPie />
            <LinkName>Analytics</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconFolder />
            <LinkName>File Manager</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconFillCartFill />
            <LinkName>Order</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconHeartFill />
            <LinkName>Saved</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
        <li>
          <a href="#">
            <IconCog />
            <LinkName>Settings</LinkName>
          </a>
          {/* <LinkName>Dashboard</LinkName> */}
        </li>
      </NavList>

      <ProfileContent>
        <Profile>
          <ProfileDetails>
            <IconPhotoProfile />

            <NameJob>
              <Name>
                Wallace Moura
              </Name>
              <Job>
                Web designer
              </Job>

            </NameJob>
          </ProfileDetails>
          <IconLogout />

        </Profile>
      </ProfileContent>
    </Container>
  )
}