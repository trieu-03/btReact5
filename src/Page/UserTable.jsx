import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserTable extends Component {
    render() {
        const { studentsArr, findStudentsArr, keyWord } = this.props.studentsReducer;
        let showArr = [];

        if (keyWord) {
            showArr = findStudentsArr
        } else {
            showArr = studentsArr
        }
        
        const handleEditStudent = (item) => {
            const action = {
                type: 'EDIT_STUDENT',
                payload: item
            }
            this.props.dispatch(action)
            document.getElementById('id').disabled = true;
            document.getElementById('add').style.display = 'none';
            document.getElementById('update').style.display = 'block';
            console.log(item)
        }

        const handleDeleteStudent = (item) => {
            this.props.dispatch({
                type: 'DELETE_STUDENT',
                payload: item.id
            });

           if(document.getElementById('id').disabled){

            document.getElementById('form').reset()
            document.getElementById('id').disabled = false;
            document.getElementById('add').style.display = 'block';
            document.getElementById('update').style.display = 'none';
           }
            

        }

        return (
            <div className='container'>
                <table className="table">
                    <thead>
                        <tr className='bg-dark text-white text-center'>
                            <th>Mã SV</th>
                            <th>Họ Tên</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showArr.map((item) =>
                            <tr key={item.id} className='text-center'>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td >
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleEditStudent(item)}
                                        style={{ width: 70 }}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-danger mx-3"
                                        onClick={() => handleDeleteStudent(item)}
                                        style={{ width: 70 }}
                                    >
                                        Xóa
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        studentsReducer: state.StudentsReducer
    }
}


export default connect(mapStateToProps)(UserTable)
