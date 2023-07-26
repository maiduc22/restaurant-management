import { Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { Customer } from '../../types/models/customer';
import { useEffect, useState } from 'react';
import usePagination from '../../hooks/use-pagination';

const Customers = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { customers, isFetching } = useSelector((state: RootState) => state.customer);

  const [_records, setRecords] = useState(customers);

  useEffect(() => {
    setRecords(customers);
  }, [customers]);

  const columns: DataTableColumn<Customer>[] = [
    { accessor: 'id', title: 'Mã Khách Hàng' },
    { accessor: 'name', title: 'Tên Khách Hàng' },
    { accessor: 'phone', title: 'Số Điện Thoại' },
    { accessor: 'address', title: 'Địa Chỉ' },
  ];

  const {
    data: records,
    page,
    pageSize,
    changePage,
  } = usePagination({
    data: _records,
    defaultPaging: {
      page: 1,
      pageSize: 10,
    },
  });
  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách khách hàng
          </Text>
        </Group>
        <DataTable
          minHeight={110}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={records}
          totalRecords={_records.length}
          page={page}
          onPageChange={changePage}
          recordsPerPage={pageSize}
          paginationText={() => null}
        />
      </Stack>
    </>
  );
};

export default Customers;
