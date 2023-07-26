import { Box, Button, Flex, Group, MultiSelect, Select, SelectItemProps, Space, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { RootState } from '../../../redux/reducer';
import { Customer } from '../../../types/models/customer';
import { Table, TableStatus } from '../../../types/models/table';
import { decodeToken } from '../../../utils/helpers';
import { orderActions } from '../../../reducers/order/order.action';
import { tableActions } from '../../../reducers/table/table.action';

interface Props {
  close: () => void;
}

const SelectItem = forwardRef<HTMLDivElement, Customer & { value: string }>(({ name, phone, value }, ref) => (
  <div ref={ref}>
    <Group noWrap>
      <div>
        <Text size="sm">{name}</Text>
        <Text size="xs" opacity={0.65}>
          {phone}
        </Text>
      </div>
    </Group>
  </div>
));

const AddOrderModal: React.FC<Props> = ({ close }) => {
  const dispatch = useAppDispatch();
  const { tables, isFetching: isFetchingTable } = useSelector((state: RootState) => state.table);

  const tableData = useMemo(
    () =>
      tables
        .filter((table) => table.status === TableStatus.FREE)
        .map((table) => ({ value: table.id.toString(), label: table.name })),
    [tables]
  );

  const decodedToken = decodeToken();
  const { fullname, username } = decodedToken;

  const form = useForm({
    initialValues: {
      name: '',
      phone: '',
      address: '',
      tableIDS: [],
    },
    validate: {
      name: isNotEmpty('Tên khách hàng không thể bỏ trống!'),
      phone: isNotEmpty('Số điệnthoại khách hàng không thể bỏ trống!'),
      address: isNotEmpty('Địa chỉ khách hàng không thể bỏ trống!'),
      tableIDS: isNotEmpty('Bạn chưa chọn bàn cho khách hàng!'),
    },
  });

  const ItemTable = forwardRef<HTMLDivElement, SelectItemProps & Partial<Table>>(
    ({ label, value, capacity, ...others }, ref) => {
      return (
        <div ref={ref} {...others}>
          <Flex align="center">
            <div>{label}</div>
            <div>{capacity}</div>
          </Flex>
        </div>
      );
    }
  );

  return (
    <>
      <form
        id="form-add-modal"
        onSubmit={form.onSubmit((values) => {
          const { address, name, phone, tableIDS } = values;
          const ids = tableIDS.map((id) => Number(id));
          dispatch(
            orderActions.addOrder(
              {
                customer: {
                  address,
                  name,
                  phone,
                },
                tableIDS: ids,
              },
              {
                onSuccess: () => {
                  dispatch(orderActions.getAllOrders());
                  dispatch(tableActions.getAllTables());
                  close();
                },
              }
            )
          );
        })}
      >
        <Flex direction="column" gap="sm">
          <TextInput
            withAsterisk
            label="Tên khách hàng"
            placeholder="Nhập tên khách hàng"
            {...form.getInputProps('name')}
          />

          <TextInput
            withAsterisk
            label="Số điện thoại"
            placeholder="Nhập số điện thoại khách hàng"
            {...form.getInputProps('phone')}
          />

          <TextInput
            withAsterisk
            label="Địa chỉ"
            placeholder="Nhập địa chỉ khách hàng"
            {...form.getInputProps('address')}
          />

          <MultiSelect
            withAsterisk
            zIndex={100000}
            label="Bàn"
            placeholder="Chọn bàn đặt"
            data={tableData}
            itemComponent={ItemTable}
            {...form.getInputProps('tableIDS')}
          />

          <TextInput withAsterisk label="Nhân viên nhận đơn" disabled value={fullname ? fullname : username} />

          <Group mt="sm" position="right">
            <Button variant="light" onClick={close}>
              Huỷ bỏ
            </Button>
            <Button type="submit">Lên đơn</Button>
          </Group>
        </Flex>
      </form>
    </>
  );
};

export default AddOrderModal;
