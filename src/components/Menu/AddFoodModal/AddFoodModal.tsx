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
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { foodActions } from '../../../reducers/food/food.action';
import { FoodType, foodTypeOptions } from '../../../types/models/food';
import { handleUploadImageOnFirebase } from '../../../utils/helpers';

interface Props {
  close: () => void;
}

const AddFoodModal: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      image: [] as FileWithPath[],
      type: FoodType.hotpot,
      description: '',
      price: 0,
    },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên sản phẩm!'),
      type: isNotEmpty('Bạn chưa chọn loại sản phẩm!'),
      price: isNotEmpty('Bạn chưa nhập giá sản phẩm'),
    },
  });

  return (
    <form
      id="form-add-food"
      onSubmit={form.onSubmit((values) => {
        const { name, description, image, price, type } = values;
        console.log(values);
        handleUploadImageOnFirebase(image[0], {
          onSuccess: (url) => {
            dispatch(
              foodActions.addFood(
                { name, description, image: url, price, type, isBuffet: true },
                {
                  onSuccess: () => {
                    close();
                    dispatch(foodActions.getAllFoods());
                  },
                }
              )
            );
          },
        });
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
            onDrop={(files) => form.setFieldValue('image', files)}
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
          <Button type="submit">Thêm mới</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddFoodModal;
