import React from 'react'

function SCS({data}) {
    return (
        <div>
                   <div className="row" style={{marginTop:2}}>
            <h1 className="h1 text-center">Report</h1>

           <div className="col-md-12">

            <table id="tbdata" className="table table-striped" style={{width:'100%'}}>
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
            {data.map(i=>(<tr key={i.id}>
<td>{i.villageName}</td>
<td>{i.Tal}</td>
<td>{i.Dist}</td>
<td>{i.shopName}</td>
<td>{i.proprietorName}</td>
<td>{i.type}</td>
<td>{i.mobileNumber}</td>


            </tr>))}
               </tbody>
         
            </table>
           </div>
        </div>
        </div>
    )
}

export default SCS
