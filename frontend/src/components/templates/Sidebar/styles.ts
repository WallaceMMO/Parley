import styled  from 'styled-components';

import {SiCplusplus} from 'react-icons/si'
import {AiOutlineMenu, AiOutlineUser} from 'react-icons/ai'
import {BsGrid, BsSearch, BsFillChatLeftTextFill, BsFillCartFill, BsHeartFill} from 'react-icons/bs'
import {FaUserAlt, FaChartPie, FaFolder, FaCog} from 'react-icons/fa'
import {GrLogout} from 'react-icons/gr'

export const Container = styled.div`
  height: 100%;
  width: 240px;
  background-color: #11101d;
  position: fixed;
  top: 0;
  left: 0;
  padding: 6px 14px;
`;


export const LogoContent = styled.div`

`

export const Logo = styled.div`
  color: #fff;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;

  *
`

export const LogoName = styled.div`
  font-size: 20px;
  font-weight: 400;
`


export const NavList = styled.ul`
  margin-top: 20px;

  li:first-child {
    height: 40px;
  }
  li {
    positions: relative;
    width: 100%;
    margin: 0 5px;
    height: 50px;
    list-style: none;
    line-height: 50px;
  }

  li a{
    color: #fff;
    display: flex;
    align-items: center;

    text-decoration: none;
    transitions: all 0.4s ease;
    border-radius: 12px;
  }

  li input{
    position: relative;
    height: 40px;
    width: 100%;
    left: 0;
    top: 0;

    border-radius: 12px;
    outline: none;
    border: none;
    background: #1d1b31;
    padding-left: 50px;
    font-size: 18px;
    color: #fff;
  }

  li a:hover{
    background: #fff;
    color: #11101d;
  }
`

export const LinkName = styled.span`

`

export const ProfileContent = styled.div`
  position: absolute;
  color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
`

export const Profile = styled.div`
  position: relative;
  padding: 10px 6px;
  height: 60px;
`

export const ProfileDetails = styled.div`
  display: flex;
  align-items: center;

`

export const NameJob = styled.div`
  margin-left: 10px;

`

export const Name = styled.div`
  font-size: 15px;
  font-weight: 400;
`

export const Job = styled.div`
  font-size: 12px;
`

export const IconLogout = styled(GrLogout)`
  position: absolute;
  left: 88%;
  bottom: 10px;
  transform: translateX(-50%);
  min-width: 30px;
  height: 30px;
  color: #fff;
`

export const IconCplusplus = styled(SiCplusplus)`

`

const stylesIcon = `
  margin-right: 10px;
  margin-left: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 12px;
  line-height: 30px;

  align-items: center;
`

export const IconOutlineMenu = styled(AiOutlineMenu)`
  position: absolute;
  color: #fff;
  left: 90%;
  top: 17px;
  font-size: 20px;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 50px;

  transform: translateX(-50%);
`

export const IconOutlineUser = styled(AiOutlineUser)`
  ${stylesIcon}
`

export const IconGrid = styled(BsGrid)`
  ${stylesIcon}
`

export const IconSearch = styled(BsSearch)`
    position: absolute;
    z-index: 99;
    color: #fff;
  
    ${stylesIcon}
`

export const IconFillChatLeftTextFill = styled(BsFillChatLeftTextFill)`
  ${stylesIcon}
`

export const IconFillCartFill = styled(BsFillCartFill)`
  ${stylesIcon}
`

export const IconHeartFill = styled(BsHeartFill)`
  ${stylesIcon}
`

export const IconUserAlt = styled(FaUserAlt)`
  ${stylesIcon}
`

export const IconChartPie = styled(FaChartPie)`
  ${stylesIcon}
`

export const IconFolder = styled(FaFolder)`
  ${stylesIcon}
`

export const IconCog = styled(FaCog)`
  ${stylesIcon}
`