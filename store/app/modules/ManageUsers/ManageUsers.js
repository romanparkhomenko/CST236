import React, { Component } from 'react';
import { render } from 'react-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FormModule from "../FormModule";
import ReactModal from "react-modal";


export default class ManageUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userList: "",
            activeUser: {
                name: "",
                price: "",
                description: "",
                category_name: "",
            },
            showModal: false,
        }
    }

    componentDidMount() {
        this.getUsers('/store/api/user/read.php');
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    setActiveUser = (user) => {
        this.setState(prevState => ({
            activeUser: user,
        }));
        this.handleOpenModal();
    };

    renderUsers = (users) => {
        return <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Admin?</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) =>
                <tr className="user-card" key={user.username}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>{user.admin === "1" ? "YES" : "NO"}</td>
                    <td><button className="edit-button" onClick={() => this.setActiveUser(user)}>EDIT</button></td>
                    <td><button className="delete-button" onClick={() => this.deleteUser(user)}>DELETE</button></td>
                </tr>
            )}
            </tbody>
        </table>;
    };

    getUsers = (url) => {
        fetch(url, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(users => {
                this.setState(prevState => ({
                    isLoading: false,
                    userList: users,
                }));
            });
    };

    deleteUser = (user) => {
        let confirmation = confirm('Are you sure you want to delete ' + user.username + '?');
        let userID = {id: user.id};

        if (confirmation) {
            fetch('/store/api/user/delete.php', {
                method: 'POST',
                body: JSON.stringify(userID),
            })
                .then(res => res.json())
                .then(response => {
                    console.info(response.message);
                });
            this.getUsers('/store/api/user/read.php');
        }
    };

    handleSuccess = () => {
        this.getUsers('/store/api/user/read.php');
    };

    render() {
        const { isLoading, userList, activeUser, showModal } = this.state;
        return (
            <React.Fragment>
                <div className="user-management">
                    <h1>Manage Users</h1>
                    <div className="create-product">
                        <FormModule
                            formTitle={"Create User"}
                            useProductFields={false}
                            useUserInfoFields={true}
                            methodURL={"/store/api/user/create.php"}
                            handleSuccess={this.handleSuccess}
                        />
                    </div>
                    <div className="users">
                        {!isLoading ? (
                            <div className="user-table">
                                {this.renderUsers(userList)}
                            </div>
                        ) : (
                            <p className="loading">Loading User Catalog.</p>
                        )}
                    </div>
                    <ReactModal
                        isOpen={showModal}
                        onRequestClose={this.handleCloseModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <button className="close-button" onClick={this.handleCloseModal}>Close</button>
                        <div className="user-content">
                            <div className="user-card">
                                <h3>Original Details</h3>
                                <ul>
                                    <li>Username: {activeUser.username}</li>
                                    <li>Is Admin: {activeUser.admin === "1" ? "YES" : "NO"}</li>
                                    <li>First Name: {activeUser.firstname}</li>
                                    <li>Last Name: {activeUser.lastname}</li>
                                    <li>Email: {activeUser.email}</li>
                                </ul>
                            </div>
                            <div className="create-product">
                                <FormModule
                                    formTitle={"Edit User"}
                                    useProductFields={false}
                                    useUserInfoFields={true}
                                    methodURL={"/store/api/user/edit.php"}
                                    userID={activeUser.id}
                                    handleSuccess={this.handleSuccess}
                                    activeUser={activeUser}
                                />
                            </div>
                        </div>
                    </ReactModal>
                </div>
            </React.Fragment>
        )
    }
}
