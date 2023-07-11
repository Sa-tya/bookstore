import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import httpService from "../../services/http.service";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pageStyle.css'
import SuccessMessage, { ErrorMessage } from "../common/message";
import { ToastContainer } from "react-toastify";


function Store(props) {
    const [toggle, setToggle] = useState(false);
    const [modalData, setModalData] = useState({})

    async function onDelete(code) {
        try {
            let x = window.confirm('Do you want to delete this ?')
            if (x) {
                let res = await httpService.delete(`/books/deletebook/${code}`)
                if (res.data.ack === 1) {
                    SuccessMessage('Deleted Successfully !')
                    props.getBooks();
                }
                else ErrorMessage('Something went wrong in Deletion')
            }
        }
        catch (err) {
            ErrorMessage('Not deleted')
        }

    }

    return <section>
        <h1>Store</h1>
        <ToastContainer />
        <Button onClick={() => {
            setToggle(!toggle)
            setModalData({})
        }}>Add a Book in Store</Button>
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)} >
            <ModalX
                setToggle={setToggle}
                data={modalData}
                getSubjects={props.getSubjects}
                subjects={props.subjects}
                publishers={props.publishers}
                getBooks={props.getBooks}
                books={props.books}
            />
        </Modal>
        {props.books && props.books.length ? <Table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Book Code</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Publisher</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.books.map((ele, indx) => <tr key={indx}>
                    <td>{indx + 1}</td>
                    <td>{ele.Code}</td>
                    <td>{ele.Name}</td>
                    <td>{ele.Class}</td>
                    <td>{ele.Subject}</td>
                    <td>{ele.Publisher}</td>
                    <td>{ele.Price}</td>
                    <td>{ele.Quantity}</td>
                    <td className="fa fa-edit delete-icon" onClick={() => {
                        setModalData(ele)
                        setToggle(true)
                    }}></td>
                    <td className="fa fa-trash delete-icon" onClick={() => onDelete(ele.Code)}></td>
                </tr>)}
            </tbody>
        </Table> : <></>}

    </section>
}

export default Store;

