import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React from 'react';
import { Food, foodTypeOptions } from '../../../types/models/food';
import lodash from 'lodash';
import { notifications } from '@mantine/notifications';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { foodActions } from '../../../reducers/food/food.action';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { handleUploadImageOnFirebase } from '../../../utils/helpers';

interface Props {
  item: Food;
  close: () => void;
}

const EditFoodModal: React.FC<Props> = ({ close, item }) => {
  const { description, image, name, price, type } = item;

  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const initialValues: Partial<Food> = { name, type, description, image, price };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên sản phẩm!'),
      type: isNotEmpty('Bạn chưa chọn loại sản phẩm!'),
      price: isNotEmpty('Bạn chưa nhập giá sản phẩm'),
    },
  });

  return (
    <form
      id="form-edit-food"
      onSubmit={form.onSubmit((values) => {
        if (!values.image) return;
        if (lodash.isEqual(values, initialValues)) {
          notifications.show({
            withCloseButton: true,
            title: 'Thông báo',
            message: 'Bạn chưa thay đổi thông tin của sản phẩm!',
            color: 'red',
            icon: <IconX size={16} />,
            autoClose: 1200,
          });
          return;
        }
        const { description, name, price, type, image } = values;
        dispatch(
          foodActions.editFood(
            { id: item.id, description, name, price, type, image },
            {
              onSuccess: () => {
                close();
                dispatch(foodActions.getAllFoods());
              },
            }
          )
        );
        close();
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên món ăn" placeholder="Nhập tên món ăn" {...form.getInputProps('name')} />

        <Group grow>
          <Select
            withAsterisk
            data={foodTypeOptions}
            placeholder="Chọn loại"
            label="Chọn loại món ăn"
            {...form.getInputProps('type')}
          />
          <NumberInput
            defaultValue={0}
            placeholder="Chọn hoặc nhập giá món"
            label="Giá tiền"
            step={1000}
            withAsterisk
            {...form.getInputProps('price')}
            min={0}
          />
        </Group>

        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh món ăn
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

        <Textarea placeholder="Nhập mô tả..." label="Mô tả món ăn" {...form.getInputProps('description')} minRows={4} />

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

export default EditFoodModal;
