import React, { useState, useCallback } from 'react';
import moment from 'moment';
import SearchBox from 'components/SearchBox';
import ListTable from './ListTable';
import EnrollModal from './EnrollModal';

const List = ({ searchData, subURL, gubun, type, ...props }: any) => {
  const [query, setQuery] = useState<any>({});
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState<number>();

  const handleQuery = useCallback((inputs: any) => {
    const result: any = {};
    for (let key in inputs) {

      if (!inputs[key]) continue;
    
      result[key] = inputs[key];
    }
    

    setQuery(result);
  }, []);

  const onRowClicked = (data: any) => {
    setUserId(data.id);
    setShowModal(true);
  };

  const controlSort = () => {
    const toChange = query.orderby === 'asc' ? 'desc' : 'asc';

    setQuery({ ...query, orderby: toChange });

    return true;
  };

  return (
    <>
      <SearchBox
        searchData={searchData}
        query={query}
        handleQuery={handleQuery}
      />
      <ListTable
        title={'excel'}
        subURL={subURL}
        gubun={gubun}
        type={type}
        query={query}
        pointerOnHover
        onRowClicked={props?.listOptions?.onRowClicked || onRowClicked}
        columnOptions={{ create_date: { sortable: true } }}
        onSort={controlSort}
        sortServer={true}
        showModal={showModal}
        setShowModal={setShowModal}
        setModalType={setModalType}
        setUserId={setUserId}
        {...props}
        {...props.listOptions}
      />

      {showModal && (
        <EnrollModal
          modal={showModal}
          setModal={setShowModal}
          userId={userId}
          type={modalType}
        />
      )}
    </>
  );
};
export default List;
