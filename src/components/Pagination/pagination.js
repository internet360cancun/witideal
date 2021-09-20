import React from "react";
import { Pagination } from '@material-ui/lab';


export const PaginationControlled = ({count, page, handleChange}) => {
  return (
  <Pagination
          size="large"
          color="primary"
          count={count}
          page={page}
          onChange={handleChange}
        />
  
  );
}

