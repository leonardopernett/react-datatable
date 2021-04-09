
export const getApi = async ()=>{
    const res = await fetch('https://rickandmortyapi.com/api/character')
    const data = await res.json();
    const {results}= data
    return results
}