import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import UserTable from './UserTable'

export default class ManagerForm extends Component {
    render() {
        return (
            <div className='container '>
                <h3 className='text-center'>Bài Tập Quản Lý Sinh Viên</h3>
                <RegisterForm/>
                <UserTable/>
            </div>
        )
    }
}
