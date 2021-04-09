import Datatable from 'react-data-table-component';
import {getApi} from '../../services/geUsers'
import {useState, useEffect} from 'react'
import ReactExport  from 'react-export-excel'


const ExcelFile   = ReactExport.ExcelFile 
const ExcelSheet  = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const columns = [
  {
    name:'id',
    selector:'id',
    sortable:true
  },
  {
    name:'Name',
    selector:'name',
    sortable:true
  },
  {
    name:'Status',
    selector:'status',
    sortable:true
  },{
    name:'Species',
    selector:'species',
    sortable:true
    
  }
]

export default function Table() {

  const [characters, setCharacter] = useState([])
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    getApi().then(setCharacter)
    getApi().then(setData)
     }, [])

  const getFilter = (e)=>{
  
     let res =  characters.filter(item=>{
         if(item.name.toLowerCase().includes(search.toLowerCase())){
          return item
         }
      })
      setData(res)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    getFilter()
  }

  const onChangeSearch = (e)=>{
     setSearch(e.target.value)
     getFilter()
  }
 
  return (
    <>
      <div className="container mt-5">
        <div className="row">
            <div className="content col-md-10 d-flex justify-content-between align-items-center">
              <form onSubmit={handleSubmit}>
                <div className="input-group  my-2 col-md-12 px-0">
                  <input type="text" value={search} onChange={onChangeSearch} className="form-control" placeholder="Buscar" />
                  <button className="btn btn-success ">Go</button>
                </div>
              </form>
              <ExcelFile element={<button className="btn btn-success">XLSX</button>}>
                 <ExcelSheet data={data} name="RickandMorty">
                   <ExcelColumn label="Name" value="name"  />
                   <ExcelColumn  label="Status" value="status" />
                   <ExcelColumn  label="Species" value="species" />
                 </ExcelSheet>
              </ExcelFile>
            </div>
           <div className="col-md-10">
             <div className="card">
                <Datatable 
                    title="Rick and Morty"
                    columns={columns}
                    data={data}
                    pagination
                />
             </div>
           </div>
        </div>
      </div>
    </>
  )
}
