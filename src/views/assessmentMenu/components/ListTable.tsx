import React, { useState, useEffect, useRef, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { apiProvider } from 'services/modules/provider';
import { CButton, CRow, CTextarea } from '@coreui/react';
import styled from 'styled-components';
import axios from 'axios';
import { useFlag } from 'components/checkFlag/checkFlag';

interface Props {
  data: dataType;
  subURL: string;
  title?: string;
  gubun?: string;
  columnOptions?: { [key: string]: object };
  keyField?: string;
  onRowClicked?: () => void;
}
interface dataType {
  tableData: {
    tableCount: number;
    data: any[];
    header: { key: string; value: string }[];
  };
}
interface columnType {
  selector: string;
  name: string;
}

//Server-side rendering table

const ListTable = ({
  title,
  gubun,
  type,
  query,
  subURL,
  onRowClicked,
  customColumnEntries,
  columnOptions,
  ...props
}: any) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [list, setList] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);

  const skipInitialFetch = useRef(true);
  const [refresh, setRefresh] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useFlag();


  //get Table data
  const getTableList = async () => {

    try {
      const data = await apiProvider.get(`${subURL}${query.id == null ? "" : query.id}`,);

      let header = [];
      //table header info
      header.push(
        {
          value: 'ID',
          key: 'id'
        },
        {
          value: 'User',
          key: 'username'
        },
        {
          value: 'E-mail',
          key: 'email',
        },
        {
          value: 'Action',
          key: 'deleteBtn'
        },
      )

      if (customColumnEntries && Array.isArray(customColumnEntries)) {
        header = header.concat(customColumnEntries);
      }

      if (columnOptions) {
        for (let key in columnOptions) {
          header = header.map((headerItem: any) =>
            headerItem.key === key
              ? { ...headerItem, columnOptions: columnOptions[key] }
              : headerItem,
          );
        }
      }

      const tableHeader: columnType[] = header.map((data: any) => {
        let result;
        if (data.key.indexOf('') > -1) {
          result = {
            selector: data.key,
            name: data.value,

            format: (row: any) => row[data.key],
            width: '170px',
          };
        }

        if (data.key === 'deleteBtn') {
          return {
            selector: data.key,
            name: data.value,
            maxWidth: '20px',
            cell: (props: any) => (
              <CCancelBtn onClick={() => deleteUser(props?.id)}>
                Delete
              </CCancelBtn>
            )
          };
        }

        result = {
          selector: data.key,
          name: data.value,
          cell: props.cellFn,
          ...result,
          ...data?.columnOptions,
        };
        return result;
      });


      setList(data);
      setTotalCount(data?.length);

      columns.length === 0 && setColumns(tableHeader);
    } catch (err) {
      setList([]);

    } finally {

    }
  };

  useEffect(() => {
    //refresh table

    setIsButtonClicked(false);
    setRefresh(false);
    getTableList();
  }, [limit, offset, refresh, isButtonClicked]);

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    setOffset(0);
    getTableList();
  }, [query]);

  const renderHeader = () => (
    <div>

      <CAddBtn onClick={() => {
        props.setShowModal(!props?.showModal)
        props?.setModalType('create');
      }}>
        Add
      </CAddBtn>
    </div>
  );


  function deleteUser(id: number) {
    axios.delete(`/api/v1/users/${id}`)
      .then((result: any) => {
        setRefresh(true);
      }).catch((err: any) => {
        console.log(err);
      });
  }

  return (
    <Fragment>
      <DataTable
        title={(title === 'excel' && renderHeader()) || renderHeader()}
        columns={columns}
        data={list}
        onRowClicked={onRowClicked}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={totalCount}
        paginationPerPage={limit}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponentOptions={{
          noRowsPerPage: false,
        }}
        onChangeRowsPerPage={rowsPerPage => setLimit(rowsPerPage)}
        onChangePage={pageNo => setOffset(limit * (pageNo - 1))}
        {...props}
      />

    </Fragment>
  );
};

export default ListTable;


const CCancelBtn = styled(CButton)`
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  background-color: #ad1536;
  &:hover {
    color: #fff;
    background-color: #6b0d21;
  }
`;

const CAddBtn = styled(CButton)`
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  background-color: #2d47f3;
  &:hover {
    color: #fff;
    background-color: #262d5c;
  }
`;


