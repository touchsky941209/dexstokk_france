import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../../hooks/useWeb3';
interface Column {
  id: 'type' | 'hashoftransaction' | 'dateofpurchase' | 'summary';
  label: string;
  minWidth?: number
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'type',
    label: 'Type',
    minWidth: 70,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'hashoftransaction',
    label: 'Hash of the transaction',
    minWidth: 80,
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'dateofpurchase',
    label: 'Date of purchase',
    minWidth: 80,
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'summary',
    label: 'Summary',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  }
];

interface Data {
  type: string;
  hashoftransaction: string;
  dateofpurchase: string;
  summary: string;
}

function createData(
  type: string,
  hashoftransaction: string,
  dateofpurchase: string,
  summary: string,

): Data {
  // const density = population / size;
  return { type, hashoftransaction, dateofpurchase, summary };
}



export default function StickyHeadTable(props: any) {
  const { account } = useWeb3()
  const [rows, setRows] = React.useState([
    createData('O', 'Buyer', "2023-5-15", "Success"),
  ])
  const navigate = useNavigate()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const gotoShowOffer = (index: any) => {
    navigate('/showoffer', { state: { index } });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const offerArray: any = []
    const offers = props.content
    // offers.map((item: any, index: any) => {
    //   const _offerId = item.offerId
    //   const _priceToken = 50
    //   const _officialYield = 10
    //   const _yeidlDelta = 3.5
    //   const _officialprice = item.price
    //   const _priceDelta = 7.6
    //   const _availableQuantity = Number(item.amount) / Math.pow(10, 18)

    //   offerArray.push(createData(_offerId, item.offerToken, item.buyerToken, _officialYield, _yeidlDelta, _officialprice, _priceToken, _priceDelta, _availableQuantity))
    // })

    // setRows(offerArray)
    offerArray.push(createData("", "", "", ""))
    setRows(offerArray)

  }, [props])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, minHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.type}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
