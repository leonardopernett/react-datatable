
import {Route} from 'wouter'
import {lazy, Suspense} from 'react'

const Table = lazy(()=>import('../pages/datatable'))

function App() {
  return (
    <Suspense fallback={null}>
       <Route path="" component={Table} />
    </Suspense>
  );
}

export default App;
