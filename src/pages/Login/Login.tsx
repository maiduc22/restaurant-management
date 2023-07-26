import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Grid,
  Image,
  MediaQuery,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { authActions } from '../../reducers/auth/auth.action';
import { LoginValues } from '../../reducers/auth/auth.types';
import bg from '../../assets/img/haidilao-bg.jpeg';
import logo from '../../assets/img/logo.png';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = (value: LoginValues) => {
    console.log(value);
    dispatch(
      authActions.Login(
        {
          username: value.username,
          password: value.password,
        },
        navigate
      )
    );
  };

  return (
    <Grid style={{ height: '100vh' }} align="center" justify="center">
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Grid.Col p={0} md={7}>
          <BackgroundImage src={bg}>
            <Box
              sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
              }}
            ></Box>
          </BackgroundImage>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col xs={12} md={5}>
        <Stack spacing="xs">
          <Center>
            <Image src={logo} height={56} width={56} />
          </Center>
          <Text align="center" fw="700" fz={28}>
            ĐĂNG NHẬP
          </Text>
          <Text align="center" color="dimmed" fz="xl">
            Chào mừng quay trở lại. Đăng nhập để tiếp tục
          </Text>
          <Center mt="sm">
            <Card shadow="md" w={360}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                  <TextInput
                    label="Tên đăng nhập"
                    placeholder="Nhập tên tài khoản"
                    icon={<IconUser size={14} />}
                    {...form.getInputProps('username')}
                  />
                  <TextInput
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    icon={<IconLock size={14} />}
                    {...form.getInputProps('password')}
                  />
                  <Button color="red" variant="filled" fullWidth type="submit">
                    Đăng nhập
                  </Button>
                </Stack>
              </form>
            </Card>
          </Center>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default Login;
