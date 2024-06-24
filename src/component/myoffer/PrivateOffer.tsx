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
import { getOfficialYield, getOfficialPrice, isSearchFilter } from '../functions/tokensContract';

interface Column {
  id: 'offerid' | 'offertoken' | 'buyertoken' | 'officialyield' | 'offeryield' | 'yielddelta' | 'officialprice' | 'pricetoken' | 'pricedelta' | 'availablequantity';
  label: string;
  minWidth?: number
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'offerid', label: 'OfferId', minWidth: 70,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'offertoken', label: 'Offer\u00a0Token', minWidth: 80,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'buyertoken', label: 'Buyer\u00a0Token', minWidth: 80,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'officialyield',
    label: 'Official Yield',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US') + " %",
  },

  {
    id: 'offeryield',
    label: 'Offer Yield',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US') + " %",
  },

  {
    id: 'yielddelta',
    label: 'Yield Delta',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US') + " %",
  },
  {
    id: 'officialprice',
    label: 'Official Price',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2) + " $USD",
  },
  {
    id: 'pricetoken',
    label: 'Price / Token',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2) + " $USD",
  },
  {
    id: 'pricedelta',
    label: 'Price delta',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2) + " %",
  },
  {
    id: 'availablequantity',
    label: 'Available Quantity',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  offerid: number;
  offertoken: string;
  buyertoken: string;
  officialyield: number;
  offeryield: number;
  yielddelta: number;
  officialprice: number;
  pricetoken: number;
  pricedelta: number;
  availablequantity: number;
}

function createData(
  offerid: number,
  offertoken: string,
  buyertoken: string,
  officialyield: number,
  offeryield: number,
  yielddelta: number,
  officialprice: number,
  pricetoken: number,
  pricedelta: number,
  availablequantity: number,
): Data {
  // const density = population / size;
  return { offerid, offertoken, buyertoken, officialyield, offeryield, yielddelta, officialprice, pricetoken, pricedelta, availablequantity };
}



export default function StickyHeadTable(props: any) {
  const { account, tokens, properties } = useWeb3()
  const [rows, setRows] = React.useState([
    createData(1, 'Offer1', 'Buyer1', 15.4, 13, 10, 11, 12, 9, 11),
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

    offers.map((item: any, index: any) => {
      const _offerTokenAddres: any = item.offerTokenAddress
      const _buyerTokenAddres: any = item.buyerTokenAddress
      const _offerId: any = item.offerId
      const _officialYield: any = getOfficialYield(_offerTokenAddres, _buyerTokenAddres, tokens, properties)
      const _officialprice: any = getOfficialPrice(_offerTokenAddres, _buyerTokenAddres, tokens, properties)
      const _priceToken: any = Number(item.price)
      const _offerYield: any = _officialYield * _officialprice / _priceToken
      const _yeidlDelta: any = (_offerYield - _officialYield) * 100 / _officialYield
      const _priceDelta: any = (_priceToken - _officialprice) / _officialprice
      const _availableQuantity: any = Number(item.amount) / Math.pow(10, 18)
      if (item.buyer === account) {
        if (isSearchFilter(_offerTokenAddres, _buyerTokenAddres, props.searchType, tokens))
          offerArray.push(createData(_offerId, item.offerToken, item.buyerToken, _officialYield, _offerYield, _yeidlDelta, _officialprice, _priceToken, _priceDelta, _availableQuantity))
      }
    })

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.offerid}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} onClick={() => {
                          gotoShowOffer(row.offerid)
                        }}>
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
