import { Button, Flex, Group, NumberInput, Select, Stack, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import React from 'react';
import { Staff, StaffRole } from '../../../types/models/staff';
import { Modify } from '../../../types/helpers';
import { handleUploadImageOnFirebase } from '../../../utils/helpers';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { staffActions } from '../../../reducers/staff/staff.action';
import lodash from 'lodash';
import { notifications } from '@mantine/notifications';

interface Props {
  staff: Staff;
  close: () => void;
}

const EditStaffModal: React.FC<Props> = ({ staff, close }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const { fullname, salary, image, username } = staff;

  const initialValues: Partial<Staff> = { fullname, salary, image };

  const form = useForm({
    initialValues,
    validate: {
      fullname: isNotEmpty('Bạn chưa nhập họ tên nhân viên!'),
      salary: isNotEmpty('Bạn chưa nhập lương!'),
    },
  });

  const handleUpdateStaff = (values: Partial<Staff>) => {
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
      staffActions.editStaff(
        {
          username,
          fullname: values.fullname,
          salary: values.salary,
          image: values.image,
        },
        {
          onSuccess: () => {
            dispatch(staffActions.getAllStaffs());
            close();
          },
        }
      )
    );
  };

  return (
    <form id="form-edit-staff" onSubmit={form.onSubmit((values) => handleUpdateStaff(values))}>
      <Flex direction={'column'} gap="sm">
        <TextInput
          withAsterisk
          label="Tên nhân viên"
          placeholder="Nhập tên nhân viên"
          {...form.getInputProps('fullname')}
        />

        <NumberInput
          defaultValue={0}
          step={10000}
          withAsterisk
          label="Mức lương"
          placeholder="Nhập mức lương"
          {...form.getInputProps('salary')}
        />

        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh đại điện
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

export default EditStaffModal;
