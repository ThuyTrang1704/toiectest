import React, { useState } from 'react';
import {HomeOutlined,UserOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import {
  HomeIcon,
  ClockIcon,
  UserCircleIcon,
  UserGroupIcon,
  PlusCircleIcon,
  DocumentPlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    label: 'Admin',
    type: 'group',
    children: [
      {  key: '11',
        icon: <HomeOutlined />,
         label: (
        <Link to="/admin">
          Dashboard
        </Link>
      )}
  ]
  },
  {
    key: '2',
    label: 'Data',
    type: 'group',
    children: [
      {
        key: '21',
        label: 'Users',
        icon: <UserOutlined />,
        children: [
          {
            key: '211',
            icon: <UserOutlined />,
         label: (
        <Link to="/user">
          User
        </Link>)
          },
          {
            key: '232',
            icon: <UserOutlined />,
            label: (
           <Link to="/Roleadmin">
            Admin
           </Link>)
          },
        ],
      },
      {
        key: '22',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/level">
         Level
        </Link>)
      },
      {
        key: '23',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/skill">
         Skill
        </Link>)
      },
      {
        key: '24',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/part">
         Part
        </Link>)
      },
      {
        key: '25',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/topic">
         Topic
        </Link>)
      },
      {
        key: '26',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/question">
         Question
        </Link>)
      },
      {
        key: '27',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/structure">
         Structure
        </Link>)
      },
      {
        key: '28',
        icon: <PlusCircleOutlined />,
         label: (
        <Link to="/result">
         Result
        </Link>)
      },
    ],
  },
  
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const navSidebar = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
  );
};
export default navSidebar;