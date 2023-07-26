import { ActionIcon, Badge, Card, Grid, Group, Image, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import { decodeToken, parserRole } from '../../utils/helpers';
import { useDisclosure } from '@mantine/hooks';
import EditProfileModal from './EditProfileModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import dayjs from 'dayjs';

const renderHeading = (children: string) => (
  <Text fz="md" fw={600}>
    {children}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const Profile = () => {
  const { profile, isFetching } = useSelector((state: RootState) => state.profile);

  const [opened, { open, close }] = useDisclosure();
  const { role, fullname, image, username, hiredDate } = profile;

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Trang cá nhân
          </Text>
          <Tooltip label="Chỉnh sửa trang cá nhân">
            <ActionIcon onClick={open}>
              <IconEdit size={20} color="black" />
            </ActionIcon>
          </Tooltip>
        </Group>

        <Grid m="md" gutter={32}>
          <Grid.Col span="auto">
            <Grid gutter={32}>
              <Grid.Col span={5}>
                <Stack justify="space-between" spacing="sm">
                  {renderHeading('Họ và tên')}
                  {renderHeading('Ngày bắt đầu làm việc')}
                  {renderHeading('Tên tài khoản')}
                  {renderHeading('Vị trí')}
                </Stack>
              </Grid.Col>
              <Grid.Col span={7}>
                <Stack justify="space-between" spacing="sm">
                  {renderField(fullname ? fullname : 'Đang cập nhật...')}
                  {renderField(hiredDate ? dayjs(hiredDate).format('DD/MM/YYYY') : 'Đang cập nhật...')}
                  {renderField(username ? username : 'Đang cập nhật...')}
                  {renderField(role ? parserRole(role) : 'Đang cập nhật...')}
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span="content">
            <Image width={300} height={300} src={image} />
          </Grid.Col>
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Sửa thông tin cá nhân">
        <EditProfileModal close={close} profile={profile} />
      </Modal>
    </>
  );
};

export default Profile;
