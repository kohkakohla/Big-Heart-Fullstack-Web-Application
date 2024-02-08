import React from 'react';
import NavBar from "../components/Home/NavBar";
// import './css/History.css';

function History() {
  return (
    <div>
      <NavBar />
      <div className="container d-flex justify-content-center mt-100 mb-100">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex no-block">
                  <h4 className="card-title">Volunteering History<br/><small className="text-muted">Jerrick's stuff</small></h4>
                  <div className="ml-auto">
                    <select className="custom-select">
                      <option selected>JAN</option>
                      <option value="1">FEB</option>
                      <option value="2">MARCH</option>
                      <option value="3">APRIL</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-light p-20">
                <div className="d-flex">
                  <div className="align-self-center">
                    <h3 className="m-b-0">Jan 2024</h3><small>Total EXP</small>
                  </div>
                  <div className="ml-auto align-self-center">
                    <h2 className="text-success">15470</h2>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover earning-box">
                    <thead>
                      <tr>
                        <th colSpan="2">Event</th>
                        <th>Status</th>
                        <th>EXP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{width: '50px'}}><span className="round"><img src="https://i.imgur.com/uIgDDDd.jpg" alt="user" width="50"/></span></td>
                        <td>
                          <h6>Dilwali Diwali</h6><small className="text-muted">AD-HOC</small>
                        </td>
                        <td><span className="label label-success">Completed</span></td>
                        <td>340</td>
                      </tr>
                      <tr className="active">
                        <td><span className="round"><img src="https://i.imgur.com/tT8rjKC.jpg" alt="user" width="50"/></span></td>
                        <td>
                          <h6>Chinese New Year</h6><small className="text-muted">REGULAR</small>
                        </td>
                        <td><span className="label label-info">In Progress</span></td>
                        <td>520</td>
                      </tr>
                      <tr>
                        <td><span className="round round-success"><img src="https://i.imgur.com/cAdLHeY.jpg" alt="user" width="50"/></span></td>
                        <td>
                          <h6>Deepavali</h6><small className="text-muted">AD-HOC</small>
                        </td>
                        <td><span className="label label-primary">Completed</span></td>
                        <td>600</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-center py-1">
                  <span className="fs-5">View more <i className="fa fa-chevron-down text-secondary"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;