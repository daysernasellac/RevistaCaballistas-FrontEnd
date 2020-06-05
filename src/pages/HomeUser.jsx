import React from 'react'
import '../styles/HomeUser.css'
import NavBar from '../components/NavBar'

class HomeUser extends React.Component {
    render() {
        return (

            <div className="mainHome">
                <NavBar usuario="Andres"></NavBar>
                <br />
                <br />
                <br />
                <table className="table table-striped table-light table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default HomeUser;