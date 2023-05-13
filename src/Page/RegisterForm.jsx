import React, { Component } from 'react'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'

class RegisterForm extends Component {
    state = {
        values: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
        errors: {
            id: '',
            name: '',
            phone: '',
            email: '',
        },
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.studentsEdit.id !== this.props.studentsEdit.id) {
            this.setState({
                values: this.props.studentsEdit
            })
        }
    }

    render() {
        const { id, name, phone, email } = this.state.values

        const handleOnchange = (e) => {
            const { id, name, value } = e.target

            const newValue = { ...this.state.values, [id]: value }
            const newError = { ...this.state.errors }

            let messageError = ''

            // Check empty
            if (value.trim() === '') {
                messageError = name + ' không được để trống !!!'
            }

            // Check duplicate id
            if (id === 'id') {
                const { studentsArr } = this.props
                if (studentsArr.find(sv => sv.id === value)) {
                    messageError = name + ' đã bị trùng lặp.'
                }
            }

            // Check phone
            if (id === 'phone') {
                const regexPhone = /^[0-9]+$/
                if (!regexPhone.test(value)) {
                    messageError = name + ' không hợp lệ, phải là số.'
                }
            }

            // Check email
            if (id === 'email') {
                const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                if (!regexEmail.test(value)) {
                    messageError = name + ' không hợp lệ'
                }
            }

            newError[id] = messageError

            this.setState({
                values: newValue,
                errors: newError
            })

        }
        const handleUpdateStudent = (e) => {
            e.preventDefault()
            let isValid = true

            // Check value
            for (let keyValue in this.state.values) {
                if (this.state.values[keyValue] === '') {
                    isValid = false
                    Swal.fire({
                        title: 'Error!',
                        text: 'Thông tin chưa hợp lệ',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 1000
                    })
                    return
                }
            }

            // Check error
            for (let keyError in this.state.errors) {
                if (this.state.errors[keyError] !== '') {
                    isValid = false
                    Swal.fire({
                        title: 'Error!',
                        text: 'Thông tin chưa hợp lệ',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        timer: 1000
                    })
                    return
                }
            }

            if (isValid) {
                this.props.dispatch({
                    type: 'UPDATE_STUDENT',
                    payload: this.state.values,
                })
                this.setState({
                    values: {
                        id: '',
                        name: '',
                        phone: '',
                        email: '',
                    }
                })
                document.getElementById('form').reset()
                document.getElementById('id').disabled = false;

                Swal.fire({
                    title: 'Success!',
                    text: 'Cập Nhật Thành Công',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1000
                })
            }
            document.getElementById('add').style.display = 'block';
            document.getElementById('update').style.display = 'none';

        }
        const handleSubmit = (e) => {
            e.preventDefault()

            let { values, errors } = this.state
            let isValid = true

            // Check value
            for (let keyValue in values) {
                if (values[keyValue] === '') {
                    isValid = false
                    Swal.fire({
                        title: 'Error!',
                        text: 'Thông tin chưa hợp lệ',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    return
                }
            }

            // Check error
            for (let keyError in errors) {
                if (errors[keyError] !== '') {
                    isValid = false
                    Swal.fire({
                        title: 'Error!',
                        text: 'Thông tin chưa hợp lệ',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                    return
                }
            }

            if (isValid) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Thêm Thành Công',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 1000
                })
            }

            // Add students
            const action = {
                type: 'ADD_STUDENT',
                payload: this.state.values
            }
            this.props.dispatch(action)
            document.getElementById('form').reset()
            this.setState({
                values: {
                    id: '',
                    name: '',
                    phone: '',
                    email: '',
                }
            })
        }
        const handleSearchStudent = (e) => {
            this.props.dispatch({
                type: 'FIND_STUDENT',
                payload: e.target.value
            })
        }

        return (
            <div className='container'>
                <div className="card mt-3">
                    <div className="card-header bg-dark text-white">
                        <h3 className='text-center'>Thông Tin Sinh Viên</h3>
                    </div>
                    <div className="card-body">
                        <form id='form' onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="form-group col-6">
                                    <span>Mã Sinh Viên :</span>
                                    <input
                                        value={id || ''}
                                        className="form-control"
                                        id='id'
                                        name='Mã Sinh Viên'
                                        onChange={handleOnchange} />
                                    <span className='text-danger'>{this.state.errors.id}</span>
                                </div>
                                <div className="form-group col-6">
                                    <span>Họ Tên :</span>
                                    <input
                                        value={name || ''}
                                        className="form-control"
                                        id='name'
                                        name='Họ Tên'
                                        onChange={handleOnchange} />
                                    <span className='text-danger'>{this.state.errors.name}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <span>Số Điện Thoại :</span>
                                    <input
                                        value={phone || ''}
                                        className="form-control"
                                        id='phone'
                                        name='Số Điện Thoại'
                                        onChange={handleOnchange} />
                                    <span className='text-danger'>{this.state.errors.phone}</span>
                                </div>
                                <div className="form-group col-6">
                                    <span>Email :</span>
                                    <input
                                        value={email || ''}
                                        className="form-control"
                                        id='email'
                                        name='Email'
                                        onChange={handleOnchange} />
                                    <span className='text-danger'>{this.state.errors.email}</span>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-3 text-center">
                                    <button
                                        id='add'
                                        style={{ width: 150 }}
                                        className="btn btn-success mr-5"
                                    >Thêm Sinh Viên</button>
                                </div>
                                <div className="col-3">
                                    <button
                                        className="btn btn-success"
                                        id='update'
                                        style={{ width: 150, display: 'none' }}
                                        onClick={handleUpdateStudent}>
                                        Cập Nhật
                                    </button>

                                </div>
                                <div className="col-6">
                                    <div className="input-group">
                                        <input
                                            placeholder='Nhập tên Sinh Viên cần tìm'
                                            name="key"
                                            id="key"
                                            type="text"
                                            className="form-control"
                                            onChange={handleSearchStudent} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        studentsArr: state.StudentsReducer.studentsArr,
        studentsEdit: state.StudentsReducer.studentsEdit,
    }
}

export default connect(mapStateToProps,)(RegisterForm)
