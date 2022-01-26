import React, { useState, useEffect,useRef } from 'react';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import bg from './img/bg.jpeg'
import bg2 from './img/bg2.jpeg'

function App() {

  const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button className="btn btn-warning"onClick={(e) => exportToCSV(csvData,fileName)}>Export</button>
    )
}


  
  const [data, setData] = useState([]);
  const[dd,setDd]= useState([])
  const [updateTrue, setUpdateTrue] = useState(false);
  const [form, setForm] = useState({ id: '', villageName: '', Tal: '', Dist: '', shopName: '', proprietorName: '', type: '', mobileNumber: '' });





  useEffect(() => {
    getData();
    getDD();



  }, []);

 const handleVillageChange = async (e,villageName)=>{

  try {
    const res = await fetch(`https://scs-jj.herokuapp.com/api/survey/${villageName}`);
    const data = await res.json();
setData(data);
    
  } catch (err) { }

 }

  const getDD=async ()=>{
    try {
      const res = await fetch('https://scs-jj.herokuapp.com/api/selectVillage', { method: 'GET' });
      const data1 = await res.json();




      setDd(data1);

    } catch (e) { console.log(e); }
  }


  const cls=()=>{
    setForm({ id: '', villageName: '', Tal: '', Dist: '', shopName: '', proprietorName: '', type: '', mobileNumber: '' })
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`https://scs-jj.herokuapp.com/api/update/${form.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setUpdateTrue(false);
      getData();
      cls();
    } catch (e) {
      console.log(e);
    }

  }

  const handleEdit = async (e, id) => {
    setUpdateTrue(true);
    try {
      const res = await fetch(`https://scs-jj.herokuapp.com/api/getOne/${id}`);
      const data = await res.json();

      setForm({ id: data.id, villageName: data.villageName, Tal: data.Tal, Dist: data.Dist, shopName: data.shopName, proprietorName: data.proprietorName, type: data.type, mobileNumber: data.mobileNumber });
    } catch (err) { }
  }

  const handleDelete = async (e, id) => {
    try {
      await fetch(`https://scs-jj.herokuapp.com/api/${id}`, { method: 'DELETE' })
      alert("Deleted Successfully");
      getData();
    } catch (err) { }
  }

  const getData = async () => {
    try {
      const res = await fetch('https://scs-jj.herokuapp.com/api/survey', { method: 'GET' });
      const data = await res.json();

      setData(data);

    } catch (e) { console.log(e); }
  }

  const handleSubmit = e => {

    e.preventDefault();
    if(updateTrue){
handleUpdate();
    }else{
      saveData();
    }


  }
  const saveData = async () => {
    try {
      const res = await fetch('https://scs-jj.herokuapp.com/api/survey', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
 getData();
 cls();
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <div>
      
      <div className="container">
      <div className="row " style={{margin:10,padding:10}}>
        <img src={bg} style={{width:'100%',borderRadius:25,marginBottom:20}} />
        <hr />
        <div className="d-flex justify-content-center align-items-center">
        <img src={bg2} style={{width:'40vh',borderRadius:25,marginBottom:20,objectFit:'contain'}} />
        </div>
       
      </div>
<hr />
        <form id="myform" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">

              <input type="hidden" name="id" id="id" value={form.id} />
              <div className="form-group">
                <label htmlFor="villageName" className="form-label mt-4">Village Name/City Name</label>
                <input type="text" required value={form.villageName} className="form-control" id="villageName" name="villageName" placeholder="Enter Village" onChange={e => { setForm({ ...form, villageName: e.target.value }) }} />

              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Tal" className="form-label mt-4">Tal</label>
                <input type="text" required value={form.Tal} className="form-control" id="Tal" name="Tal" placeholder="Enter Tal" onChange={e => { setForm({ ...form, Tal: e.target.value }) }} />

              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Dist" className="form-label mt-4">Dist</label>
                <input type="text" required value={form.Dist} className="form-control" id="Dist" name="Dist" placeholder="Enter Dist" onChange={e => { setForm({ ...form, Dist: e.target.value }) }} />

              </div>
            </div>

          </div>
          <div className="row">

            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="shopName" className="form-label mt-4">Shop Name</label>
                <input type="text" required  value={form.shopName} className="form-control" id="shopName" name="shopName" onChange={e => { setForm({ ...form, shopName: e.target.value }) }} placeholder="Enter Shop" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="proprietorName" className="form-label mt-4">Propriter Name</label>
                <input type="text" required value={form.proprietorName} className="form-control" id="proprietorName" name="proprietorName" onChange={e => { setForm({ ...form, proprietorName: e.target.value }) }} placeholder="Enter Propriter" />
              </div>

            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="type" className="form-label mt-4">Type</label>
                <select value={form.type} required className="form-select" name="type" id="type" onChange={e => { setForm({ ...form, type: e.target.value }) }}>
                  <option>Select Business Type</option>
                  <option value="Propriter">Propriter</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Stockist">Stockist</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Super Bazar">Super Bazar</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="mobileNumber" className="form-label mt-4">Mobile No</label>
                  <input type="text" required value={form.mobileNumber} className="form-control" name="mobileNumber" id="mobileNumber" onChange={e => { setForm({ ...form, mobileNumber: e.target.value }) }} placeholder="Enter Mobile" />
                </div>
              </div>

            </div>
            <div className="  d-flex justify-content-evenly align-items-center" style={{ marginTop: 10 }}>
              {!updateTrue && 
                <input id="submit" type="submit" className="btn btn-success " value="Save" />
              
              }
              {updateTrue &&
                <input  id="submit" type="submit" className="btn btn-info " value="Update" />
            
              }
              
                <input type="button" className="btn btn-dark " onClick={()=>{cls()}} value="Cancel" />
             
            </div>
          </div>




        </form>
        <hr />
        <div className="row" style={{ marginTop: 2 }}>
          <h1 className="h1 text-center">Report</h1>
          <div className="col-md-4" style={{ marginTop: 2,marginBottom:10 }}>
              <div className="form-group">
                <label htmlFor="type" className="form-label mt-4">Select Village/City</label>
                <select  className="form-select" name="City" id="City" onChange={e=>handleVillageChange(e,e.target.value)}>
                  <option>Select Village / City</option>
                 {dd.map(i=>(<option key={i.id} value={i.villageName}>{i.villageName}</option>))}
                </select>
              </div>
            </div>
          <div className="col-md-12">

            <table  id="tbdata" className="table table-striped" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Village Name/City Name</th>
                  <th>Tal</th>
                  <th>Dist</th>
                  <th>Shop Name</th>
                  <th>Propriter Name</th>
                  <th>Type</th>
                  <th>Moblile No</th>
                </tr>
              </thead>
              <tbody>
                {data.map(i => (<tr key={i.id}>
                  <td>{i.villageName}</td>
                  <td>{i.Tal}</td>
                  <td>{i.Dist}</td>
                  <td>{i.shopName}</td>
                  <td>{i.proprietorName}</td>
                  <td>{i.type}</td>
                  <td>{i.mobileNumber}</td>
                  <td><button className="btn btn-light" onClick={(e) => { handleEdit(e, i.id) }}>Edit</button></td>
                  <td><button className="btn btn-danger" onClick={(e) => { handleDelete(e, i.id) }}>Delete</button></td>


                </tr>))}
              </tbody>

            </table>
          </div>
        <div className="col-md-12">
        <ExportCSV csvData={data} fileName={"CSC DATA"} />
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
