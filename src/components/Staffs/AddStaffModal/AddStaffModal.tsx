import { Button, Flex, Group, NumberInput, TextInput, useMantineTheme } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconLock } from '@tabler/icons-react';
import { Modify } from '../../../types/helpers';
import { Staff } from '../../../types/models/staff';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { authActions } from '../../../reducers/auth/auth.action';
import { staffActions } from '../../../reducers/staff/staff.action';

interface Props {
  close: () => void;
}

const AddStaffModal: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();

  const initialValues: Partial<Staff> = {
    username: '',
    fullname: '',
    salary: 0,
    password: '',
  };

  const form = useForm({
    initialValues,
    validate: {
      fullname: isNotEmpty('Bạn chưa nhập họ tên nhân viên!'),
      salary: isNotEmpty('Bạn chưa nhập lương!'),
    },
  });

  // const handleAddNewStaff = async (value: AddStaffFormValue) => {
  //   console.log(value);
  //   const url = await handleUploadImageOnFirebase(value.image[0]);
  //   console.log(url);
  // };

  const handleAddNewStaff = (values: Partial<Staff>) => {
    console.log(values);
    dispatch(
      authActions.signUp(values, {
        onSuccess: () => {
          dispatch(staffActions.getAllStaffs());
          close();
        },
      })
    );
  };

  return (
    <form id="add-staff-form" onSubmit={form.onSubmit((values) => handleAddNewStaff(values))}>
      <Flex direction={'column'} gap="sm">
        <TextInput
          withAsterisk
          label="Tên tài khoản"
          placeholder="Nhập tên tài khoản"
          {...form.getInputProps('username')}
        />

        <TextInput label="Mật khẩu" type="password" icon={<IconLock size={14} />} {...form.getInputProps('password')} />

        <TextInput
          withAsterisk
          label="Tên nhân viên"
          placeholder="Nhập tên nhân viên"
          {...form.getInputProps('fullname')}
        />

        <NumberInput
          defaultValue={0}
          withAsterisk
          step={10000}
          label="Mức lương"
          placeholder="Nhập mức lương"
          {...form.getInputProps('salary')}
        />

        {/* <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh đại diện
          </Text>
          <Dropzone
            onDrop={(files) => {
              form.setFieldValue('image', files);
              console.log(files);
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
        </Stack> */}

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Thêm mới</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddStaffModal;
