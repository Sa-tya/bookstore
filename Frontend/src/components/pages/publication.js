import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import httpService from "../../services/http.service";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pageStyle.css'
import SuccessMessage, { ErrorMessage } from "../common/message";
import { ToastContainer } from "react-toastify";

function Publication(props) {
    const [toggle, setToggle] = useState(false);
    const [modalData, setModalData] = useState({})

    // useEffect(() => {
    //     props.getPublisher();
    // }, [props, toggle])

    // async function getPublication() {
    //     const response = await httpService.get('/company/getallcompany')
    //     // const data = response.data;
    //     setPublishers(response.data)
    // }

    async function ondelete(code) {
        try {
            let x = window.confirm('Do you want to delete this ?')
            if (x) {
                let res = await httpService.delete(`/company/deletecompany/${code}`)
                if (res.data.ack === 1) {
                    SuccessMessage('Deleted Successfully !')
                    props.getPublisher();
                }
                else ErrorMessage('Something went wrong in Deletion')
            }
        }
        catch (err) {
            ErrorMessage('Not deleted')
        }

    }

    return <section>
        <h1>Publishers</h1>
        <ToastContainer />
        <Button onClick={() => {
            setToggle(!toggle)
            setModalData({})
        }}>Add a book Publisher</Button>
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)} >
            <ModalX setToggle={setToggle} data={modalData} getPublisher={props.getPublisher} />
        </Modal>
        {props.publishers && props.publishers.length ? <Table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.publishers.map((ele, indx) => <tr key={indx}>
                    <td>{indx + 1}</td>
                    <td>{ele.CompanyCode}</td>
                    <td>{ele.CompanyName}</td>
                    <td>{ele.Address}</td>
                    <td className="fa fa-edit delete-icon" onClick={() => {
                        setModalData(ele)
                        setToggle(true)
                    }}></td>
                    <td className="fa fa-trash delete-icon" onClick={() => ondelete(ele.CompanyCode)}></td>
                </tr>)}
            </tbody>
        </Table> : <></>}

    </section>
}

export default Publication;

function ModalX(props) {
    let [name, setName] = useState(props.data.CompanyName === undefined ? '' : props.data.CompanyName);
    let [address, setAddress] = useState(props.data.Address === undefined ? '' : props.data.Address);
    let [code, setCode] = useState(props.data.CompanyCode === undefined ? '' : props.data.CompanyCode);

    function onCancel() {
        props.setToggle(false);
    }

    async function onModalSave() {
        if (!name || !code) {
            ErrorMessage('Enter Publisher Name and Code & address !');
            return;
        }
        if (name === props.data.CompanyName && address === props.data.Address) {
            ErrorMessage('You have not changed anything !');
            return;
        }

        try {
            let res = await httpService.post(`/company/${props.data.CompanyCode ? 'updatecompany': 'createcompany'}`,
            { companyCode: code, companyName: name , companyAddress: address })
            res = res.data
            if (res.ack === 1) {
                SuccessMessage(`${props.data.companyCode ? 'updated' : 'created'} Successfully !`)
                props.setToggle(false);
                props.getPublisher();
            }
            else ErrorMessage('Something went wrong in creation ' + res.msg.original.detail)
        }
        catch (e) {
            ErrorMessage('Something went wrong in creation')
        }
    }
    return <>
        <ModalHeader >Add a Publisher</ModalHeader>
        <ModalBody>
            <div>
                <label>Publisher Code :</label>{" "}
                <input
                    type={'text'}
                    placeholder='Publisher Code'
                    value={code}
                    onChange={(e) => { setCode(e.target.value) }}
                    disabled={props.data.CompanyCode !== undefined}
                    required />
                <br />
                <label>Publisher Name :</label>{" "}
                <input
                    type={'text'}
                    placeholder='Publisher Name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    required />
                <br />
                <label>Address :</label>{" "}
                <input
                    type={'text'}
                    placeholder='Address'
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                    required />
            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onModalSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
    </>
}