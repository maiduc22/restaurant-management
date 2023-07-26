import { Avatar, Box, Group, Text, UnstyledButton, rem, useMantineTheme } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { RootState } from '../../redux/reducer';
import { decodeToken, parserRole } from '../../utils/helpers';

const User = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { profile, isFetching } = useSelector((state: RootState) => state.profile);
  const { role, fullname, image, username, hiredDate } = profile;

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
      >
        <Group onClick={() => navigate(ROUTER.AUTH.PROFILE)}>
          <Avatar src={image} radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {fullname ? fullname : username}
            </Text>
            <Text color="dimmed" size="xs">
              {parserRole(role)}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default User;
