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
import { ProductContext } from '../../context/useProduct'

// Create Product Modal Style
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

export default function Products() {
  const { products, getProducts, updateProduct, createProduct,  removeProduct, success, setSuccess, loading, error, setError, getProductById } = useContext(ProductContext)
  // Table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productSelect, setProductSelect] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

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

  // Create Product Modal & Form
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setOpenUpdate(false); setProductSelect(false)};

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.quantityAvailable = parseInt(data.quantityAvailable);
    data.unitPrice = parseFloat(data.unitPrice);
    openUpdate ? updateProduct(productSelect.id,data) : createProduct(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    setProductSelect((prevProductSelect) => ({
      ...prevProductSelect,
      [name]: value
    })
  )}

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
        <h1>Produtos</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>Produtos</li>
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
            Produtos
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
            Cadastrar produto
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
                  Produto
                </TableCell>


                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Descrição
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Preço
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    borderBottom: "1px solid #F7FAFF",
                    fontSize: "13.5px",
                  }}
                >
                  Estoque
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
                ? products.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : products
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
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                    }}
                  >
                    {row.description}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                    }}
                  >
                    {parseInt(row.unitPrice).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                    }}
                  >
                    {row.quantityAvailable}
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
                          <DriveFileRenameOutlineIcon onClick={() => {setOpenUpdate(true) ;setOpen(true); setProductSelect(row)} } fontSize="inherit" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Remove" placement="top">
                        <IconButton
                          aria-label="remove"
                          size="small"
                          color="danger"
                          className="danger"
                        >
                          <DeleteIcon onClick={() => removeProduct(row.id) } fontSize="inherit" />
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
                  count={products.length}
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
      {/* Create Product Modal */}
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
                { openUpdate ? 'Editar produto' : 'Cadastrar produto' } 
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
                  <Grid item xs={12} md={12} lg={6}>
                    <Typography
                      as="h5"
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        mb: "12px",
                      }}
                    >
                      Nome do produto
                    </Typography>
                    <TextField
                      autoComplete="name"
                      name="name"
                      value={productSelect?productSelect.name:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="name"
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
                      Descrição
                    </Typography>
                    <TextField
                      autoComplete="description"
                      name="description"
                      value={productSelect?productSelect.description:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="description"
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
                      Preço
                    </Typography>

                    <TextField
                      autoComplete="unitPrice"
                      name="unitPrice"
                      value={productSelect?productSelect.unitPrice:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="unitPrice"
                      type="number"
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
                      Estoque
                    </Typography>

                    <TextField
                      autoComplete="quantityAvailable"
                      name="quantityAvailable"
                      value={productSelect?productSelect.quantityAvailable:''}
                      onChange={handleChange}
                      required
                      fullWidth
                      id="quantityAvailable"
                      autoFocus
                      InputProps={{
                        style: { borderRadius: 8 },
                      }}
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
                      { openUpdate ? 'Editar produto' : 'Cadastrar produto' }
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
