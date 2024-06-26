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
import toastr from 'toastr';
import Dialog from '@mui/material/Dialog';

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
  return { offerid, offertoken, buyertoken, officialyield, offeryield, yielddelta, officialprice, pricetoken, pricedelta, availablequantity };
}



export default function StickyHeadTable(props: any) {
  const { account, tokens, properties, estokkYamContract } = useWeb3()
  const [rows, setRows] = React.useState([
    createData(1, 'Offer1', 'Buyer1', 15.4, 13, 10, 11, 12, 9, 11),
  ])
  const navigate = useNavigate()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sellerAddress, setSellerAddress] = React.useState([])
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [updateOfferId, setUpdateOfferId] = React.useState<any>()
  const [previousOfferPrice, setPreviousOfferPrice] = React.useState<any>()
  const [previousOfferAmount, setPreviousOfferAmount] = React.useState<any>()
  const [updateOfferPrice, setUpdateOfferPrice] = React.useState<any>()
  const [updateOfferAmount, setUpdateOfferAmount] = React.useState<any>()
  const close = () => {
    setDialogOpen(false)
  };
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
    const init = async () => {
      const offerArray: any = []
      const offerSellerAddress: any = []
      const offers = props.content

      await Promise.all(
        offers.map(async (item: any, index: any) => {

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

          const offer = await estokkYamContract.methods.showOffer(_offerId).call()

          if (isSearchFilter(_offerTokenAddres, _buyerTokenAddres, props.searchType, tokens)) {
            offerArray.push(createData(_offerId, item.offerToken, item.buyerToken, _officialYield, _offerYield, _yeidlDelta, _officialprice, _priceToken, _priceDelta, _availableQuantity))
            offerSellerAddress.push(offer[2])
          }

        })
      )

      setSellerAddress(offerSellerAddress)

      setRows(offerArray)
    }

    init()

  }, [props])

  const OfferEdit = async (offerId: any) => {
    try {
      const offer = await estokkYamContract.methods.showOffer(offerId).call()
      const offerAddress = offer[2]
      if (offerAddress !== account) {
        toastr.info("You are not offer creater.")
        return
      }

      setPreviousOfferPrice(offer[4])
      setPreviousOfferAmount(offer[5])

      setUpdateOfferId(offerId)
      setDialogOpen(true)

    } catch (err) {

    }
  }

  const OfferDelete = async (offerId: any) => {
    try {
      const offer = await estokkYamContract.methods.showOffer(offerId).call()
      const offerAddress = offer[2]
      if (offerAddress !== account) {
        toastr.info("You are not offer creater.")
        return
      }
      await estokkYamContract.methods.deleteOffer(offerId).send({ from: account })
    } catch (err) {
    }
  }

  const setUpdateOffer = async () => {
    try {
      const result = await estokkYamContract.methods.updateOffer(updateOfferId, updateOfferPrice, updateOfferAmount).send({ from: account })
      toastr.success("Offer is updated successfully")
    } catch (err) {
      toastr.error("Offer update is failed")
    }
  }

  return (
    <>
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
                      <TableCell>
                        <button className='w-[20px]'
                          onClick={() => { OfferEdit(row.offerid) }}
                        >
                          <img src='./img/contractEdit.png' width="42" height="42" alt='contractEdit'></img>
                        </button>
                      </TableCell>

                      <TableCell>
                        {/* sellerAddress[index] === account && */}
                        <button className='w-[20px]'
                          onClick={() => { OfferDelete(row.offerid) }}
                        >
                          <img src='./img/contractDelete.png' width="42" height="42" alt='contractEdit'></img>
                        </button>

                      </TableCell>
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
      </Paper >

      <Dialog
        open={isDialogOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='md:w-[600px] w-[80vw] h-[600px] p-4'>
          <p className="w-[100%] text-[33px] font-bold text-center">Update</p>
          <p className='text-[22px]'>Selected Offer</p>

          <p className='text-[19px] font-bold'>  OfferID </p>
          <p className='text-[18px]'>{updateOfferId}</p>

          <p className='text-[19px] font-bold'>Offer Price</p>
          <p className='text-[18px]'>{String(previousOfferPrice)}</p>

          <p className='text-[19px] font-bold'>Offer Amount</p>
          <p className='text-[18px]'>{String(Number(previousOfferAmount) / Math.pow(10, 18))}</p>

          <p className='mt-3 font-bold'>Price</p>
          <input className='w-[100%] h-9 border-[2px] mt-1 border-[#00b3ba] rounded-md focus:outline-none'
            onChange={(e) => {
              setUpdateOfferPrice(e.target.value)
            }}
          >
          </input>

          <p className='mt-3 font-bold'>Amount</p>
          <input className='w-[100%] h-9 border-[2px] mt-1 border-[#00b3ba] rounded-md focus:outline-none'
            onChange={(e) => {
              setUpdateOfferAmount(Number(e.target.value) * Math.pow(10, 18))
            }}
          >

          </input>

          <div className='flex justify-between item-center w-[100%] h-[50px] mt-5'>
            <button className='w-[48%] bg-red-400 rounded-md text-[20px] text-[white]'
              onClick={() => {
                setUpdateOffer()
              }}
            >
              Update
            </button>

            <button className='w-[48%] bg-orange-400 rounded-md text-[20px] text-[white]'
              onClick={() => {
                setDialogOpen(false)
                setUpdateOfferAmount(0)
                setUpdateOfferPrice(0)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}