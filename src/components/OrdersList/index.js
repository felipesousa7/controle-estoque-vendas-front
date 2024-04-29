import * as React from "react";
import { useContext, useEffect, useState } from 'react'
import { Box , Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'
import { OrderContext } from '../../context/useOrder'
import { ProductContext } from '../../context/useProduct'

// Create Order Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  maxWidth: '700px',
  width: '100%',
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
};

export default function Orders() {
  const { orders, getOrders, updateOrder, createOrder,  removeOrder, success, setSuccess, loading, error, setError, getOrderById } = useContext(OrderContext)
  const { products, getProducts, updateProduct, createProduct,  removeProduct, getProductById } = useContext(ProductContext)
  // Table
  const [productQuantities, setProductQuantities] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderSelect, setOrderSelect] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  useEffect(() => getOrders(), [])
  useEffect(() => getProducts(), [])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create Order Modal & Form
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setOpenUpdate(false); setOrderSelect(false)};

  const handleChange = (event) => {
    const { name, value } = event.target
    setOrderSelect((prevOrderSelect) => ({
      ...prevOrderSelect,
      [name]: value
    })
  )}

  const handleChangeQty = (event) => {
    const { name, value } = event.target;

    // Verificar se a quantidade digitada é maior do que a quantidade disponível
    const productId = parseInt(name);
    const availableQuantity = products.find((product) => product.id === productId)?.quantityAvailable || 0;
    if (parseInt(value) > availableQuantity) {
      setQuantityError(true);
    } else {
      setQuantityError(false);
    }

    // Atualizar o estado das quantidades dos produtos
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [name]: parseInt(value),
    }));
  };

  const availableProducts = products.filter((product) => product.quantityAvailable > 0);

  const calculateTotalValue = () => {
    let total = 0;

    products.forEach((product) => {
      const quantity = productQuantities[product.id] || 0;
      if (quantity > 0) {
        total += parseFloat(product.unitPrice) * quantity;
      }
    });

    return parseFloat(total);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedProducts = products.filter((product) => {
      const quantity = parseInt(formData.get(product.id.toString()), 10);
      return quantity > 0;
    });
  
    if (selectedProducts.length === 0) {
      setError('Selecione pelo menos um produto com quantidade maior que zero.');
      return;
    }
  
    const totalPrice = selectedProducts.reduce((total, product) => {
      const quantity = parseInt(formData.get(product.id.toString()), 10);
      return total + (product.unitPrice * quantity); // Supondo que cada produto tenha um campo unitPrice
    }, 0);
  
    const data = {
      client: formData.get('client'),
      totalPrice,
      productsSold: selectedProducts.map((product) => ({
        productId: product.id,
        quantitySold: parseInt(formData.get(product.id.toString()), 10),
      })),
    };
  
    // Enviar data para o backend aqui
    console.log('Dados a serem enviados:', data);
  
    openUpdate ? updateOrder(orderSelect.id, data) : createOrder(data);
  };

  return (
    <>
      {error &&
       <Snackbar open={error} autoHideDuration={6000}
        onClose={() => setError(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
       <Alert
        open={error} style={{ float: 'left' }}
        severity="error">{error}</Alert>
        </Snackbar>
      }
      {success &&
        <Snackbar open={success} autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}>
          <Alert
            open={success} style={{ float: 'left' }}
            severity="success">{success}</Alert></Snackbar>
      }
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Vendas</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Vendas</li>
        </ul>
      </div>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 10px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "10px",
          }}
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Vendas
          </Typography>

          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              color: "#fff !important",
            }}
          >
            <AddIcon
              sx={{ position: "relative", top: "-1px" }}
              className='mr-5px'
            />{" "}
            Cadastrar venda
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table 
            sx={{ minWidth: 850 }} 
            aria-label="custom pagination table"
            className="dark-table"
          >
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
              <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  ID
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Ciente
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Valor total
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? orders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : orders
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {row.client}
                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                    }}
                  >
                    {parseInt(row.totalPrice).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                      }}
                    >

                      <Tooltip title="Edit" placement="top">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          color="primary"
                          className="primary"
                        >
                          <DriveFileRenameOutlineIcon onClick={() => {setOpenUpdate(true) ;setOpen(true); setOrderSelect(row)} } fontSize="inherit" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Remove" placement="top">
                        <IconButton
                          aria-label="remove"
                          size="small"
                          color="danger"
                          className="danger"
                        >
                          <DeleteIcon onClick={() => removeOrder(row.id) } fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={8}
                    style={{ borderBottom: "1px solid #F7FAFF" }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
      {/* Create Order Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="bg-black">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#EDEFF5",
                borderRadius: "8px",
                padding: "20px 20px",
              }}
              className="bg-black"
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "500",
                  fontSize: "17px",
                }}
              >
                { openUpdate ? 'Editar venda' : 'Cadastrar venda' } 
              </Typography>

              <IconButton
                aria-label="remove"
                size="small"
                onClick={handleClose}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  background: "#fff",
                  padding: "30px 20px",
                  borderRadius: "8px",
                }}
                className="dark-BG-101010"
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      Cliente
                    </Typography>
                    <TextField
                      autoComplete="client"
                      name="client"
                      value={orderSelect?orderSelect.client:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="client"
                      autoFocus
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>
                  {availableProducts.map((product) => (
                    <React.Fragment key={product.id}>
                    <Grid item xs={12} md={12} lg={6}>
                    <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "12px",
                          }}
                        >
                          Produto
                    </Typography>
                    <TextField
                      autoComplete="name"
                      name="name"
                      value={product?product.name:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="name"
                      label="name"
                      disabled 
                      autoFocus
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                    />
                  </Grid>
                      <Grid item xs={12} md={12} lg={6}>
                        <Typography
                          as="h5"
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            mb: "12px",
                          }}
                        >
                          Quantidade
                        </Typography>
                        <TextField
                          autoComplete="Quantidade"
                          name={product.id.toString()} 
                          value={productQuantities[product.id] || ''}
                          onChange={handleChangeQty}
                          required
                          fullWidth
                          error={quantityError}
                          helperText={quantityError ? 'Quantidade em estoque indisponível' : ''}
                          id={product.id.toString()}
                          label="Quantidade"
                          type="number"
                          InputProps={{
                            style: { borderRadius: 8 },
                          }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                  <Grid item xs={12} md={12} lg={6}>
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      Valor total
                    </Typography>

                    <TextField
                      autoComplete="totalPrice"
                      name="totalPrice"
                      value={calculateTotalValue()}
                      required
                      fullWidth
                      id="totalPrice"
                      label="$0"
                      type="number"
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
                      disabled 
                    />
                  </Grid>

                  <Grid item xs={12} textAlign="end">
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "13px",
                        padding: "12px 20px",
                        color: "#fff !important",
                      }}
                      onClick={handleClose}
                      className='mr-15px'
                    >
                      <ClearIcon
                        sx={{
                          position: "relative",
                          top: "-1px",
                        }}
                        className='mr-5px'
                      />{" "}
                      Cancelar
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        textTransform: "capitalize",
                        borderRadius: "8px",
                        fontWeight: "500",
                        fontSize: "13px",
                        padding: "12px 20px",
                        color: "#fff !important",
                      }}
                    >
                      <AddIcon
                        sx={{
                          position: "relative",
                          top: "-1px",
                        }}
                        className='mr-5px'
                      />{" "}
                      { openUpdate ? 'Editar venda' : 'Cadastrar venda' }
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
