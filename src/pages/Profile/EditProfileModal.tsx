import { Button, Flex, Group, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import lodash from 'lodash';
import React from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { Profile } from '../../types/models/profile';
import { decodeToken, handleUploadImageOnFirebase } from '../../utils/helpers';
import { notifications } from '@mantine/notifications';
import { profileAction } from '../../reducers/profile/profile.action';

interface Props {
  profile: Profile;
  close: () => void;
}

const EditProfileModal: React.FC<Props> = ({ profile, close }) => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const { fullname, image, Role } = profile;

  const decodedToken = decodeToken();

  const initialValues: Partial<Profile> = { fullname, image, Role };
  const form = useForm({
    initialValues,
    validate: {
      fullname: isNotEmpty('Bạn chưa nhập họ tên!'),
    },
  });

  const handleUpdateProfile = (values: Partial<Profile>) => {
    console.log(values);
    if (!values.image) return;
    if (lodash.isEqual(values, initialValues)) {
      notifications.show({
        withCloseButton: true,
        title: 'Thông báo',
        message: 'Bạn chưa thay đổi thông tin!',
        color: 'red',
        icon: <IconX size={16} />,
        autoClose: 1200,
      });
      return;
    }
    dispatch(
      profileAction.updateProfille(
        {
          fullname: values.fullname,
          image: values.image,
          username: decodedToken.username,
        },
        {
          onSuccess: () => {
            if (decodedToken.username) {
              dispatch(profileAction.getProfileByUsername(decodedToken.username));
              close();
            }
          },
        }
      )
    );
  };

  return (
    <form id="form-edit-profile" onSubmit={form.onSubmit((values) => handleUpdateProfile(values))}>
      <Flex direction={'column'} gap={'sm'}>
        <TextInput withAsterisk label="Họ tên" placeholder="Nhập họ tên" {...form.getInputProps('fullname')} />

        <Stack spacing={0}>
          <Text fw={600} fz={'sm'}>
            Ảnh đại diện
          </Text>
          <Dropzone
            onDrop={(files) => {
              handleUploadImageOnFirebase(files[0], {
                onSuccess: (url) => form.setFieldValue('image', url),
              });
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps('image')}
          >
            <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size="2rem" stroke={1.5} color={theme.colors[theme.primaryColor][6]} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2rem" stroke={1.5} color={theme.colors.red[6]} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <Stack spacing={0} align="center">
                <Text size="sm" inline>
                  Kéo thả hoặc nhấn để chọn file ảnh
                </Text>
                <Text size="xs" color="dimmed" inline mt={7}>
                  Chọn 1 ảnh duy nhất, kích cỡ không quá 5MB
                </Text>
              </Stack>
            </Group>
          </Dropzone>
        </Stack>

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Cập nhật</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default EditProfileModal;
