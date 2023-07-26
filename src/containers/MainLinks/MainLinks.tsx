import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import {
  IconBrandAirtable,
  IconListDetails,
  IconToolsKitchen2,
  IconUserCheck,
  IconUserShare,
  IconUsers,
} from '@tabler/icons-react';
import React from 'react';
import ROUTER from '../../config/router';
import { useNavigate } from 'react-router-dom';
import { isManager } from '../../utils/helpers';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
  managerOnly: boolean;
}

const MainLink = ({ icon, color, label, to, managerOnly }: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconToolsKitchen2 size="1rem" />,
    color: 'blue',
    label: 'Menu Đồ Ăn',
    to: ROUTER.NAV.MENU.INDEX,
    managerOnly: false,
  },
  {
    icon: <IconBrandAirtable size="1rem" />,
    color: 'violet',
    label: 'Danh Sách Bàn',
    to: ROUTER.NAV.TABLES.INDEX,
    managerOnly: false,
  },
  {
    icon: <IconListDetails size="1rem" />,
    color: 'teal',
    label: 'Quản Lý Đơn Hàng',
    to: ROUTER.NAV.ORDERS.INDEX,
    managerOnly: false,
  },

  {
    icon: <IconUserShare size="1rem" />,
    color: 'red',
    label: 'Quản Lý Khách Hàng',
    to: ROUTER.NAV.CUSTOMERS.INDEX,
    managerOnly: true,
  },
  {
    icon: <IconUsers size="1rem" />,
    color: 'grape',
    label: 'Quản Lý Nhân Viên',
    to: ROUTER.NAV.STAFFS.INDEX,
    managerOnly: true,
  },
];

const MainLinks = () => {
  if (!isManager()) {
    const filterData = data.filter((link) => !link.managerOnly);
    const links = filterData.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
  } else {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
  }
};

export default MainLinks;
