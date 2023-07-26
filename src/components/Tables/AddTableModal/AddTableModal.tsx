import { Button, Flex, Group, NumberInput, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { tableActions } from '../../../reducers/table/table.action';

interface Props {
  close: () => void;
}

const AddTableModal: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: { name: '', capacity: 0 },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên bàn!'),
      capacity: isNotEmpty('Bạn chưa chọn số lượng chỗ ngồi'),
    },
  });

  const handleAddTable = () => {};

  return (
    <form
      id="form-add-table"
      onSubmit={form.onSubmit((values) => {
        const { name, capacity } = values;
        dispatch(tableActions.addTable({ name, capacity }, { onSuccess: close }));
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên bàn" placeholder="Nhập tên bàn" {...form.getInputProps('name')} />

        <NumberInput
          defaultValue={0}
          placeholder="Chọn số lượng chỗ ngồi trong bàn"
          label="Chỗ ngồi"
          step={1}
          min={0}
          withAsterisk
          {...form.getInputProps('capacity')}
        />

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button onClick={handleAddTable} type="submit">
            Thêm mới
          </Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddTableModal;
