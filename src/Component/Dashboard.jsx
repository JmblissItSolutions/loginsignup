import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';

const Dashboard = () => {

  const [items , setData] = useState([]);
  const fetchData = () => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((result) => setData(result.data))
      .catch((err) => console.log("error"));
  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <div key={item.id}>
              <h3>{item.first_name}</h3>
            </div>
          ))}
      </>
    );
  }
  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <>
        <PaginatedItems itemsPerPage={4} />
      </>
  )
}

export default Dashboard