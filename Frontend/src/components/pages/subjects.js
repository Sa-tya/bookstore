import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import httpService from "../../services/http.service";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './pageStyle.css'
import SuccessMessage, { ErrorMessage } from "../common/message";
import { ToastContainer } from "react-toastify";


function Subject(props) {
    const [toggle, setToggle] = useState(false);
    const [modalData, setModalData] = useState({})

    async function ondelete(code) {
        try {
            let x = window.confirm('Do you want to delete this ?')
            console.log(x)
            if (x) {
                let res = await httpService.delete(`/subject/deletesubject/${code}`)
                if (res.data.ack === 1) {
                    SuccessMessage('Deleted Successfully !')
                    props.getSubjects();
                }
                else ErrorMessage('Something went wrong in Deletion')
            }
        }
        catch (err) {
            ErrorMessage('Not deleted')
        }

    }

    return <section>
        <h1>Subjects</h1>
        <ToastContainer />
        <Button onClick={() => {
            setToggle(!toggle)
            setModalData({})
        }}>Add a Subject</Button>
        <Modal isOpen={toggle} toggle={() => setToggle(!toggle)} >
            <ModalX setToggle={setToggle} data={modalData} getSubjects={props.getSubjects} />
        </Modal>
        {props.subjects && props.subjects.length ? <Table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.subjects.map((ele, indx) => <tr key={indx}>
                    <td>{indx + 1}</td>
                    <td>{ele.SubjectCode}</td>
                    <td>{ele.SubjectName}</td>
                    <td className="fa fa-edit delete-icon" onClick={() => {
                        setModalData(ele)
                        setToggle(true)
                    }}></td>
                    <td className="fa fa-trash delete-icon" onClick={() => ondelete(ele.SubjectCode)}></td>
                </tr>)}
            </tbody>
        </Table> : <></>}

    </section>
}

export default Subject;

function ModalX(props) {
    let [name, setName] = useState(props.data.SubjectName === undefined ? '' : props.data.SubjectName);
    let [code, setCode] = useState(props.data.SubjectCode === undefined ? '' : props.data.SubjectCode);

    function onCancel() {
        props.setToggle(false);
    }

    async function onModalSave() {
        if (!name || !code) {
            console.log('here.......')
            ErrorMessage('Enter Subject Name and Code !');
            return;
        }
        if (name === props.data.SubjectName) {
            ErrorMessage('You have not changed Subject Name !');
            return;
        }

        try {
            let res = await httpService.post(`/subject/${props.data.SubjectCode ? 'updatesubject' : 'createsubject'}`, { SubjectCode: code, SubjectName: name })
            res = res.data
            if (res.ack === 1) {
                SuccessMessage(`${props.data.SubjectCode ? 'updated' : 'created'} Successfully !`)
                props.setToggle(false);
                props.getSubjects();
            }
            else ErrorMessage('Something went wrong in creation ' + res.msg.original.detail)
        }
        catch (e) {
            ErrorMessage('Something went wrong in creation')
        }
    }
    return <>
        <ModalHeader >Add a Subject</ModalHeader>
        <ModalBody>
            <div>
                <label>Subject Code :</label>{" "}
                <input
                    type={'text'}
                    placeholder='Subject Code'
                    value={code}
                    onChange={(e) => { setCode(e.target.value) }}
                    disabled={props.data.SubjectCode !== undefined}
                    required />
                <br />
                <label>Subject Name :</label>{" "}
                <input
                    type={'text'}
                    placeholder='Subject Name'
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    required />
            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onModalSave}>Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
        </ModalFooter>
    </>
}