function ModalX(props) {
    let [name, setName] = useState(props.data.Name === undefined ? '' : props.data.Name);
    let [code, setCode] = useState(props.data.Code === undefined ? '' : props.data.Code);
    const std = ['Nur', 'Lkg', 'Ukg', '1', '2', '3', '4', '5', '6', '7', '8']
    let [publisher, setPublisher] = useState(props.data.Publisher === undefined ? '' : props.data.Publisher)
    let [subject, setSubject] = useState(props.data.Subject === undefined ? '' : props.data.Subject)
    let [qty, setQty] = useState(Array(11).fill())//props.data.Quantity === undefined ? '1' : props.data.Quantity)
    let [price, setPrice] = useState(Array(11).fill())//props.data.Price === undefined ? '1' : props.data.Price)
    let [nameToggle, setNameToggle] = useState(true)
    let [optionName, setOptionName] = useState('');

    function onCancel() {
        props.setToggle(false);
    }

    async function saveDetails() {
        try {
            console.log(optionName, qty, price)
            // for (let i = 0; i < qty.length; i++) if (!((qty[i] && price[i]) || (!qty[i] && !price[i]))) return;
            let res = await httpService.post(`/books/${props.data.Code ? 'updatebookdetails' : 'insertbookdetails'}`,
                {
                    code: optionName,
                    qty: qty,
                    price: price,
                })
            res = res.data
            if (res.ack === 1) {
                SuccessMessage(`${props.data.Code ? 'updated' : 'created'} Successfully !`)
                // props.setToggle(false);
                setNameToggle(true)
                props.getBooks();
            }
            else ErrorMessage('Something went wrong in creation ' + res.msg.original.detail)
        }
        catch (e) {
            ErrorMessage('Something went wrong in creation')
        }
    }
    async function onModalSave() {
        // if (!name || !qty  || !publisher || !subject || !price) {
        //     ErrorMessage('Please enter every field!');
        //     return;
        // }
        // if (name === props.data.Name) {
        //     ErrorMessage('You have not changed Subject Name !');
        //     return;
        // }

        try {
            let res = await httpService.post(`/books/${props.data.Code ? 'updatebook' : 'createbook'}`,
                {
                    code: code,
                    name: name,
                    // class: std,
                    publisher: publisher,
                    // qty: qty,
                    // price: price,
                    subject: subject
                })
            res = res.data
            if (res.ack === 1) {
                SuccessMessage(`${props.data.Code ? 'updated' : 'created'} Successfully !`)
                // props.setToggle(false);
                setNameToggle(true)
                props.getBooks();
            }
            else ErrorMessage('Something went wrong in creation ' + res.msg.original.detail)
        }
        catch (e) {
            ErrorMessage('Something went wrong in creation')
        }
    }
    return <>
        <ModalHeader >{props.data.Code ? 'Update' : 'Add'} a Book</ModalHeader>
        <ModalBody>
            <div>
                {props.data.Code && <>
                    <label>Code :</label>{" "}
                    <input
                        type={'text'}
                        placeholder='Code'
                        value={code}
                        onChange={(e) => { setCode(e.target.value) }}
                        disabled={true}
                        required />
                    <br />
                </>}

                <label>Subject :</label>{" "}
                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                >
                    <option value={''}> Subject </option>
                    {props.subjects.map((ele) =>
                        <option value={ele}>{ele}</option>
                    )}
                </select>
                {/* <br /> */}

                {subject && <>
                    <label>Publication :</label>{" "}
                    <select
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                    >
                        <option value={''}> Publisher </option>
                        {props.publishers.map((ele) =>
                            <option value={ele}>{ele}</option>
                        )}
                    </select></>}
                <br />

                {publisher && <>
                    {nameToggle && <>
                        <label>Book :</label>{" "}
                        <select
                            value={optionName}
                            onChange={(e) => setOptionName(e.target.value)}
                        >
                            <option value={''}> Choose a name </option>
                            {props.books && props.books.filter((ele) => ele.Subject === subject && ele.Publisher === publisher).map((ele) =>
                                <option value={ele.Code}>{ele.Name}</option>
                            )}
                        </select>
                    </>}
                    {nameToggle ? <Button onClick={() => {
                        setNameToggle(false)
                        setOptionName('')
                    }}>Add a Name</Button> :
                        <>
                            <label>Name :</label>{" "}
                            <input
                                type={'text'}
                                placeholder='Book Name'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required />
                            <Button onClick={onModalSave}>Save</Button>
                            <Button onClick={() => {
                                setNameToggle(true)
                                // setOptionName('');
                                setName('')
                            }}>Cancel</Button>
                        </>}
                </>}
                <br />

                {optionName && <table>
                    <tr>
                        <th>Class</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                    {std.map((ele, indx) =>
                        <tr>
                            <td>{ele}.{" "}</td>
                            <td><input
                                type={'number'}
                                placeholder={std[indx] + ' price'}
                                value={price[indx]}
                                onChange={(e) => {
                                    price[indx] = e.target.value
                                    setPrice(price)
                                }}
                            ></input>
                            </td>

                            <td>
                                <input
                                    type={'number'}
                                    placeholder={std[indx] + ' qty'}
                                    value={qty[indx]}
                                    onChange={(e) => {
                                        qty[indx] = e.target.value
                                        setQty(qty)
                                    }}
                                ></input>
                            </td>
                        </tr>
                    )}
                </table>}

                {/* <label>Class :</label>{" "}
                <select
                    value={std}
                    onChange={(e) => setStd(e.target.value)}
                >
                    <option value={''}> class </option>
                {['Nur', 'Lkg', 'Ukg', '1', '2', '3', '4', '5', '6', '7', '8'].map((ele) =>
                    <option value={ele}>{ele}</option>
                )}
                </select>
                <br />

                <label>Price :</label>{" "}
                <input
                    type={'number'}
                    placeholder='Price'
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                    required />
                <br />

                <label>Quantity :</label>{" "}
                <input
                    type={'number'} */}
                {/* placeholder='Quantity'
                    value={qty}
                    onChange={(e) => { setQty(e.target.value) }}
                    required /> */}
                {/* <br />
                <label>Class :</label>{" "} */}

            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={saveDetails}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
    </>
}